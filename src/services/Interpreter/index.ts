import { InterpreterRequest } from "./dtos/InterpreterRequest";

export interface IInterpreter {
  execute: (req: InterpreterRequest) => any;
}