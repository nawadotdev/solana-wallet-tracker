import { Logs, ParsedTransactionWithMeta } from "@solana/web3.js";
import { TradeData } from "../types/trade";
import { logParser } from "./logParser";

export const logsCallback = (cb: Logs) => {

    if (cb.err) return

    const logs = cb.logs
    const signature = cb.signature

    if (signature === "1111111111111111111111111111111111111111111111111111111111111111") return

    try{

        let tx : ParsedTransactionWithMeta | null = null
        let trades : TradeData[] = []

        const grouppedLogs = logParser(logs)

        for(let i = 0; i<grouppedLogs.length; i++){
            const grouppedLog = grouppedLogs[i]
            const programId = grouppedLog.programId?.toString()

            if(!programId) continue
        }

    }catch(err){
        console.error(err)
    }

}