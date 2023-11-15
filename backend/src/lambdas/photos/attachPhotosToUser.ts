import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { photosService } from "src/services/photosService";
import { jsonToMap } from "src/services/utils/JSONToMap";
import responseCreator from "src/services/utils/responseCreator";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { albumId, userPhotoMap } = JSON.parse(event.body);
    const userPhoto = jsonToMap(userPhotoMap);
    await photosService.attachUsersToPhoto({ albumId, userPhoto });
    return responseCreator.default(
      JSON.stringify(`${albumId} + ${userPhoto}`),
      200
    );
  } catch (err) {
    return responseCreator.error(err);
  }
};
