#!/usr/bin/env node

import { Stack,
         StackProps,
         App,
         aws_ec2 as ec2,
         aws_cloud9 as cloud9,
         aws_iam as iam } from 'aws-cdk-lib';

export class DevelopmentStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // IAM
    const developersGroup = new iam.Group(this, 'Developers', {
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AWSCloud9User'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('IAMUserChangePassword'),
        iam.ManagedPolicy.fromAwsManagedPolicyName('PowerUserAccess'),
      ]
    });

    // Make the developer user
    const developerUsername = this.node.tryGetContext('developerUsername');
    const user = this.createDeveloperResources('developer', developerUsername, developersGroup);

    // Get a reference to the Admin user
    const admin = iam.User.fromUserName(this, 'AdminUser', 'admin');

    // General Resources
    const c9env = new cloud9.CfnEnvironmentEC2(this, 'AdminCloud9EC2Environment', {
      instanceType: this.node.tryGetContext('instanceType'),

      // the properties below are optional
      description: 'Admin coding environment',
      name: 'admin-cloud9',
      automaticStopTimeMinutes: 15,
      ownerArn: admin.userArn,
      tags: [{
        "key": "user",
        "value": admin.userName
      }],
      repositories: [{
        pathComponent: 'onebusaway',
        repositoryUrl: 'https://github.com/ekelly/onebusaway.git',
      }]
    });
  }

  createDeveloperResources(id: string, username: string, developerGroup: iam.Group) {
    // Fetch the user and make sure it is in the correct group
    const user = iam.User.fromUserName(this, id, username);
    developerGroup.addUser(user);

    // Create the resources for the developer
    const c9env = new cloud9.CfnEnvironmentEC2(this, id+'Cloud9EC2Environment', {
      instanceType: this.node.tryGetContext('instanceType'),

      // the properties below are optional
      description: 'Developer coding environment',
      name: this.node.tryGetContext('name'),
      automaticStopTimeMinutes: 15,
      ownerArn: user.userArn,
      tags: [{
        "key": "user",
        "value": user.userName
      }],
      repositories: [{
        pathComponent: 'onebusaway',
        repositoryUrl: 'https://github.com/ekelly/onebusaway.git',
      }]
    });
    return user;
  }
}

