import { BaseInteraction, Client, Events } from "discord.js"
import botConfig from "../config/botConfig"
import commandUploader from "../utils/commandUploader"
import commands from "../utils/commandHandler";

export default (client: Client) => client.on(Events.InteractionCreate, async (interaction: BaseInteraction) => {

    if (interaction.isAutocomplete()) return;
    console.log(interaction.isChatInputCommand())
    if (interaction.isChatInputCommand()) {

        const command = commands.get(interaction.commandName)

        if (!command) return;

        try {
            await command.execute(interaction)
        } catch (error) {
            console.error(error)
            await interaction.reply({ content: "There was an error while executing this command!", ephemeral: true })
        }

    } else {
        if (interaction.isRepliable()) {
            await interaction.reply("This interaction is not supported")
        }
    }

})