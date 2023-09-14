import { Term, BinaryOp, Env } from "./types"
import { readdir } from "fs/promises"

const readJsonFile = async (filename: string): Promise<Term> => {
	const raw = await Bun.file(filename).text()
	return JSON.parse(raw).expression
}

const functionCache: Record<string, any> = {}

function hashFunction(term: Term, args: any[], fileId: string): string {
	return `${fileId}:${term.kind}:${JSON.stringify(args)}`
}

function interpret(term: Term, fileId: string, env: Env = {}): any {
	switch (term.kind) {
		case "Int":
			return term.value
		case "Str":
			return term.value
		case "Bool":
			return term.value
		case "Var":
			return env[term.text]
		case "Binary":
			const lhs = interpret(term.lhs, fileId, env)
			const rhs = interpret(term.rhs, fileId, env)
			return performBinaryOperation(term.op, lhs, rhs)
		case "Function":
			return function (...args: any[]) {
				const hash = hashFunction(term, args, fileId)
				if (functionCache[hash] !== undefined) {
					return functionCache[hash]
				}

				const newEnv = { ...env }
				term.parameters.forEach((param, index) => {
					newEnv[param.text] = args[index]
				})

				const result = interpret(term.value, fileId, newEnv)
				functionCache[hash] = result
				return result
			}
		case "Call":
			const fn = interpret(term.callee, fileId, env)
			const args = term.arguments.map((arg) => interpret(arg, fileId, env))
			return fn(...args)
		case "Let":
			const newEnv = { ...env }
			newEnv[term.name.text] = interpret(term.value, fileId, newEnv)
			return interpret(term.next, fileId, newEnv)
		case "If":
			return interpret(term.condition, fileId, env)
				? interpret(term.then, fileId, env)
				: interpret(term.otherwise, fileId, env)
		case "Print":
			console.log(interpret(term.value, fileId, env))
			return
	}
}

function performBinaryOperation(op: BinaryOp, lhs: any, rhs: any): any {
	switch (op) {
		case "Add":
			return lhs + rhs
		case "Sub":
			return lhs - rhs
		case "Mul":
			return lhs * rhs
		case "Div":
			if (rhs === 0) throw new Error("Division by zero")
			return lhs / rhs
		case "Eq":
			return lhs === rhs
		case "Neq":
			return lhs !== rhs
		case "Lt":
			return lhs < rhs
		case "Gt":
			return lhs > rhs
		case "Lte":
			return lhs <= rhs
		case "Gte":
			return lhs >= rhs
		case "And":
			return lhs && rhs
		case "Or":
			return lhs || rhs
	}
}

if (process.env.ENVIRONMENT === "development") {
	console.time("Executed all files")
	const files = await readdir("./assets")
	for (const file of files) {
		console.time(`Executed ${file}`)
		const ast = await readJsonFile(`./assets/${file}`)
		interpret(ast, file)
		console.timeEnd(`Executed ${file}`)
	}
	console.timeEnd("Executed all files")
} else {
	const ast = await readJsonFile("/var/rinha/source.rinha.json")
	interpret(ast, "source.rinha")
}
