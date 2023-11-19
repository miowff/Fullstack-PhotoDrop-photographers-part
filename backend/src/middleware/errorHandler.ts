import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import responseCreator from "src/services/utils/responseCreator";
export const errorHandlerMiddleware = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const onError: middy.MiddlewareFn<APIGatewayProxyEvent> = async (request) => {
    return responseCreator.error(request.error);
  };

  return {
    onError,
  };
};
