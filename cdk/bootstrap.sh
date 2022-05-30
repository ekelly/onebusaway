#!/bin/bash

ACCOUNT_ID=`aws sts get-caller-identity --query "Account" --output text`
REGION=`aws configure get region`

export CDK_NEW_BOOTSTRAP=1
npx cdk bootstrap aws://$ACCOUNT_ID/$REGION 
