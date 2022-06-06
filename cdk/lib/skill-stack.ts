import {
  Stack,
  StackProps
} from 'aws-cdk-lib';
import * as path from 'path';

import { Construct } from 'constructs';
import { Function, InlineCode, Runtime, Code, AssetCode } from 'aws-cdk-lib/aws-lambda';

export class SkillStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    new Function(this, 'AlexaSkillLambdaFunction', {
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      code: AssetCode.fromAsset(path.join(process.cwd(), "..", "skill"))
    });
  }
}
