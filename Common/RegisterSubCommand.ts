/*import { Context } from "../Source/Context";
import { Combine, Discord } from "./Discord";
import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction,
  APICommandAutocompleteInteractionResponseCallbackData,
  APIInteractionResponseCallbackData
} from "discord-api-types/v10";

interface RegisterSubCommandOptions<Discord> {
    subCommand: string;
    ctx: Context;
    interaction: Discord;
    callback: (ctx: Context, interaction: Discord) => Promise<APIInteractionResponseCallbackData | void>;
    autocomplete?: (ctx: Context, interaction: Discord) => Promise<APIInteractionResponseCallbackData | void>;
}

export async function RegisterSubCommand<T>(options: RegisterSubCommandOptions<Combine<[APIChatInputApplicationCommandInteraction | APIContextMenuInteraction | APICommandAutocompleteInteractionResponseCallbackData | Discord]>>): Promise<void> {
    switch (true) {
      options.interaction.
        case options.interaction.isMessageComponent: {
            if (options.interaction) {
                await options.callback(options.ctx, options.interaction);
            }
            break;
        }
        case options.interaction.isContextMenuCommand: {
            if (options.interaction.commandName === options.subCommand) {
                await options.callback(options.ctx, options.interaction);
            }
            break;
        }
        case options.interaction.isAutocomplete: {
            if (options.autocomplete && options.interaction.options.getSubcommand() === options.subCommand) {
                await options.autocomplete(options.ctx, options.interaction);
            }
            break;
        }
    }
}

*/
