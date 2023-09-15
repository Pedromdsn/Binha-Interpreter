import { BinaryOptionsRequest } from "./dtos/BinaryOptionsRequest"

export interface IBinaryOperation {
	execute: (req: BinaryOptionsRequest) => any
}
