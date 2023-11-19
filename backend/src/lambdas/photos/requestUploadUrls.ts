import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { validateBodyMiddleware } from "src/middleware/validateBody";
import {
  PhotoData,
  RequestUrlsForPhotos,
} from "src/models/requestUrlsForPhotos";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";
import { s3Service } from "src/services/utils/s3Service";

const requestUploadRequest = Joi.object({
  photosData: Joi.array<PhotoData[]>().required(),
  albumId: Joi.string().required(),
});

const requestUploadUrls = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { photosData, albumId } = event.body as unknown as RequestUrlsForPhotos;
  const { title: albumTitle } = await albumsService.getById(albumId);
  const urls = await s3Service.createPreSignedPostUrls(photosData, albumTitle);
  return responseCreator.default(JSON.stringify(urls), 200);
};

export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(requestUploadRequest))
  .use(errorHandlerMiddleware())
  .handler(requestUploadUrls);
