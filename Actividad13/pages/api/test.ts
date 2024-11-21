import { NextApiRequest, NextApiResponse } from "next";
import authMiddleware from "../../graphql/middlewares/authMiddleware";

const testHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ message: "Authorized! Middleware is working correctly." });
};

export default authMiddleware(testHandler);
