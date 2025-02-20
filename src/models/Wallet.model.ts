import { model, Schema } from "mongoose";

export interface IWallet {
    walletAddress: string;
    nickname: string;
}

const walletSchema = new Schema<IWallet>({
    walletAddress: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Wallet = model<IWallet>("Wallet", walletSchema);

export default Wallet;