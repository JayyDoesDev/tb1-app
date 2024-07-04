import { InteractionResponseType } from "discord-api-types/v10";
import { DefinePlugin, Plugin } from "../../Common/DefinePlugin";
import { Context } from "../../Source/Context";
import {
  InteractionContextType,
  IntegrationType,
  ApplicationCommandType,
  ApplicationCommandOptionType
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
        interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "pong!"}});
      },
    },
    {
      command: {
        name: "subtest",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Sub command test",
        contexts: [InteractionContextType.BOT_DM, InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
        integration_types: [IntegrationType.USER_INSTALL],
        options: [
          {
            name: "test",
            type: ApplicationCommandOptionType.SUB_COMMAND,
            description: "testtestsetst",
            options: [],
          },
          {
            name: "test2",
            type: ApplicationCommandOptionType.SUB_COMMAND,
            description: "testtestsetst",
            options: [],
          }
        ]
      },
      on(ctx, interaction) {
          if (interaction.getSubCommand("test")) {
            interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "test" }});
          } else {
            interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "test2" }});
          }
      },
    }
  ],
  public_plugin: true
})
