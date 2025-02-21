import { ParsedInnerInstruction, ParsedTransactionWithMeta, PartiallyDecodedInstruction, PublicKey } from "@solana/web3.js";

export interface TradeData  {
    user : string,
    inputMint : string,
    outputMint : string,
    inputAmount : string,
    outputAmount : string
}

export type Program = {
    programId: PublicKey,
    fetchRequired : boolean,
    tradeProgram : boolean,
    getTradeData : (params : getTradeDataWithTransactionParams | getTradeDataWithLogsParams) => TradeData | null,
    logMatch : (log: string) => boolean
}

export type getTradeDataWithTransactionParams = {
    transaction : ParsedTransactionWithMeta,
    instruction : ParsedInnerInstruction | PartiallyDecodedInstruction,
    index : number,
    outerIndex : number | null
} 

export type getTradeDataWithLogsParams = {
    logs : string[]
}