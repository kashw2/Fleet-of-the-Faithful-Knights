import {Either, Left, Right} from "funfix-core";
import {Manager} from "../manager";

export class UserManager {

    constructor(private manager: Manager) {
    }

    getClientTag(): string {
        return this.manager.clientManager.getClient()
            .user
            .tag;
    }

    async getPremiumSince(): Promise<Either<string, Date>> {
        if (this.isClientPremium()) {
            const profile = await this.manager.clientManager.getClient()
                .user
                .fetchProfile();
            return Right(profile.premiumSince);
        }
        return Promise.resolve(Left("User is not Premium"));
    }

    isBot(): boolean {
        return this.manager.clientManager.getClient()
            .user
            .bot;
    }

    isClientPremium(): boolean {
        return this.manager.clientManager.getClient()
            .user
            .premium;
    }

}
