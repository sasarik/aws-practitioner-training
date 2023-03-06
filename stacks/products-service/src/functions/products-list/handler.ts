import { formatErrorResponse, formatJSONSuccessResponse } from "@helpers/common";
import { APIGatewayProxyEvent } from "aws-lambda";
import { getAvailableProductItems } from "@helpers/db-client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const main = async (_event: APIGatewayProxyEvent) => {
  try {
    const productItems = await getAvailableProductItems();
    return formatJSONSuccessResponse({ products: productItems });
  } catch (error) {
    console.error('~~~~~ The error occurred: ', error);
    return formatErrorResponse(500, 'Server Internal Error');
  }
};
