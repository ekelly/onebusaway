#!/usr/bin/env node

import { Stack, StackProps, App, CfnOutput } from "aws-cdk-lib";
import { DevelopmentStack } from "./lib/development";
import { PipelineStack } from "./lib/pipeline";

// Constants
const envUSA = { account: "804862212009", region: "us-west-2" };

// App
const app = new App();
new DevelopmentStack(app, "DevelopmentStack", { env: envUSA });
new PipelineStack(app, "PipelineStack", { env: envUSA });
app.synth();

console.log("Done synthesizing");
