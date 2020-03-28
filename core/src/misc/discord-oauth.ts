import {None, Option} from "funfix-core";
import axios from 'axios';
import {PromiseUtils} from "../util/promise-utils";

export class DiscordOauth {

    constructor(
        private clientId: Option<string> = Option.of(process.env.FFK_DISOCRD_PANEL_CLIENT_ID),
        private redirectUri: Option<string> = Option.of(process.env.FFK_PANEL_ADDRESS),
        private scope: string[] = ["identify", "guilds"],
        private discordLoginUrl: string = 'https://discordapp.com/api/oauth2/authorize'
    ) {
    }

    getClientId(): Option<string> {
        return this.clientId;
    }

    getScope(): string {
        return this.scope
            .join('%20');
    }

    getRedirectUri(): Option<string> {
        return this.redirectUri;
    }

    getDiscordUrl(): string {
        return this.discordLoginUrl;
    }

    getResponseType(): string {
        return 'code';
    }

    buildRequest(): Option<string> {
        return Option.map2(this.getClientId(), this.getRedirectUri(), (cid, uri) => {
            return this.getDiscordUrl()
                .concat(`?client_id=${cid}`)
                .concat(`&redirect_uri=${encodeURIComponent(uri)}`)
                .concat(`&response_type=${this.getResponseType()}`)
                .concat(`&scope=${this.getScope()}`);
        })
    }

    sendRequest(): Promise<Option<any>> {
        return PromiseUtils.deliverPromiseOption(
            this.buildRequest()
                .map(x => axios.get(x))
        )
    }

}
