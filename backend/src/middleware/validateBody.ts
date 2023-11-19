import middy from "@middy/core";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import Joi from "joi";
import responseCreator from "src/services/utils/responseCreator";

export const validateBodyMiddleware = (
  schema: Joi.Schema
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent> = async (request) => {
    const { body } = request.event;
    if (!body) {
      return responseCreator.missedEventBody();
    }
    const { error } = schema.validate(body, { abortEarly: false });
    if (error) {
      return responseCreator.error(error);
    }
  };
  return {
    before,
  };
};
