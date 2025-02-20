import { Collection, SlashCommandBuilder } from "discord.js";
import { readdirSync } from "fs";
import path from "path";

const commands = new Collection<string, { command: SlashCommandBuilder, execute: any }>();

const commandDir = path.join(__dirname, "../commands");
const commandFiles = readdirSync(commandDir).filter(file => file.endsWith(".js") || file.endsWith(".ts"));

for (const file of commandFiles) {
    const command = require(path.join(commandDir, file)).default;
    if (!command.command) continue;
    commands.set(command.command.name, command);
}

export default commands;
