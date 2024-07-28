import { Response, Request } from "express";
import {
  APIInteractionResponseChannelMessageWithSource,
  ApplicationCommandOptionType,
  Snowflake,
  APIInteractionDataOptionBase,
  APIBaseInteraction,
  APIApplicationCommandInteractionDataSubcommandOption,
  InteractionType,
  APICommandAutocompleteInteractionResponseCallbackData,
  ApplicationCommandType,
  APIContextMenuInteractionData
} from "discord-api-types/v10";
import { MessageComponent } from "discord-interactions";

type ValueResponse<T> = Pick<APIInteractionDataOptionBase<ApplicationCommandOptionType, T>, "name" | "type" | "value">;
export type Combine<T extends any[]> = T extends [infer F, ...infer R] ? F & Combine<R> : unknown;
export class Discord {
    #req: Request;
    #res: Response;
    constructor(req: Request, res: Response) {
      this.#req = req;
      this.#res = res;
  }

    public send(options: APIInteractionResponseChannelMessageWithSource): void {
        this.#res.send(options);
    }

    public getSubCommand(name: string): APIBaseInteraction<InteractionType.ApplicationCommand, Pick<Combine<[APIApplicationCommandInteractionDataSubcommandOption, Record<"id", Snowflake>]>, "id" | "name" | "options"| "type">> {
        const subCommand: APIBaseInteraction<InteractionType.ApplicationCommand, Combine<[APIApplicationCommandInteractionDataSubcommandOption, Record<"id", Snowflake>]>> = this.#req.body;
        for (const sub of subCommand.data.options) {
          if (sub.name == name) return subCommand;
        }
    }

    public get isAutocomplete(): boolean {
        const autocomplete: APIBaseInteraction<InteractionType.ApplicationCommandAutocomplete, APICommandAutocompleteInteractionResponseCallbackData> = this.#req.body;
        return autocomplete.type == InteractionType.ApplicationCommandAutocomplete ? true : false;
    }

    public get isMessageComponent(): boolean {
        const messageComponent: APIBaseInteraction<InteractionType.MessageComponent, MessageComponent> = this.#req.body;
        return messageComponent.type == InteractionType.MessageComponent ? true : false;
    }

    public get isContextMenuCommand(): boolean {
        const contextMenu: APIBaseInteraction<InteractionType.ApplicationCommand, APIContextMenuInteractionData> = this.#req.body;
        return (contextMenu.type == InteractionType.ApplicationCommand && contextMenu.data.type == ApplicationCommandType.User) ? true : false
    }
    public getString(name: string): ValueResponse<string> {
        return this._get<ValueResponse<string>>(name, ApplicationCommandOptionType.String);
    }

    public getInteger(name: string): ValueResponse<number> {
        return this._get<ValueResponse<number>>(name, ApplicationCommandOptionType.Integer);
    }
    public getBoolean(name: string): ValueResponse<boolean> {
        return this._get<ValueResponse<boolean>>(name, ApplicationCommandOptionType.Boolean);
    }

    public getUser(name: string): ValueResponse<Snowflake> {
        return this._get<ValueResponse<Snowflake>>(name, ApplicationCommandOptionType.User);
    }

    public getChannel(name: string): ValueResponse<Snowflake> {
        return this._get<ValueResponse<Snowflake>>(name, ApplicationCommandOptionType.Channel);
    }

    public getRole(name: string): ValueResponse<Snowflake> {
        return this._get<ValueResponse<Snowflake>>(name, ApplicationCommandOptionType.Role);
    }

    public getMention(name: string): ValueResponse<Snowflake> {
        return this._get<ValueResponse<Snowflake>>(name, ApplicationCommandOptionType.Mentionable);
    }

    public getNumber(name: string): ValueResponse<number> {
        return this._get<ValueResponse<number>>(name, ApplicationCommandOptionType.Number);
    }

    public getAttachment(name: string): ValueResponse<Snowflake> {
        return this._get<ValueResponse<Snowflake>>(name, ApplicationCommandOptionType.Attachment)
    }
    private _get<T>(value: any, optionType: ApplicationCommandOptionType): T | any {
        const options: Pick<APIInteractionDataOptionBase<ApplicationCommandOptionType, Snowflake>, "name" | "type" | "value">[] = this.#req.body.data.options;
        console.log(options);
        for (const option of options) {
          if (option.name == value && option.type == optionType) return option;
        }
    }
}
