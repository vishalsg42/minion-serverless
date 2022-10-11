import { faker } from "@faker-js/faker"
import { v4 as uuidv4 } from "uuid"
import AWS from "aws-sdk"

type MinionSchema = {
  MinionId: string
  emailId: string
  isAvailable: boolean
}
export default function seed(limit: number = 10): Array<MinionSchema> {
  let seedData: Array<MinionSchema> = []
  for (let index = 0; index <= limit; index++) {
    seedData.push({
      MinionId: uuidv4(),
      emailId: faker.internet.email().toLowerCase(),
      isAvailable: Math.random() < 0.5,
    })
  }
  return seedData
}

export async function migrate() {
  const data = seed(20)
  //   const dynamoDB = new AWS.DynamoDB({
  //     region: process.env.AWS_REGION, // If not set, will get from ~/.aws directory or environment variable
  //     // and rest of properties
  //   })

  const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: process.env.AWS_REGION })
  for (let index = 0; index < data.length; index++) {
    const element = data[index]
    await dynamoDB
      .put({
        Item: element,
        TableName: "minion",
      })
      .promise()
  }
}
