import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { usersService } from "src/services/usersService";

import responseCreator from "src/services/utils/responseCreator";

export const handler = async (): Promise<APIGatewayProxyResult> => {
  try {
    const availableNumbers = await usersService.getAllAvailableNumbers();
    return responseCreator.default(JSON.stringify(availableNumbers), 200);
  } catch (err) {
    return responseCreator.error(err);
  }
};
