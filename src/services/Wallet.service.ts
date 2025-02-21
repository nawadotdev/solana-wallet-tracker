import Wallet, { IWallet } from "../models/Wallet.model"

const ReadWalletById = async (walletId: string): Promise<IWallet | null> => {
    return Wallet.findById(walletId);
}

const ReadWalletByAddress = async (walletAddress: string): Promise<IWallet | null> => {
    return Wallet.findOne({ walletAddress });
}

const ReadWalletByNickname = async (nickname: string): Promise<IWallet | null> => {
    return Wallet.findOne({ nickname });
}

const Read = async (): Promise<IWallet[]> => {

    return Wallet.find()
}


const CreateWallet = async (walletAddress: string, nickname: string):
    Promise<{
        success: boolean,
        message: string,
    }> => {

    try {
        const walletAddressExists = await Wallet.exists({ walletAddress })

        if (walletAddressExists) return { success: false, message: "Wallet address already exists" }

        const nicknameExists = await Wallet.exists({ nickname })

        if (nicknameExists) return { success: false, message: "Nickname already exists" }

        await Wallet.create({ walletAddress, nickname })

        return { success: true, message: "Wallet created" }
    } catch (err) {
        console.error(err)
        return { success: false, message: "Internal server error" }
    }


}

const DeleteWallet = async (walletAddress?: string, nickname?: string):
    Promise<{
        success: boolean,
        message: string
    }> => {
    try {

        const filter: any = {};
        if (walletAddress) filter.walletAddress = walletAddress;
        if (nickname) filter.nickname = nickname;

        const del = await Wallet.deleteOne(filter);

        if (del.deletedCount === 0) {
            return { success: false, message: "Wallet not found" };
        }
        return { success: true, message: "Wallet deleted" };
    } catch (err) {
        console.error(err);
        return { success: false, message: "Internal server error" };
    }
};


export default {
    Read,
    ReadWalletById,
    ReadWalletByAddress,
    ReadWalletByNickname,
    CreateWallet,
    DeleteWallet
}