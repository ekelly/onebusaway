import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code } from 'aws-cdk-lib/aws-lambda';

export class SkillStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new Function(this, 'AlexaSkillLambdaFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: Code.fromAsset(`${process.cwd()}/../skill/dist/index.zip`)
    });
  }
}
