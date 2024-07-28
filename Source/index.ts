import { verifyKeyMiddleware } from "discord-interactions";
import { Context } from "./Context";
import { config } from "dotenv";
import ngrok from "ngrok";
import { Command } from "../Common/DefineCommand";
import { Discord } from "../Common/Discord";
import {
  APIChatInputApplicationCommandInteraction,
  APIApplicationCommand,
  APIContextMenuInteraction,
  InteractionType,
  InteractionResponseType,
} from "discord-api-types/v10";

config();
const ctx: Context = new Context();
["Command"].forEach(async (x) => {
  await require(`../Handlers/${x}`).default(ctx);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled promise rejection:", error);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception:", error);
});

ctx.kotoba
  .middleware(verifyKeyMiddleware(process.env.PUBLICKEY))
  .createRequest({
    method: "post",
    route: "/interactions",
    callback: (req, res) => {
      const d = ctx.kotoba.setRequestAndResponse(req, res);
      d.getBody("type")
        .then((type: InteractionType) => {
          d.getBody("data")
            .then((data: APIApplicationCommand) => {
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
            })
        })
    }
  })
  .startApp(`Listening to port ${ctx.kotoba.port}`);

(async () => {
  const url: string = await ngrok.connect({ addr: process.env.PORT, authtoken: process.env.NGROK });
  console.log(url);
})();
