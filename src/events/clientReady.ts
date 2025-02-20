import { Client, Events } from "discord.js"
import botConfig from "../config/botConfig"

export default (client:Client) => client.on(Events.ClientReady, (cl) => {
    botConfig.bot.clientId = cl.user.id
    console.log(`Logged in as ${cl.user.username}`)
})