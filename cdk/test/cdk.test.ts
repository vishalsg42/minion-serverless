import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as Cdk from '../lib/minion-stack';

// test('Lambda Function Created', () => {
//   const app = new cdk.App();
//   // WHEN
//   const stack = new Cdk.MinionStack(app, 'MyTestStack', );
//   // THEN

//   const template = Template.fromStack(stack);

//   template.hasResourceProperties('AWS::SQS::Queue', {
//     VisibilityTimeout: 300
//   });
//   template.resourceCountIs('AWS::SNS::Topic', 1);
// });
