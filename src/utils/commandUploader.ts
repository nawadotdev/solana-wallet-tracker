import { readdirSync } from "fs"
import botConfig from "../config/botConfig"
import { Client, REST, Routes } from "discord.js"

export default async (client:Client) : Promise<void> => {

    if(!botConfig.bot.token) throw new Error("No token provided")

        const commands = readdirSync("./src/commands")
        .filter(file => file.endsWith(".ts"))
        .map(file => require(`../commands/${file}`).default.command.toJSON());

    const rest = new REST().setToken(botConfig.bot.token)

    try{
        const guilds = await client.guilds.fetch().then(guilds => guilds.map(guild => guild.id))
        for(const guild of guilds){
            const data = await rest.put(
                Routes.applicationGuildCommands(client.user?.id as string, guild),
                { body: commands }
            )
            if((data as Array<any>).length != commands.length){
                console.error(`Error uploading commands to ${guild}`)
            }
        }

        console.log("Successfully uploaded commands")
    }catch(err){
        console.error(err)
    }

}