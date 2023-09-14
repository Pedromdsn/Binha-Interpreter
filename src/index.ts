import fs from "fs"
import { Term, BinaryOp, Env } from "./types"

const readJsonFile = (filename: string): Term => {
	const raw = fs.readFileSync(filename, "utf-8")
	return JSON.parse(raw).expression
}

function interpret(term: Term, env: Env = {}): any {
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
			const lhs = interpret(term.lhs, env)
			const rhs = interpret(term.rhs, env)
			return performBinaryOperation(term.op, lhs, rhs)
		case "Function":
			return function (...args: any[]) {
				const newEnv = { ...env }
				term.parameters.forEach((param, index) => {
					newEnv[param.text] = args[index]
				})
				return interpret(term.value, newEnv)
			}
		case "Call":
			const fn = interpret(term.callee, env)
			const args = term.arguments.map((arg) => interpret(arg, env))
			return fn(...args)
		case "Let":
			env[term.name.text] = interpret(term.value, env)
			return interpret(term.next, env)
		case "If":
			return interpret(term.condition, env) ? interpret(term.then, env) : interpret(term.otherwise, env)
		case "Print":
			console.log(interpret(term.value, env))
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
	const files = fs.readdirSync("./assets")
	for (const file of files) {
    console.time(`Executed ${file}`)
		const ast = readJsonFile(`./assets/${file}`)
		interpret(ast)
    console.timeEnd(`Executed ${file}`)
	}
  console.timeEnd("Executed all files")
} else {
	const ast = readJsonFile("/var/rinha/source.rinha.json")
	interpret(ast)
}
