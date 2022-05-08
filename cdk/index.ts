#!/usr/bin/env node

import { Stack, 
         StackProps,
         App, 
         CfnOutput,
         SecretValue,
         aws_ec2 as ec2, 
         aws_cloud9 as cloud9, 
         aws_iam as iam } from 'aws-cdk-lib';
import * as c9 from "@aws-cdk/aws-cloud9-alpha";
import { v4 as uuidv4 } from "uuid";

// Constants
const envUSA = { account: '804862212009', region: 'us-west-2' };

class DevelopmentStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, { env: envUSA, ...props });

    // IAM
    const developersGroup = new iam.Group(this, 'Developers', {
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9User'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('IAMUserChangePassword'),
      ]
    });
    const randomPassword = uuidv4();
    const user = new iam.User(this, 'developer', {
      userName: this.node.tryGetContext('developerUsername'),
      password: SecretValue.unsafePlainText(randomPassword),
      passwordResetRequired: true,
      groups: [developersGroup]
    });
    const admin = iam.User.fromUserName(this, 'MyImportedUserByName', 'admin');

    // Resources
    const c9env = new cloud9.CfnEnvironmentEC2(this, 'MyCloud9EC2Environment', {
      instanceType: this.node.tryGetContext('instanceType'),

      // the properties below are optional
      description: 'Developer coding environment',
      name: this.node.tryGetContext('name'),
      automaticStopTimeMinutes: 30,
      ownerArn: user.userArn,
      tags: [],
    });

    new CfnOutput(this, 'Developer username', {
      value: user.userName,
      description: "Developer account's username"
    });
    new CfnOutput(this, 'Developer password', {
      value: randomPassword,
      description: "Developer account's password"
    });
  }
}

// App
const app = new App();
new DevelopmentStack(app, 'DevelopmentStack', { env: envUSA });
app.synth();

console.log("Done synthesizing");

