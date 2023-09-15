import { Env, Term } from "../../../@types/types"

export interface InterpreterRequest {
	term: Term
	env?: Env
	fileId?: string
}
