import { ApiError } from "src/errors/apiError";
import { HEADERS } from "src/lambdas/headers";

class ResponseCreator {
  default = (data: string, statusCode: number) => {
    return {
      statusCode: statusCode,
      headers: HEADERS,
      body: data,
    };
  };
  error = (err: unknown) => {
    if (err instanceof ApiError) {
      return {
        statusCode: err.code,
        headers: HEADERS,
        body: JSON.stringify(`${err.message}`),
      };
    }
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Bad request: ${err}`),
    };
  };
  missedAuthHeader = () => {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Authorization header is missing.`),
    };
  };
  missedEventBody = () => {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`JSON body is missing.`),
    };
  };
  missedQueryStringParams = () => {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Query string params is missing.`),
    };
  };
  missedRequestAuthorizerContext = () => {
    return {
      statusCode: 400,
      headers: HEADERS,
      body: JSON.stringify(`Request authorizer context is missing.`),
    };
  };
  unauthorized = () => {
    return {
      statusCode: 401,
      headers: HEADERS,
      body: JSON.stringify(`Unauthorized`),
    };
  };
}
const responseCreator = new ResponseCreator();
export default responseCreator;
