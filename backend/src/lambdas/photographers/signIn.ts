import middy from "@middy/core";
import jsonBodyParser from "@middy/http-json-body-parser";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
} from "aws-lambda/trigger/api-gateway-proxy";
import Joi from "joi";
import { errorHandlerMiddleware } from "src/middleware/errorHandler";
import { validateBodyMiddleware } from "src/middleware/validateBody";
import { LoginModel } from "src/models/photographer";
import { photographersService } from "src/services/photographersService";
import responseCreator from "src/services/utils/responseCreator";
const loginRequest = Joi.object({
  password: Joi.string().required(),
  login: Joi.string().required(),
});
const login = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const { password, login } = event.body as unknown as LoginModel;
  const result = await photographersService.signIn(password, login);
  return responseCreator.default(JSON.stringify(result), 200);
};
export const handler = middy()
  .use(jsonBodyParser())
  .use(validateBodyMiddleware(loginRequest))
  .use(errorHandlerMiddleware())
  .handler(login);
