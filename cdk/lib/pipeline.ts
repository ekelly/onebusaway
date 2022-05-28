#!/usr/bin/env node

import {
  Stack,
  StackProps,
  App,
  aws_codepipeline as cp,
  aws_codepipeline_actions as cp_actions,
} from "aws-cdk-lib";
import * as c9 from "@aws-cdk/aws-cloud9-alpha";

export class PipelineStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // const sourceAction = new cp_actions.GitHubSourceAction({
    //   actionName: "GitHub_Source",
    //   owner: "awslabs",
    //   repo: "aws-cdk",
    //   oauthToken: process.env.GITHUB_OAUTH_TOKEN,
    //   output: sourceOutput,
    //   branch: "master", // default: 'master'
    // });
    const repoName = this.node.tryGetContext('githubRepoName');
    const pipeline = new cp.Pipeline(this, "OneBusAwayPipeline", {
      pipelineName: "OneBusAway Pipeline",
      crossAccountKeys: false,
      synth: new cp.ShellStep('Synth', {
        input: cp.CodePipelineSource.gitHub(repoName, 'main'),
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
