import { Request } from "express";

import { User } from "../../users";

// TODO use DTO instead ?
export interface AppRequest extends Request {
  user?: User;
}
