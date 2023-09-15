import { describe, expect, test } from "bun:test"
import { BinaryOperationImp } from "./BinaryOptionImp"

describe("BinaryOperationImp", () => {
	const binaryOperation = new BinaryOperationImp()

	test("1 ADD 2 and return 3", () => {
		expect(binaryOperation.execute({ op: "Add", lhs: 1, rhs: 2 })).toBe(3)
	})

	test("1 SUB 2 and return -1", () => {
		expect(binaryOperation.execute({ op: "Sub", lhs: 1, rhs: 2 })).toBe(-1)
	})

	test("1 MUL 2 and return 2", () => {
		expect(binaryOperation.execute({ op: "Mul", lhs: 1, rhs: 2 })).toBe(2)
	})

	test("3 MUL 2 and return 6", () => {
		expect(binaryOperation.execute({ op: "Mul", lhs: 3, rhs: 2 })).toBe(6)
	})

	test("4 MUL 0 and return 0", () => {
		expect(binaryOperation.execute({ op: "Mul", lhs: 4, rhs: 0 })).toBe(0)
	})

	test("1 DIV 2 and return 0.5", () => {
		expect(binaryOperation.execute({ op: "Div", lhs: 1, rhs: 2 })).toBe(0.5)
	})

	test("1 DIV 0 and throw error", () => {
		expect(() => binaryOperation.execute({ op: "Div", lhs: 1, rhs: 0 })).toThrow()
	})

	test("1 EQ 2 and return false", () => {
		expect(binaryOperation.execute({ op: "Eq", lhs: 1, rhs: 2 })).toBe(false)
	})

	test("1 EQ 1 and return true", () => {
		expect(binaryOperation.execute({ op: "Eq", lhs: 1, rhs: 1 })).toBe(true)
	})

	test("1 NEQ 2 and return true", () => {
		expect(binaryOperation.execute({ op: "Neq", lhs: 1, rhs: 2 })).toBe(true)
	})

	test("1 NEQ 1 and return false", () => {
		expect(binaryOperation.execute({ op: "Neq", lhs: 1, rhs: 1 })).toBe(false)
	})

	test("1 LT 2 and return true", () => {
		expect(binaryOperation.execute({ op: "Lt", lhs: 1, rhs: 2 })).toBe(true)
	})

	test("1 LT 1 and return false", () => {
		expect(binaryOperation.execute({ op: "Lt", lhs: 1, rhs: 1 })).toBe(false)
	})

	test("1 GT 2 and return false", () => {
		expect(binaryOperation.execute({ op: "Gt", lhs: 1, rhs: 2 })).toBe(false)
	})

	test("1 GT 1 and return false", () => {
		expect(binaryOperation.execute({ op: "Gt", lhs: 1, rhs: 1 })).toBe(false)
	})

	test("1 LTE 2 and return true", () => {
		expect(binaryOperation.execute({ op: "Lte", lhs: 1, rhs: 2 })).toBe(true)
	})

	test("1 LTE 1 and return true", () => {
		expect(binaryOperation.execute({ op: "Lte", lhs: 1, rhs: 1 })).toBe(true)
	})

	test("1 GTE 2 and return false", () => {
		expect(binaryOperation.execute({ op: "Gte", lhs: 1, rhs: 2 })).toBe(false)
	})

	test("1 GTE 1 and return true", () => {
		expect(binaryOperation.execute({ op: "Gte", lhs: 1, rhs: 1 })).toBe(true)
	})

	test("true AND true and return true", () => {
		expect(binaryOperation.execute({ op: "And", lhs: true, rhs: true })).toBe(true)
	})

	test("true AND false and return false", () => {
		expect(binaryOperation.execute({ op: "And", lhs: true, rhs: false })).toBe(false)
	})

	test("false AND true and return false", () => {
		expect(binaryOperation.execute({ op: "And", lhs: false, rhs: true })).toBe(false)
	})

	test("false AND false and return false", () => {
		expect(binaryOperation.execute({ op: "And", lhs: false, rhs: false })).toBe(false)
	})

	test("true OR true and return true", () => {
		expect(binaryOperation.execute({ op: "Or", lhs: true, rhs: true })).toBe(true)
	})

	test("true OR false and return true", () => {
		expect(binaryOperation.execute({ op: "Or", lhs: true, rhs: false })).toBe(true)
	})

	test("false OR true and return true", () => {
		expect(binaryOperation.execute({ op: "Or", lhs: false, rhs: true })).toBe(true)
	})

	test("false OR false and return false", () => {
		expect(binaryOperation.execute({ op: "Or", lhs: false, rhs: false })).toBe(false)
	})
})
