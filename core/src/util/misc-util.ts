export type Groups = 'Developer' | 'Guest' | 'Grand Master' | 'Master Commander' | 'Knight Commander' | 'Knight Lieutenant' | 'Knight' | 'Sergeant First Class' | 'Sergeant'

export class MiscUtil {

    static parseGroup(name: string): Groups {
        switch (name) {
            case 'Developer':
                return 'Developer';
            case 'Guest':
                return 'Guest';
            case 'Grand Master':
                return 'Grand Master';
            case 'Master Commander':
                return 'Master Commander';
            case 'Knight Commander':
                return 'Knight Commander';
            case 'Knight Lieutenant':
                return 'Knight Lieutenant';
            case 'Knight':
                return 'Knight';
            case 'Sergeant First Class':
                return 'Sergeant First Class';
            case 'Sergeant':
                return 'Sergeant';
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return 'Guest';
        }
    }

    static getGroupIdFromName(name: Groups): number {
        switch (name) {
            case 'Developer':
                return 1;
            case 'Guest':
                return 2;
            case 'Grand Master':
                return 3;
            case 'Master Commander':
                return 4;
            case 'Knight Commander':
                return 5;
            case 'Knight Lieutenant':
                return 6;
            case 'Knight':
                return 7;
            case 'Sergeant First Class':
                return 8;
            case 'Sergeant':
                return 9;
            default:
                console.log(`${name} is not a recognised group, defaulting to Guest`);
                return 2;
        }
    }

}
