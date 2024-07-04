import { Response, Request } from "express";
import {
  APIInteractionResponseChannelMessageWithSource,
  ApplicationCommandOptionType,
  Snowflake
} from "discord-api-types/v10";

type ValueResponse<T> = Record<"value", T>;
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
        const options: { name: string, type: number, value: Snowflake }[] = this.#req.body;
        for (const option of options) {
          if (option.name == value && option.type == optionType) {
            return option;
          }
        }
    }
}
