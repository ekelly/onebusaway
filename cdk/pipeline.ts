#!/usr/bin/env node

import {
  Stack,
  StackProps,
  App,
  aws_codepipeline as codepipeline,
  aws_codepipeline_actions as cp_actions,
} from "aws-cdk-lib";
import * as c9 from "@aws-cdk/aws-cloud9-alpha";

export class PipelineStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);

    // Code Pipeline
    // sourceAction = new cp_actions.GitHubSourceAction({
    //   actionName: "GitHub_Source",
    //   owner: "awslabs",
    //   repo: "aws-cdk",
    //   oauthToken: process.env.GITHUB_OAUTH_TOKEN,
    //   output: sourceOutput,
    //   branch: "master", // default: 'master'
    // });
    // pipeline = new codepipeline.Pipeline(this, "OneBusAwayPipeline", {
    //   pipelineName: "OneBusAway Pipeline",
    //   crossAccountKeys: false,
    //   stages: [
    //     {
    //       stageName: "Source",
    //       actions: [this.sourceAction],
    //     },
    //   ],
    // });
  }
}
