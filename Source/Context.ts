import {
  APIChatInputApplicationCommandInteraction,
  APIContextMenuInteraction
} from "discord-api-types/v10";
import { ZillaCollection } from "@antibot/zilla";
import { Command } from "../Common/DefineCommand";
import { Interactions, Snowflake } from "@antibot/interactions";
import { Plugin } from "../Common/DefinePlugin";

export class Context {
    public plugin: ZillaCollection<string, Plugin>;
    public interactions: ZillaCollection<string, Command<APIChatInputApplicationCommandInteraction | APIContextMenuInteraction>>;
    public interact: Interactions;

    constructor() {
        this.plugin = new ZillaCollection<string, Plugin>();
        this.interactions = new ZillaCollection<string, Command<APIChatInputApplicationCommandInteraction | APIContextMenuInteraction>>();
        this.interact = new Interactions({
            publicKey: process.env.PUBLICKEY as unknown as string,
            botID: process.env.BOTID as unknown as Snowflake,
            botToken: process.env.TOKEN as unknown as string,
            debug: true,
        });
    }
}
