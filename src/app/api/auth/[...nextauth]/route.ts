import NextAuth from "next-auth";
import { authOptions } from "./authOptions";

const handler = NextAuth(authOptions);
export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as DELETE,
  handler as PATCH,
};
