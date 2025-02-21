import { ChatInputCommandInteraction, EmbedBuilder, MessageFlags, PermissionFlagsBits, SlashCommandBuilder } from "discord.js";
import WalletService from "../services/Wallet.service";

export default {
    command: new SlashCommandBuilder()
        .setName("list")
        .setDescription("Lists all wallets in the database")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    execute : async (interaction:ChatInputCommandInteraction) => {
        
        try{
            await interaction.reply({content: "Fetching wallets from the database", flags: MessageFlags.Ephemeral });

            const wallets = await WalletService.Read()

            if(wallets.length === 0){
                return interaction.editReply("No wallets found in the database");
            }

            const embed = new EmbedBuilder()
            .setTitle("Wallets")
            .setDescription("List of all wallets in the database")
            .setFooter({ text : "Powered by nawadotdev - https://x.com/nawadotdev" })

            const chunkSize = 10;
            const fields = [
                { name: "Wallet Address", value: "\u200b", inline: true },
                { name: "Nickname", value: "\u200b", inline: true },
                { name: "\u200b", value: "\u200b", inline: true }
            ];
            
            let walletAddressValue = "";
            let walletNicknameValue = "";
            
            for (const [index, wallet] of wallets.entries()) {
                walletAddressValue += `${wallet.walletAddress}\n`;
                walletNicknameValue += `${wallet.nickname}\n`;
            
                if ((index + 1) % chunkSize === 0 || index === wallets.length - 1) {
                    fields.push(
                        { name: "\u200b", value: walletAddressValue, inline: true },
                        { name: "\u200b", value: walletNicknameValue, inline: true },
                        { name: "\u200b", value: "\u200b", inline: true }
                    );
            
                    walletAddressValue = "";
                    walletNicknameValue = "";
                }
            }

            embed.addFields(fields);

            return interaction.editReply({ embeds: [embed] });
            
        }catch(err){
            console.error(err);
            return interaction.editReply("Internal server error");
        }

    }
}