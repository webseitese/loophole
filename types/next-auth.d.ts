import { Plan } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            plan: Plan;
            optimizationsUsedThisMonth: number;
        } & DefaultSession["user"];
    }

    interface User {
        plan: Plan;
        optimizationsUsedThisMonth: number;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        plan: Plan;
        optimizationsUsedThisMonth: number;
    }
}
