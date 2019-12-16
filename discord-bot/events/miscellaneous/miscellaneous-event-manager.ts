import {EventManager} from "../event-manager";
import {Client} from "discord.js";
import {ReadyEvent} from "./ready-event";
import {DebugEvent} from "./debug-event";
import {ErrorEvent} from "./error-event";
import {PresenceUpdateEvent} from "./presence-update-event";
import {RateLimitEvent} from "./rate-limit-event";
import {DisconnectEvent} from "./disconnect-event";
import {ReconnectingEvent} from "./reconnecting-event";
import {ResumeEvent} from "./resume-event";
import {VoiceStateUpdateEvent} from "./voice-state-update-event";
import {WarnEvent} from "./warn-event";
import {WebhookUpdateEvent} from "./webhook-update-event";

export class MiscellaneousEventManager extends EventManager {

    constructor(readonly client: Client) {
        super(client);
    }

    initialiseEvent(): void {
        new ReadyEvent(this.getClient()).initialiseEvent();
        new DebugEvent(this.getClient()).initialiseEvent();
        new ErrorEvent(this.getClient()).initialiseEvent();
        new PresenceUpdateEvent(this.getClient()).initialiseEvent();
        new RateLimitEvent(this.getClient()).initialiseEvent();
        new DisconnectEvent(this.getClient()).initialiseEvent();
        new ReconnectingEvent(this.getClient()).initialiseEvent();
        new ResumeEvent(this.getClient()).initialiseEvent();
        new VoiceStateUpdateEvent(this.getClient()).initialiseEvent();
        new WarnEvent(this.getClient()).initialiseEvent();
        new WebhookUpdateEvent(this.getClient()).initialiseEvent();
    }

}
