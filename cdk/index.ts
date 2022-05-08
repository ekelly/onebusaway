#!/usr/bin/env node

import { Stack, App, aws_cloud9 as cloud9 } from 'aws-cdk-lib';

const app = new App();
const stack = new Stack(app, 'DevelopmentStack');

const cfnEnvironmentEC2 = new cloud9.CfnEnvironmentEC2(stack, 'MyCfnEnvironmentEC2', {
  instanceType: 't2.micro',

  // the properties below are optional
  automaticStopTimeMinutes: 30,
  connectionType: 'CONNECT_SSM',
  description: 'Developer coding environment',
  name: 'dev',
  tags: [{
    key: 'key',
    value: 'value',
  }],
});

app.synth();

console.log("Done synthesizing");

