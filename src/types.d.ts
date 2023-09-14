export type Parameter = { text: string }

export type BinaryOp = "Add" | "Sub" | "Mul" | "Div" | "Rem" | "Eq" | "Neq" | "Lt" | "Gt" | "Lte" | "Gte" | "And" | "Or"

export type Term =
	| { kind: "Int"; value: number }
	| { kind: "Str"; value: string }
	| { kind: "Call"; callee: Term; arguments: Term[] }
	| { kind: "Binary"; lhs: Term; op: BinaryOp; rhs: Term }
	| { kind: "Function"; parameters: Parameter[]; value: Term }
	| { kind: "Let"; name: Parameter; value: Term; next: Term }
	| { kind: "If"; condition: Term; then: Term; otherwise: Term }
	| { kind: "Print"; value: Term }
	| { kind: "First"; value: Term }
	| { kind: "Second"; value: Term }
	| { kind: "Bool"; value: boolean }
	| { kind: "Tuple"; first: Term; second: Term }
	| { kind: "Var"; text: string }

export type Env = { [key: string]: any }
