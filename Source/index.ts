import { verifyKeyMiddleware } from "discord-interactions";
import { Context } from "./Context";
import { config } from "dotenv";
import express, { Express, Request, Response } from "express";
import ngrok from "ngrok";
import { Command } from "../Common/DefineCommand";
import { Discord } from "../Common/Discord";
import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction,
  InteractionType,
  InteractionResponseType,
} from "discord-api-types/v10";


config();
const ctx: Context = new Context();
[ "Command" ].forEach(async (x) => {
    await require(`../Handlers/${ x }`).default(ctx);
});
const app: Express = express();

process.on("unhandledRejection", (error) => {
    console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
    console.error("Uncaught exception:", error);
});

app.post('/interactions', verifyKeyMiddleware(process.env.PUBLICKEY), (req: Request, res: Response) => {
  const { type, data } = req.body;
  switch (type) {
    case InteractionType.Ping: {
      res.send({ type: InteractionResponseType.Pong });
    }
    break;
    case InteractionType.ApplicationCommand: {
      const command: Command<APIChatInputApplicationCommandInteraction | APIContextMenuInteraction | Discord> = ctx.interactions.get(data.name);
      command.on(ctx, new Discord(req, res));
    }

  }
});

app.listen(process.env.PORT, () => {
  console.log(`Listening to port ${process.env.PORT}`);
});

(async () => {
  const url: string = await ngrok.connect({ addr: process.env.PORT, authtoken: process.env.NGROK });
  console.log(url);
})();
