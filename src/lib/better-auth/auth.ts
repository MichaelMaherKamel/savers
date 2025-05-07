import { betterAuth } from "better-auth";
import { admin, username } from "better-auth/plugins"
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        schema: schema,
    }),
    emailAndPassword: {  
        enabled: true
    },
    session:{
        cookieCache: {
            enabled: true,
            maxAge: 60 * 60,
        }
    },
    plugins: [ 
        username(),
        admin() 
    ] 
});