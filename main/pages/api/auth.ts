import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const authenticated =
  (fn: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {};

export const checkValid = (...strArray: string[]): boolean => {
  return strArray.filter((str) => str.trim().length === 0).length === 0;
};
