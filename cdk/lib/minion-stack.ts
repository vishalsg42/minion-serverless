import { Duration, Stack, StackProps } from "aws-cdk-lib"
import { Construct } from "constructs"
import projectConfig, { Environment } from "../config/config"
import * as apigateway from "aws-cdk-lib/aws-apigateway"
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as cdk from "aws-cdk-lib"

export interface MinionStackProps extends StackProps {
  environment: Environment
  // Set to true for sandbox deployment
  isLocalDeployment?: boolean
}

export class MinionStack extends Stack {
  constructor(scope: Construct, id: string, props: MinionStackProps) {
    super(scope, id, props)

    const minionHandler = new NodejsFunction(
      this,
      `${projectConfig.projectPrefix}-handler-${props.environment.toLowerCase()}`,
      {
        functionName: `RequestMinion`,
        entry: "../app/src/handler.ts",
        memorySize: 256,
        timeout: Duration.seconds(30),
        environment: {},
      }
    )

    const api = new apigateway.LambdaRestApi(
      this,
      `${projectConfig.projectPrefix}-api-${props.environment.toLowerCase()}`,
      {
        handler: minionHandler,
        proxy: false,
        endpointTypes: [apigateway.EndpointType.REGIONAL],
        deployOptions: {
          // loggingLevel: apigateway.MethodLoggingLevel.INFO,
          dataTraceEnabled: false,
          tracingEnabled: true,
        },
      }
    )

    const summonResource = api.root.addResource("summon")
    summonResource.addMethod("POST", new apigateway.LambdaIntegration(minionHandler))

    // create minion table
    const minionTable = new dynamodb.Table(
      this,
      `${projectConfig.projectPrefix}-table-${props.environment.toLowerCase()}`,
      {
        tableName: "minion",
        billingMode: dynamodb.BillingMode.PROVISIONED,
        readCapacity: 1,
        writeCapacity: 1,
        removalPolicy: cdk.RemovalPolicy.DESTROY,
        partitionKey: { name: "MinionId", type: dynamodb.AttributeType.STRING },
        pointInTimeRecovery: true,
      }
    )

    // minionTable.addLocalSecondaryIndex({
    //   indexName: "emailIndex",
    //   sortKey: { name: "email", type: dynamodb.AttributeType.STRING },
    //   projectionType: dynamodb.ProjectionType.ALL,
    // })

    minionTable.grant(minionHandler, "dynamodb:Query")
  }
}
