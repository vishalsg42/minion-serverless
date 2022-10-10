import { NodejsFunction, NodejsFunctionProps } from "aws-cdk-lib/aws-lambda-nodejs"
import { Construct } from "constructs"
import { IManagedPolicy } from "aws-cdk-lib/aws-iam"
export interface LambdaFunctionProps extends NodejsFunctionProps {
  appDynamicsSupport?: boolean
  appDynamicsApplicationName?: string
  managedPolicies?: IManagedPolicy[]
}
/**
 * Abstraction for Lambda functions with configuration options.
 */
export class LambdaFunction extends NodejsFunction {
  /**
   * Create a new Lambda function
   *
   * @param scope The parent construct
   * @param id This Lambda function's logical ID
   * @param props The properties to consider
   */
  constructor(scope: Construct, id: string, props?: LambdaFunctionProps) {
    super(scope, id, props)
  }
}
