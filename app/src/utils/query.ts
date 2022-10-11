import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb"
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb"
import * as AWS from "aws-sdk"
import { PromiseResult } from "aws-sdk/lib/request"

type result = PromiseResult<AWS.DynamoDB.DocumentClient.QueryOutput, AWS.AWSError>

const queryAvailableMinion = async function (partitionKey: boolean, limit: number = 10): Promise<result> {
  let result: result
  try {
    const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION })
    result = await dynamoDB
      .scan({
        TableName: process.env.TABLE_NAME || "minion",
        FilterExpression: "#n0 = :v0",
        ExpressionAttributeNames: {
          "#n0": "isAvailable",
        },
        ExpressionAttributeValues: {
          ":v0": {
            BOOL: partitionKey,
          },
        },
        Limit: limit,
      })
      .promise()
  } catch (error) {
    console.error("error while fetching minions", error)
    throw new Error(error as string)
  }
  return result
}
export default queryAvailableMinion
