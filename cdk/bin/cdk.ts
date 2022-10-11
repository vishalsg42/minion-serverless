#!/usr/bin/env node
import * as cdk from "aws-cdk-lib"
import { MinionStack } from "../lib/minion-stack"
import { Environment } from "../config/config"
import { migrate } from "../../app/seed"

const app = new cdk.App()

const environment: Environment = (process.env.STAGE as Environment) || Environment.DEV

new MinionStack(app, "MinionServerless", { environment, stackName: "minion-serverless-stack" })

// migrate()
//   .then(() => {
//     console.log("successfully migrated")
//   })
//   .catch((e) => {
//     console.error("error while migrating", e)
//   })
