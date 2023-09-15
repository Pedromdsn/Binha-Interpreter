import { IInterpreter } from "."
import { IBinaryOperation } from "../BinaryOperation"
import { HashRequest } from "./dtos/HashRequest"
import { InterpreterRequest } from "./dtos/InterpreterRequest"

export class InterpreterWithMemoImp implements IInterpreter {
	constructor(private readonly performBinaryOperation: IBinaryOperation) {}

	functionCache: Record<string, any> = {}

	hashFunction({ fileId, term, args }: HashRequest): string {
		return `${fileId}:${term.kind}:${JSON.stringify(args)}`
	}

	execute({ term, fileId, env = {} }: InterpreterRequest): any {
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
				const lhs = this.execute({ term: term.lhs, env, fileId })
				const rhs = this.execute({ term: term.rhs, env, fileId })
				return this.performBinaryOperation.execute({ op: term.op, lhs, rhs })
			case "Function":
				return (...args: any[]) => {
					const hash = this.hashFunction({ term, args, fileId: fileId! })
					if (this.functionCache[hash] !== undefined) {
						return this.functionCache[hash]
					}

					const newEnv = { ...env }
					term.parameters.forEach((param, index) => {
						newEnv[param.text] = args[index]
					})

					const result = this.execute({ term: term.value, fileId, env: newEnv })
					this.functionCache[hash] = result
					return result
				}
			case "Call":
				const fn = this.execute({ term: term.callee, env, fileId })
				const args = term.arguments.map((arg) => this.execute({ term: arg, env, fileId }))
				return fn(...args)
			case "Let":
				env[term.name.text] = this.execute({ term: term.value, env, fileId })
				return this.execute({ term: term.next, env, fileId })
			case "If":
				return this.execute({ term: term.condition, env, fileId })
					? this.execute({ term: term.then, env, fileId })
					: this.execute({ term: term.otherwise, env, fileId })
			case "Print":
				console.log(this.execute({ term: term.value, env, fileId }))
				return
		}
	}
}
