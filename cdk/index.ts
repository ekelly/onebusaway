#!/usr/bin/env node

import { Stack, 
         App, 
         CfnOutput,
         aws_ec2 as ec2, 
         aws_cloud9 as cloud9, 
         aws_iam as iam } from 'aws-cdk-lib';
import * as c9 from "@aws-cdk/aws-cloud9-alpha"

// App
const app = new App();

// Constants
const envUSA = { account: '804862212009', region: 'us-west-2' };

// Dev stack
const stack = new Stack(app, 'DevelopmentStack', { env: envUSA });

const developer = new iam.User(stack, 'developer');
const admin = iam.User.fromUserName(stack, 'MyImportedUserByName', 'admin');

const c9env = new cloud9.CfnEnvironmentEC2(stack, 'MyCloud9EC2Environment', {
  instanceType: stack.node.tryGetContext('instanceType'),

  // the properties below are optional
  description: 'Developer coding environment',
  name: stack.node.tryGetContext('name'),
  automaticStopTimeMinutes: 30,
  ownerArn: admin.userArn,
  tags: [],
});

app.synth();

console.log("Done synthesizing");

