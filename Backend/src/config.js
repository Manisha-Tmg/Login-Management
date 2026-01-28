import { config } from "dotenv";

export const port = 8000;
config();
export const email = process.env.EMAIL;
export const pass = process.env.PASS;
export const dbUrl = process.env.DB_URL;
export const secretKey = process.env.SECRET_KEY;
