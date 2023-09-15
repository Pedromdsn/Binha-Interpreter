import { describe, test, expect, spyOn, beforeEach, Mock } from "bun:test"
import { BinaryOperationImp } from "services/BinaryOperation/BinaryOptionImp"
import { FileService } from "infra/FileService/FileService"
import { InterpreterImp } from "./InterpreterImp"

describe("InterpreterImp", () => {
	const fileService = new FileService()
	const binaryOperation = new BinaryOperationImp()
	const interpretService = new InterpreterImp(binaryOperation)

	let spy: Mock<any> = spyOn(console, "log") //fixme: bun:test has issue on type https://github.com/oven-sh/bun/issues/5453

	beforeEach(() => {
		spy.mockReset()
	})

	test("combination should print 45", async () => {
		expect(spy).not.toHaveBeenCalled()
		const ast = await fileService.readJson("./jsons/combination.json")
		const result = interpretService.execute({ term: ast, fileId: "combination.json" })
		expect(spy).toHaveBeenCalledTimes(1)
		expect(result).toBeUndefined()
		expect(spy.mock.calls[0]).toBeDefined()
		expect(spy.mock.calls[0][0]).toBe(45)
	})

	test("fib 20 should print 6765", async () => {
		expect(spy).not.toHaveBeenCalled()
		const ast = await fileService.readJson("./jsons/fib.json")
		const result = interpretService.execute({ term: ast, fileId: "fib.json" })
		expect(spy).toHaveBeenCalledTimes(1)
		expect(result).toBeUndefined()
		expect(spy.mock.calls[0]).toBeDefined()
		expect(spy.mock.calls[0][0]).toBe(6765)
	})

	test("sum should print 15", async () => {
		expect(spy).not.toHaveBeenCalled()
		const ast = await fileService.readJson("./jsons/sum.json")
		const result = interpretService.execute({ term: ast, fileId: "sum.json" })
		expect(spy).toHaveBeenCalledTimes(1)
		expect(result).toBeUndefined()
		expect(spy.mock.calls[0]).toBeDefined()
		expect(spy.mock.calls[0][0]).toBe(15)
	})
})
