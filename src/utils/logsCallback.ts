import { Logs } from "@solana/web3.js";

export const logsCallback = (cb: Logs) => {

    if (cb.err) return

    const logs = cb.logs
    const signature = cb.signature

    if (signature === "1111111111111111111111111111111111111111111111111111111111111111") return

    try{

    }catch(err){
        console.error(err)
    }

}