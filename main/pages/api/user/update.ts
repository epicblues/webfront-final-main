import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import clientPromise, { getNextSequence } from "../../../util/mongodb";
import { hash } from "bcrypt";
import { authenticated } from "../../../util/auth";

const Update: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const userForm = req.body;
  console.log(userForm);
  const password = await hash(userForm.password, 10);

  try {
    const client = await clientPromise;

    const result = await client
      .db("webfront")
      .collection("user")
      .updateOne(
        { email: userForm.email },
        { $set: { ...userForm, password } }
      );
    res.status(200).json(result ? { status: "OK" } : { status: "Failed" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: JSON.stringify(err) });
  }
};

export default authenticated(Update);
