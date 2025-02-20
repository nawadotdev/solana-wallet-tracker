import { Client, Events } from "discord.js"
import botConfig from "../config/botConfig"
import commandUploader from "../utils/commandUploader"

export default (client:Client) => client.on(Events.ClientReady, (cl) => {
    botConfig.bot.clientId = cl.user.id
    console.log(`Logged in as ${cl.user.username}`)
    commandUploader(client)
})