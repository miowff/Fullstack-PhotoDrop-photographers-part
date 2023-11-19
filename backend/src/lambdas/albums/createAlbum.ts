import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import responseCreator from "src/services/utils/responseCreator";
import jsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { validateBodyMiddleware } from "src/middleware/validateBody";
import Joi from "joi";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { CreateAlbumModel } from "src/db/entities/album";
import { albumsService } from "src/services/albumsService";

const createAlbumRequest = Joi.object({
  title: Joi.string().required(),
  location: Joi.string().required(),
  dataPicker: Joi.string().required(),
});

const createAlbum = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { photographerId } = event.requestContext.authorizer?.lambda;
  const createAlbumRequest = event.body as unknown as CreateAlbumModel;
  const newAlbum = await albumsService.createNewAlbum(
    createAlbumRequest,
    photographerId
  );
  return responseCreator.default(JSON.stringify(newAlbum), 200);
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(createAlbumRequest))
  .use(errorHandlerMiddleware())
  .handler(createAlbum);
