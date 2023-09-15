import { test, describe, expect } from "bun:test"
import { FileService } from "./FileService"

describe("FileService", () => {
	const fileService = new FileService()

	test("readDir should return a list of files", async () => {
		const files = await fileService.readDir("./jsons")
		expect(files).toContain("combination.json")
    expect(files).toContain("fib.json")
    expect(files).toContain("sum.json")
	})

	test("readJson should return a json", async () => {
		const json = await fileService.readJson("./jsons/combination.json")
		expect(json).toBeDefined() 
	})
})
