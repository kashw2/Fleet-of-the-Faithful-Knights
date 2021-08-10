export class DiscordOnboardingUtils {

    static fixForSql(s: string): string {
        return s.replace(/'/g, '');
    }

}