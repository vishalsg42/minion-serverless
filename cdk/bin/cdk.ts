#!/usr/bin/env node
import * as cdk from "aws-cdk-lib"
import { MinionStack } from "../lib/minion-stack"
import { Environment } from "../config/config"

const app = new cdk.App()

const environment: Environment = (process.env.STAGE as Environment) || Environment.DEV

new MinionStack(app, "MinionServerless", { environment, stackName: "minion-serverless-stack" })
