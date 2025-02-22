import { Logs, ParsedTransactionWithMeta, PartiallyDecodedInstruction } from "@solana/web3.js";
import { TradeData } from "../types/trade";
import { logParser } from "./logParser";
import { programIdMap } from "../lib/Programs";
import { fetchTransaction } from "../services/Solana.service";

export const logsCallback = async (cb: Logs) => {

    if (cb.err) return

    const logs = cb.logs
    const signature = cb.signature

    if (signature === "1111111111111111111111111111111111111111111111111111111111111111") return

    try {

        let tx: ParsedTransactionWithMeta | null = null
        let trades: TradeData[] = []

        const grouppedLogs = logParser(logs)

        for (let i = 0; i < grouppedLogs.length; i++) {
            const grouppedLog = grouppedLogs[i]
            const programId = grouppedLog.programId?.toString()

            if (!programId) continue

            const program = programIdMap[programId]

            if (!program || !program?.tradeProgram) continue

            let tradeData: TradeData | null = null

            if (program.fetchRequired) {
                tx = await fetchTransaction(signature)

                if (!tx) throw new Error("Transaction not found")

                const instruction = tx.transaction.message.instructions[i] || null

                if (!instruction) throw new Error("Instruction not found")

                tradeData = program.getTradeData({
                    transaction: tx,
                    instruction: instruction as PartiallyDecodedInstruction,
                    index: i,
                    outerIndex: null
                })

                if (tradeData) trades.push(tradeData)
            } else {
                tradeData = program.getTradeData({
                    logs: grouppedLog.logs,
                })
            }

            if (tradeData) trades.push(tradeData)
        }

        if (trades.length > 0) {
            console.log(trades)
        }

    } catch (err) {
        console.error(err)
    }

}