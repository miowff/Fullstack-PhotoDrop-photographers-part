import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { validateBodyMiddleware } from "src/middleware/validateBody";
import { AttachUsersToPhotoRequest } from "src/models/attachUsersModel";
import { photosService } from "src/services/photosService";
import { jsonToMap } from "src/services/utils/JSONToMap";
import responseCreator from "src/services/utils/responseCreator";

const attachUsersRequest = Joi.object({
  albumId: Joi.string().required(),
  userPhotoMap: Joi.string().required(),
});

const attachPhotosToUser = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { albumId, userPhotoMap } =
    event.body as unknown as AttachUsersToPhotoRequest;
  const userPhoto = jsonToMap(userPhotoMap);
  await photosService.attachUsersToPhoto({ albumId, userPhoto });
  return responseCreator.default(
    JSON.stringify(`${albumId} + ${userPhoto}`),
    200
  );
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(attachUsersRequest))
  .use(errorHandlerMiddleware())
  .handler(attachPhotosToUser);
