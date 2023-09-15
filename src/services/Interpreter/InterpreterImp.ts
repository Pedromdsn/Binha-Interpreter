import { IInterpreter } from "."
import { IBinaryOperation } from "../BinaryOperation"
import { InterpreterRequest } from "./dtos/InterpreterRequest"

export class InterpreterImp implements IInterpreter {
	constructor(private readonly performBinaryOperation: IBinaryOperation) {}

	execute({ term, env = {} }: InterpreterRequest): any {
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
				const lhs = this.execute({ term: term.lhs, env })
				const rhs = this.execute({ term: term.rhs, env })
				return this.performBinaryOperation.execute({ op: term.op, lhs, rhs })
			case "Function":
				return (...args: any[]) => {
					const newEnv = { ...env }
					term.parameters.forEach((param, index) => {
						newEnv[param.text] = args[index]
					})
					return this.execute({ term: term.value, env: newEnv })
				}
			case "Call":
				const fn = this.execute({ term: term.callee, env })
				const args = term.arguments.map((arg) => this.execute({ term: arg, env }))
				return fn(...args)
			case "Let":
				env[term.name.text] = this.execute({ term: term.value, env })
				return this.execute({ term: term.next, env })
			case "If":
				return this.execute({ term: term.condition, env })
					? this.execute({ term: term.then, env })
					: this.execute({ term: term.otherwise, env })
			case "Print":
				console.log(this.execute({ term: term.value, env }))
				return
		}
	}
}
