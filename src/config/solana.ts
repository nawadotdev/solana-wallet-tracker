export const RPC_URL = process.env.RPC_URL as string;

if (!RPC_URL) {
    throw new Error("RPC_URL must be defined");
}