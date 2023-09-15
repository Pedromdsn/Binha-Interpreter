import { BinaryOp } from "../../../@types/types";

export interface BinaryOptionsRequest {
  op: BinaryOp;
  lhs: any;
  rhs: any;
}