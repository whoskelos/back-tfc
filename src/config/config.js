// uuidGenerator.js
import { v4 as uuidv4 } from "uuid";
import multer, { memoryStorage } from "multer";
import { config } from "dotenv";
config();

/**
 * Retorna un UUID para asignarlo como ID donse se requiera
 * @returns Random UUID
 */
export function generateUUID() {
    return uuidv4();
}

export const upload = multer({ storage: multer.memoryStorage() });

export const HOST = "http://localhost:3000/api/v1/paypal";
export const PAYPAL_API_CLIENT = process.env.PAYPAL_API_CLIENT;
export const PAYPAL_API_SECRET = process.env.PAYPAL_API_SECRET;
export const PAYPAL_API = "https://api-m.sandbox.paypal.com";

export const CLIENT_URL = process.env.CLIENT_URL;
