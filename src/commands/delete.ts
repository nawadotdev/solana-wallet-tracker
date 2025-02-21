import { PublicKey } from "@solana/web3.js";
import { ChatInputCommandInteraction, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import WalletService from "../services/Wallet.service";

export default {
    command: new SlashCommandBuilder()
        .setName("delete")
        .setDescription("Deletes a wallet from the database")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option => option.setName("wallet").setDescription("The wallet address to add"))
        .addStringOption(option => option.setName("nickname").setDescription("The nickname of the wallet")),
    execute: async (interaction: ChatInputCommandInteraction) => {
        const walletAddress = interaction.options.getString("wallet") || "";
        const nickname = interaction.options.getString("nickname") || "";

        if (!walletAddress && !nickname) {
            return interaction.reply({ content: "Please provide a wallet address or a nickname", flags: MessageFlags.Ephemeral });
        }

        if (walletAddress && nickname) {
            return interaction.reply({ content: "Please provide only a wallet address or a nickname", flags: MessageFlags.Ephemeral });
        }

        if (walletAddress) {
            try {
                new PublicKey(walletAddress);
            } catch (err) {
                return interaction.reply({ content: "Invalid wallet address", flags: MessageFlags.Ephemeral });
            }
        }

        await interaction.reply({ content: "Deleting wallet from the database...", flags: MessageFlags.Ephemeral });

        try {
            const del = await WalletService.DeleteWallet(walletAddress || undefined, nickname || undefined);
            return await interaction.editReply({ content: del.message });
        } catch (err) {
            console.error(err);
            return interaction.editReply("Internal server error");
        }
    }

}