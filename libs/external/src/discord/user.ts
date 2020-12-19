import {None, Option} from "funfix-core";
import {JsonBuilder, JsonSerializer} from "@ffk/lib-util";
import {
    botKey,
    discriminatorKey, emailKey, flagsKey,
    idKey,
    localeKey,
    mfaEnabledKey, premiumTierKey, premiumTypeKey, publicFlagsKey,
    systemKey,
    usernameKey,
    verifiedKey
} from "./json-keys";

export class User {

    constructor(
        readonly id: Option<string> = None,
        readonly username: Option<string> = None,
        readonly discriminator: Option<string> = None,
        readonly bot: Option<boolean> = None,
        readonly system: Option<boolean> = None,
        readonly mfaEnabled: Option<boolean> = None,
        readonly locale: Option<string> = None,
        readonly verified: Option<boolean> = None,
        readonly email: Option<string> = None,
        readonly flags: Option<string> = None, // TODO: Implement Flags
        readonly premiumType: Option<number> = None,
        readonly publicFlags: Option<string> = None // TODO: Implement Flags
    ) {
    }

    public getId(): Option<string> {
        return this.id;
    }

    public getUsername(): Option<string> {
        return this.username;
    }

    public getDiscriminator(): Option<string> {
        return this.discriminator;
    }

    public getBot(): Option<boolean> {
        return this.bot;
    }

    public getSystem(): Option<boolean> {
        return this.system;
    }

    public getMfaEnabled(): Option<boolean> {
        return this.mfaEnabled;
    }

    public getLocale(): Option<string> {
        return this.locale;
    }

    public getVerified(): Option<boolean> {
        return this.verified;
    }

    public getEmail(): Option<string> {
        return this.email;
    }

    public getFlags(): Option<string> {
        return this.flags;
    }

    public getPremiumType(): Option<number> {
        return this.premiumType;
    }

    public getPublicFlags(): Option<string> {
        return this.publicFlags;
    }

}

export class UserJsonSerializer extends JsonSerializer<User> {

    static instance: UserJsonSerializer = new UserJsonSerializer();

    fromJson(json: any): User {
        return new User();
    }

    toJson(value: User, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getUsername(), usernameKey)
            .addOptional(value.getDiscriminator(), discriminatorKey)
            .addOptional(value.getBot(), botKey)
            .addOptional(value.getSystem(), systemKey)
            .addOptional(value.getMfaEnabled(), mfaEnabledKey)
            .addOptional(value.getLocale(), localeKey)
            .addOptional(value.getVerified(), verifiedKey)
            .addOptional(value.getEmail(), emailKey)
            .addOptional(value.getFlags(), flagsKey)
            .addOptional(value.getPremiumType(), premiumTypeKey)
            .addOptional(value.getPublicFlags(), publicFlagsKey)
            .build();
    }

}