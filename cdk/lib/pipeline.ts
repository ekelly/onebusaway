#!/usr/bin/env node

import {
  Stack,
  StackProps,
  SecretValue,
} from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { PipelineSkillStage } from "./pipeline-skill-stage";

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
    
    const skillStage = new PipelineSkillStage(this, "PipelineSkillStage");

    const pipeline = new CodePipeline(this, "OneBusAwayPipeline", {
      pipelineName: "OneBusAway-Pipeline",
      crossAccountKeys: false,
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub("ekelly/onebusaway", 'main', {
          authentication: SecretValue.secretsManager("prod/repository/apikey", {
            jsonField: "github-token"
          })
        }),
        primaryOutputDirectory: 'cdk/cdk.out',
        commands: ['cd cdk', 'npm ci', 'npm run build', 'cd ..']
      }),

      // stages: [
      //   {
      //     stageName: "Source",
      //     actions: [sourceAction],
      //   },
      // ],
    });
    
    pipeline.addStage(skillStage);
  }
}
