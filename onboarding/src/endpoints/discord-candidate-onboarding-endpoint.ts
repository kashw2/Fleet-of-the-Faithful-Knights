import {ApiEndpoint} from "@kashw2/lib-server";
import {NextFunction, Request, Response, Router} from "express";
import {Either} from "funfix-core";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {ApiTemplate, ApiTemplateJsonSerializer, Candidate, CandidateJsonSerializer} from "@kashw2/lib-ts";
import {AllOnboardingTemplates} from "../templates/all-onboarding-templates";
import {List} from "immutable";

export class DiscordCandidateOnboardingEndpoint extends ApiEndpoint {

    constructor() {
        super('/candidate');
    }

    private getApiTemplate(req: Request): Either<string, ApiTemplate> {
        return ApiUtils.parseBodyParamSerialized(req, 'template', ApiTemplateJsonSerializer.instance);
    }

    hasPermission(): boolean {
        return true;
    }

    mount(router: Router): void {
        router.post('/candidate', (req: Request, res: Response, next: NextFunction) => {
            this.getApiTemplate(req)
                .fold(
                    (left) => ApiUtils.sendError(res, left, 400),
                    async (template) => {
                        const candidates = EitherUtils.toEither(template.getCode(), 'Unable to get template code')
                            .flatMap(code => AllOnboardingTemplates.getOnbboardingTemplate(code))
                            .map(tmpl => tmpl.importCandidate())
                            .getOrElse(Promise.resolve(List<Candidate>()));
                        candidates.then(v => ApiUtils.sendSerializedListResponse(res, v.toArray(), CandidateJsonSerializer.instance));
                    }
                );
        });
    }

}