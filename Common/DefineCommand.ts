import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction,
  APICommandAutocompleteInteractionResponseCallbackData,
} from "discord-api-types/v10";
import { Context } from "../Source/Context";
import { ICommand } from "@antibot/interactions";
import { Discord } from "./Discord";

export interface Command<DiscordInteraction extends APIChatInputApplicationCommandInteraction | APIContextMenuInteraction | Discord> {
    command: ICommand;
    permissions?: any[];
    on: (ctx: Context, interaction: Discord) => void;
    autocomplete?: (ctx: Context, interaction: APICommandAutocompleteInteractionResponseCallbackData) => void;
}

export function DefineCommand<DiscordInteraction extends APIChatInputApplicationCommandInteraction | APIContextMenuInteraction | Discord>(options: Command<DiscordInteraction>): Command<DiscordInteraction> {
    return options;
}
