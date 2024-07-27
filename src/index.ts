import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { resolve } from "path";
import chalk from "chalk";

dotenv.config({ path: resolve(__dirname, ".env.local") });

const BOT_API_KEY = process.env.BOT_API_TOKEN;

const main = async () => {
  try {
    if (!BOT_API_KEY) {
      throw new Error("BOT_API_KEY is not defined");
    }

    const bot = new Telegraf(BOT_API_KEY);

    bot.start((ctx) =>
      ctx.reply("Welcome tally app!", {
        reply_markup: {
          keyboard: [
            ["Increment by 5"],
            ["Deposit 1 TON"],
            ["Withdraw 0.7 TON"],
          ],
        },
      })
    );

    bot.hears("Increment by 5", (ctx) => {
      ctx.reply("Incremented by 5");
    });

    bot.hears("Deposit 1 TON", (ctx) => {
      ctx.reply("Deposited 1 TON");
    });

    bot.hears("Withdraw 0.7 TON", (ctx) => {
      ctx.reply("Withdrawn 0.7 TON");
    });

    bot.launch();

    process.once("SIGINT", () => bot.stop("SIGINT"));
    process.once("SIGTERM", () => bot.stop("SIGTERM"));
  } catch (error) {
    console.error(chalk.red(error));
  }
};

main();
