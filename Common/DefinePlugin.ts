import { Command } from "./DefineCommand";
import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction,
} from "discord-api-types/v10";

export interface Plugin {
    name: string;
    description: string;
    commands: Command<APIChatInputApplicationCommandInteraction | APIContextMenuInteraction>[];
    public_plugin: boolean;
}

export function DefinePlugin(options: Plugin): Plugin {
    return options;
}
