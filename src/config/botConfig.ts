import dotenv from "dotenv";
import { ActivityType, PresenceStatusData } from "discord.js";

dotenv.config();

export default {
    bot: {
      token: process.env.TOKEN || undefined,
      clientId : undefined as string | undefined,
    },
    commands: {
      global: false
    },
    botSettings: {
      activity: "Wallets",
      activityType: 3 as ActivityType,
      status: "online" as PresenceStatusData
    },
    logging: {
      logChannelId: process.env.LOG_CHANNEL_WEBHOOK || undefined,
      errorChannelId: process.env.ERROR_CHANNEL_WEBHHOK || undefined,
    },
  };
  