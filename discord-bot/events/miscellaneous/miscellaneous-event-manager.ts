import {Client} from "discord.js";
import {EventManager} from "../event-manager";
import {DebugEvent} from "./events/debug-event";
import {DisconnectEvent} from "./events/disconnect-event";
import {ErrorEvent} from "./events/error-event";
import {PresenceUpdateEvent} from "./events/presence-update-event";
import {RateLimitEvent} from "./events/rate-limit-event";
import {ReadyEvent} from "./events/ready-event";
import {ReconnectingEvent} from "./events/reconnecting-event";
import {ResumeEvent} from "./events/resume-event";
import {VoiceStateUpdateEvent} from "./events/voice-state-update-event";
import {WarnEvent} from "./events/warn-event";
import {WebhookUpdateEvent} from "./events/webhook-update-event";

export class MiscellaneousEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new ReadyEvent(this.clientManager.getClient()).initialiseEvent();
        new DebugEvent(this.clientManager.getClient()).initialiseEvent();
        new ErrorEvent(this.clientManager.getClient()).initialiseEvent();
        new PresenceUpdateEvent(this.clientManager.getClient()).initialiseEvent();
        new RateLimitEvent(this.clientManager.getClient()).initialiseEvent();
        new DisconnectEvent(this.clientManager.getClient()).initialiseEvent();
        new ReconnectingEvent(this.clientManager.getClient()).initialiseEvent();
        new ResumeEvent(this.clientManager.getClient()).initialiseEvent();
        new VoiceStateUpdateEvent(this.clientManager.getClient()).initialiseEvent();
        new WarnEvent(this.clientManager.getClient()).initialiseEvent();
        new WebhookUpdateEvent(this.clientManager.getClient()).initialiseEvent();
    }

}
