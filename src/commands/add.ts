import { PublicKey } from "@solana/web3.js";
import { ChatInputCommandInteraction, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import WalletService from "../services/Wallet.service";

export default {
    command: new SlashCommandBuilder()
        .setName("add")
        .setDescription("Adds a wallet to the database")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName("wallet").setDescription("The wallet address to add").setRequired(true))
        .addStringOption(option => option.setName("nickname").setDescription("The nickname of the wallet").setRequired(true)),
    execute : async (interaction:ChatInputCommandInteraction) => {
        
        const walletAddress = interaction.options.getString("wallet") as string;
        const nickname = interaction.options.getString("nickname") as string;

        try{
            new PublicKey(walletAddress);
        }catch(err){
            return interaction.reply({content: "Invalid wallet address", flags: MessageFlags.Ephemeral });
        }

        try{
            await interaction.reply({content: "Adding wallet to the database", flags: MessageFlags.Ephemeral });
            const create = await WalletService.CreateWallet(walletAddress, nickname);
            if(create.success){
                return await interaction.editReply({ content: create.message });
            }else{
                return await interaction.editReply({ content: create.message });
            }
        }catch(err){
            console.error(err);
            return interaction.editReply("Internal server error");
        }

    }
}