import {
  APIGatewayAuthorizerResult,
  APIGatewayRequestAuthorizerEventV2,
} from "aws-lambda";
import { JwtPayload } from "jsonwebtoken";
import { photographersRepository } from "src/db/repositories/photographersRepository";
import { ApiError } from "src/errors/apiError";
import { jwtTokenService } from "src/services/utils/jwtTokensService";

export async function handler(
  event: APIGatewayRequestAuthorizerEventV2
): Promise<APIGatewayAuthorizerResult> {
  try {
    const authToken = event.identitySource[0];
    const { photographerId } = (await jwtTokenService.validateAccessToken(
      authToken
    )) as JwtPayload;
    const photographer = await photographersRepository.getById(photographerId);
    if (!photographer) {
      throw ApiError.NotFound("Photographer");
    }
    return {
      principalId: photographerId,
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Allow",
            Resource: "*",
          },
        ],
      },
      context: {
        photographerId: photographerId,
      },
    };
  } catch (err) {
    throw new ApiError("Unauthorized", 401);
  }
}
