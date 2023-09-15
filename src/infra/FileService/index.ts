import { Term } from "../../@types/types"

export interface IFileService {
	readDir: (path: string) => Promise<string[]>
	readJson: (path: string) => Promise<Term>
}
