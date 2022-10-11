import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { createHTTPResponse } from "./utils/htt-helpers"
import queryAvailableMinion from "./utils/query"

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const availableMinion = await queryAvailableMinion(true, 5)
  const successResponse = { result: availableMinion } as Record<string, unknown>
  return createHTTPResponse(200, successResponse)
}
