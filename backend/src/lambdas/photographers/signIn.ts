import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import { photographersService } from "src/services/photographersService";
import responseCreator from "src/services/utils/responseCreator";
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return responseCreator.missedEventBody();
    }
    const { password, login } = JSON.parse(event.body);
    const result = await photographersService.signIn(password, login);
    return responseCreator.default(JSON.stringify(result), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
