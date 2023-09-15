import { IBinaryOperation } from "."
import { BinaryOptionsRequest } from "./dtos/BinaryOptionsRequest"

export class BinaryOperationImp implements IBinaryOperation {
	execute({ op, lhs, rhs }: BinaryOptionsRequest) {
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
}
