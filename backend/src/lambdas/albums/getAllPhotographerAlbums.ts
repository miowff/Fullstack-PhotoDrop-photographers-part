import middy from "@middy/core";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { albumsService } from "src/services/albumsService";
import responseCreator from "src/services/utils/responseCreator";
const getAllPhotographerAlbums = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { photographerId } = event.requestContext.authorizer?.lambda;
  const albums = await albumsService.getAllPhotographerAlbums(photographerId);
  return responseCreator.default(JSON.stringify(albums), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getAllPhotographerAlbums);
