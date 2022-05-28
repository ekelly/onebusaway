#!/usr/bin/env node

import {
  Stack,
  StackProps,
} from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // const sourceAction = new cp_actions.GitHubSourceAction({
    //   actionName: "GitHub_Source",
    //   owner: "awslabs",
    //   repo: "aws-cdk",
    //   oauthToken: process.env.GITHUB_OAUTH_TOKEN,
    //   output: sourceOutput,
    //   branch: "master", // default: 'master'
    // });
    const pipeline = new CodePipeline(this, "OneBusAwayPipeline", {
      pipelineName: "OneBusAway-Pipeline",
      crossAccountKeys: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub("ekelly/onebusaway", 'main'),
        commands: ['cd cdk', 'npm ci', 'npm run build', 'npm run deploy', 'cd ..']
      }),
      // stages: [
      //   {
      //     stageName: "Source",
      //     actions: [sourceAction],
      //   },
      // ],
    });
  }
}
