import {None, Option} from "funfix-core";
import {
    groupKey,
    idKey,
    JsonBuilder,
    memberSinceKey,
    nameKey,
    parseNumber,
    parseString,
    SimpleJsonSerializer,
} from "..";
import {Group, MiscUtil} from "../util/misc-util";

export class Candidate {

    constructor(
        readonly id: Option<number> = None,
        readonly name: Option<string> = None,
        readonly group: Option<Group> = None,
        readonly memberSince: Option<string> = None,
    ) {
    }

    public getGroup(): Option<Group> {
        return this.group;
    }

    public getId(): Option<number> {
        return this.id;
    }

    getMemberSince(): Option<string> {
        return this.memberSince;
    }

    public getName(): Option<string> {
        return this.name;
    }

}

export class CandidateJsonSerializer extends SimpleJsonSerializer<Candidate> {

    static instance: CandidateJsonSerializer = new CandidateJsonSerializer();

    fromJson(json: any): Candidate {
        return new Candidate(
            parseNumber(json[idKey]),
            parseString(json[nameKey]),
            MiscUtil.parseGroupOption(json[groupKey]),
            parseString(json[memberSinceKey]),
        );
    }

    toJson(value: Candidate, builder: JsonBuilder): object {
        return builder.addOptional(value.getId(), idKey)
            .addOptional(value.getName(), nameKey)
            .addOptional(value.getGroup(), groupKey)
            .addOptional(value.getMemberSince(), memberSinceKey)
            .build();
    }

}
