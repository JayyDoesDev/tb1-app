import { Context } from "../Source/Context";
import glob from "glob";
import path from "path";
import { Command } from "../Common/DefineCommand";
import { ICommand } from "@antibot/interactions";
import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction
} from "discord-api-types/v10";
import { Discord } from "../Common/Discord";

export default function (ctx: Context): void {
  let commands: string[] = []
  process.platform == "linux" ? commands = glob.sync("./Plugins/**/*.js") : commands = glob.sync("./dist/Plugins/**/*.js");

    for (let i = 0; i < commands.length; i++) {
        const filePath = path.resolve(commands[i]);
        const file: any = require(filePath);

        if (!file.name || !file.commands) {
            continue;
        }

        if ('public_plugin' in file) {
            if (file.commands) {
                ctx.plugin.set(file.name, file);
                for (let j = 0; j < file.commands.length; j++) {
                    const command: Command<APIChatInputApplicationCommandInteraction | APIContextMenuInteraction | Discord> = file.commands[j];
                    ctx.interactions.set(command.command.name, command);
                }
            }
        }
    }

    const commandArray: ICommand[] = [];
    ctx.interactions.forEach((x) => { commandArray.push(x.command); });
    process.env.GUILD_ONLY_COMMANDS == "1" ? ctx.interact.overwriteGuildCommands(process.env.GUILD_ONLY_COMMANDS_GUILD_ID, ...commandArray) : ctx.interact.overwriteGlobalCommands(...commandArray);
}
