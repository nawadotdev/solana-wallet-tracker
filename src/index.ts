import { Client, GatewayIntentBits } from "discord.js";
import botConfig from "./config/botConfig";
import "dotenv/config";
import { readdirSync } from "fs";
import { connectDB } from "./config/db";
import WalletService from "./services/Wallet.service";
import LogSubscriptionService from "./services/LogSubscription.service";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    presence: {
        status: botConfig.botSettings.status,
        activities: [
            {
                name: botConfig.botSettings.activity,
                type: botConfig.botSettings.activityType
            }
        ]
    },
});


const eventFiles = readdirSync("./src/events").filter(file => file.endsWith(".ts") || file.endsWith(".js"));
for (const file of eventFiles) {
    import(`./events/${file}`).then(event => {
        event.default(client);
    });
}


connectDB().then(async () => {

    const wallets = await WalletService.Read();
    for (const wallet of wallets) {
        await LogSubscriptionService.subscribe(wallet.walletAddress);
    }
    
    client.login(botConfig.bot.token);
})