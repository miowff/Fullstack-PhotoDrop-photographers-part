import middy from "@middy/core";
import { APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { usersService } from "src/services/usersService";
import responseCreator from "src/services/utils/responseCreator";

const getAllAvailableNumbers = async (): Promise<APIGatewayProxyResult> => {
  const availableNumbers = await usersService.getAllAvailableNumbers();
  return responseCreator.default(JSON.stringify(availableNumbers), 200);
};
export const handler = middy()
  .use(errorHandlerMiddleware())
  .handler(getAllAvailableNumbers);
