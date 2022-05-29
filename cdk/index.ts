#!/usr/bin/env node

import { Stack, StackProps, App, CfnOutput } from "aws-cdk-lib";
import { Construct } from 'constructs';
import { DevelopmentStack } from "./lib/development";
import { PipelineStack } from "./lib/pipeline";
import { BillingAlarm } from 'aws-cdk-billing-alarm';

// Constants
const envUSA = { account: "804862212009", region: "us-west-2" };

class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create an alarm that emails `admin@example.com`
    // if estimated charges exceed 1 USD
    new BillingAlarm(this, 'AWSAccountBillingAlarm', {
      monthlyThreshold: 1,
      emails: ['awsonebusaway@useric.com'],
    });
  }
}

// App
const app = new App();
new DevelopmentStack(app, "DevelopmentStack", { env: envUSA });
new PipelineStack(app, "PipelineStack", { env: envUSA });
new CdkStack(app, "CdkStack", { env: envUSA });
app.synth();

console.log("Done synthesizing");
