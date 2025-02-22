import { Connection as Con, LogsCallback, LogsFilter } from "@solana/web3.js";
import { RPC_URL } from "../config/solana";

export const Connection = new Con(RPC_URL, "confirmed");

export const subscribeLogs = (filter: LogsFilter,callback: LogsCallback) => {
    return Connection.onLogs(filter, callback, "confirmed")
}

export const unsubscribeLogs = (subscriptionId : number) => {
    Connection.removeOnLogsListener(subscriptionId)
    return true
}

const MAX_RETRIES = 10;
const RETRY_DELAY_MS = 1000;

export const fetchTransaction = async (signature: string) => {
    let attempts = 0;
  
    while (attempts < MAX_RETRIES) {
      try {
        const tx = await Connection.getParsedTransaction(signature, {
          maxSupportedTransactionVersion: 0,
          commitment: "confirmed",
        });
  
        if (tx) {
          return tx;
        }
  
        await delay(RETRY_DELAY_MS * attempts);
      } catch (error) {
        console.error("Transaction fetch error:", error);
      }
      attempts++;
    }
    return null;
  };
  
  const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
  