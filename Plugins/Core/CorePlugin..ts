import { InteractionResponseType } from "discord-api-types/v10";
import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { Context } from "../../Source/Context";
import {
  InteractionContextType,
  IntegrationType,
  ApplicationCommandType
} from "@antibot/interactions";

export = DefinePlugin({
  name: "Core",
  description: "Core process",
  commands: [
    {
      command: {
        name: "ping",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Pong!",
        contexts: [InteractionContextType.BOT_DM, InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
        integration_types: [IntegrationType.USER_INSTALL],
        options: []
      },
      on(ctx, interaction) {
        interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "pong!"}})
      },
    }
  ],
  public_plugin: true
})
