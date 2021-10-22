import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { verify } from "jsonwebtoken";

export const authenticated =
  (fn: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {};
