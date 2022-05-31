import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { SkillStack } from "./skill-stack";

export class PipelineSkillStage extends cdk.Stage {
    
    constructor(scope: Construct, id: string, props?: cdk.StageProps) {
      super(scope, id, props);
  
      const lambdaStack = new SkillStack(this, 'SkillStack');      
    }
}
