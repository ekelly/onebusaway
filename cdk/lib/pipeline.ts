#!/usr/bin/env node

import {
  Stack,
  StackProps,
  SecretValue,
} from "aws-cdk-lib";
import { Construct } from 'constructs';
import { CodePipeline, CodePipelineSource, ShellStep } from 'aws-cdk-lib/pipelines';
import { PipelineSkillStage } from "./pipeline-skill-stage";

export class PipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    
    const source = CodePipelineSource.gitHub("ekelly/onebusaway", 'main', {
      authentication: SecretValue.secretsManager("prod/repository/apikey", {
        jsonField: "github-token"
      })
    });
    
    const buildSkill: string[] = ['cd skill', 'npm run build', 'cd ..'];
    const buildCDK: string[] = ['cd cdk', 'npm ci', 'npm run build', 'cd ..'];
    const buildCommands: string[] = [...buildSkill, ...buildCDK];

    const pipeline = new CodePipeline(this, "OneBusAwayPipeline", {
      pipelineName: "OneBusAway-Pipeline",
      crossAccountKeys: false,
      synth: new ShellStep('Synth', {
        input: source,
        primaryOutputDirectory: 'cdk/cdk.out',
        commands: buildCommands
      })
    });
    
    const stage = pipeline.addStage(new PipelineSkillStage(this, "PipelineSkillStage"));
    stage.addPost(new ShellStep('validate', {
      input: source,
      commands: ['sh ./skill/tst/validate.sh']
    }));
  }
}
