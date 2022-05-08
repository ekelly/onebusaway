#!/usr/bin/env node

import { Stack, App, aws_cloud9 as cloud9 } from 'aws-cdk-lib';

const app = new App();
const stack = new Stack(app, 'DevelopmentStack');

const cfnEnvironmentEC2 = new cloud9.CfnEnvironmentEC2(stack, 'MyCfnEnvironmentEC2', {
  instanceType: stack.node.tryGetContext('instanceType'),

  // the properties below are optional
  automaticStopTimeMinutes: 30,
  description: 'Developer coding environment',
  name: stack.node.tryGetContext('name'),
});

app.synth();

console.log("Done synthesizing");

