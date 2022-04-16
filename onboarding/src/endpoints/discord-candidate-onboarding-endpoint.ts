import {ApiEndpoint} from "@kashw2/lib-server";
import {NextFunction, Request, Response, Router} from "express";
import {Either} from "funfix";
import {ApiUtils, EitherUtils} from "@kashw2/lib-util";
import {ApiTemplate, ApiTemplateJsonSerializer, CandidateJsonSerializer} from "@kashw2/lib-ts";
import {AllOnboardingTemplates} from "../templates/all-onboarding-templates";

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
                        const importedCandidate = await EitherUtils.sequence(EitherUtils.toEither(template.getCode(), 'Unable to get Template code')
                            .flatMap(code => AllOnboardingTemplates.getOnbboardingTemplate(code))
                            .map(temp => temp.importCandidate()));
                        importedCandidate.fold(
                            (left) => ApiUtils.sendError(res, left, 400),
                            (candidate) => {
                                ApiUtils.sendSerializedListResponse(res, candidate.toArray(), CandidateJsonSerializer.instance);
                            },
                        );
                    }
                );
        });
    }

}