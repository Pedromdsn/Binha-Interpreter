import { FileService } from "infra/FileService/FileService";
import { BinaryOperationImp } from "services/BinaryOperation/BinaryOptionImp";
import { InterpreterWithMemoImp } from "services/Interpreter/InterpreterWithMemoImp";

export class App {
  async run() {
    const environment = process.env.ENVIRONMENT;
    const fileService = new FileService();
    const binaryOperationService = new BinaryOperationImp();
    const interpretService = new InterpreterWithMemoImp(binaryOperationService);

    if (environment === "development") {
      console.time("Executed all files");
      const files = await fileService.readDir("./assets");
      for (const file of files) {
        console.time(`Executed ${file}`);
        const ast = await fileService.readJson(`./assets/${file}`);
        interpretService.execute({ term: ast, fileId: file });
        console.timeEnd(`Executed ${file}`);
      }
      console.timeEnd("Executed all files");
    } else {
      const ast = await fileService.readJson("/var/rinha/source.rinha.json");
      interpretService.execute({ term: ast, fileId: "source.rinha.json" });
    }
  }
}
