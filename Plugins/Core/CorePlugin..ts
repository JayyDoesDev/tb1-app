import { InteractionResponseType, MessageFlags } from "discord-api-types/v10";
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
        interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "pong!" } });
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
        interaction.getSubCommand("test") ? interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "test" } }) : interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "test2" } });
      },
    },
    {
      command: {
        name: "whois",
        type: ApplicationCommandType.CHAT_INPUT,
        description: "Sub command test",
        contexts: [InteractionContextType.BOT_DM, InteractionContextType.GUILD, InteractionContextType.PRIVATE_CHANNEL],
        integration_types: [IntegrationType.USER_INSTALL],
        options: [
          {
            name: "ip",
            type: ApplicationCommandOptionType.STRING,
            description: "Provide the ip you would like to check",
            options: []
          }
        ]
      },
      async on(ctx, interaction) {
        const ip: string = interaction.getString("ip").value;
        if (/\b((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\b/.test(ip)) {
          const data = await fetch(`http://ipwho.is/${ip}`);
          data.json().then((x) => {
            if (x.success) {
              return interaction.send({
                type: InteractionResponseType.ChannelMessageWithSource,
                data: {
                  embeds: [
                  {
                      title: ip,
                      description: `**> Type: ${x.type}**`
                    }
                  ],
                  flags: MessageFlags.Ephemeral
                }
              })
            } else {
              return interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "Could not find this ip!", flags: MessageFlags.Ephemeral }});
            }
          })
        } else {
          return interaction.send({ type: InteractionResponseType.ChannelMessageWithSource, data: { content: "Could not find this ip!", flags: MessageFlags.Ephemeral }});
        }
      },
    }
  ],
  public_plugin: true
})


