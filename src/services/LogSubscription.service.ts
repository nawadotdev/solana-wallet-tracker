import { subscribeLogs, unsubscribeLogs } from "./Solana.service";
import { PublicKey } from "@solana/web3.js";
import { Programs } from "../lib/Programs";
import { logsCallback } from "../utils/logsCallback";

interface LogSubscription {
    walletAddress: string;
    subscriptionId: number;
}

class LogSubscriptionService {
    private static subscriptions: Map<string, LogSubscription> = new Map();

    static async subscribe(walletAddress: string): Promise<boolean> {
        console.log("Subscribing to wallet:", walletAddress)
        try {
            if (this.subscriptions.has(walletAddress)) {
                return true;
            }

            const subscriptionId = subscribeLogs(new PublicKey(walletAddress), (cb) => {
                logsCallback(cb)
            });

            this.subscriptions.set(walletAddress, {
                walletAddress,
                subscriptionId
            });

            return true;
        } catch (error) {
            console.error(`Error subscribing to wallet ${walletAddress}:`, error);
            return false;
        }
    }

    static async unsubscribe(walletAddress: string): Promise<boolean> {
        console.log("Unsubscribing from wallet:", walletAddress)
        try {
            const subscription = this.subscriptions.get(walletAddress);
            if (!subscription) {
                return true;
            }

            unsubscribeLogs(subscription.subscriptionId);
            this.subscriptions.delete(walletAddress);

            return true;
        } catch (error) {
            console.error(`Error unsubscribing from wallet ${walletAddress}:`, error);
            return false;
        }
    }

    static getSubscriptions(): Map<string, LogSubscription> {
        return this.subscriptions;
    }
}

export default LogSubscriptionService; 