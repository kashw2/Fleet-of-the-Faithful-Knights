import {Channel} from "discord.js";
import {List} from "immutable";
import {Manager} from "../manager";

export class ChannelManager {

    constructor(private manager: Manager) {
    }

    getClientChannels(): List<Channel> {
        return List(
            this.manager
                .clientManager
                .getClient()
                .channels
                .values(),
        );
    }

}
