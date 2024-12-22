import { DefaultSession, DefaultUser } from "next-auth";
import type { Connection, Types } from "mongoose";
 
declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
  }

  interface Session extends DefaultSession {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

declare global {
  let mongoose: {
    Types: Types;
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}
