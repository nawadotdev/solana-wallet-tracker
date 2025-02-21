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