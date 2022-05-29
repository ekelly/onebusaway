#!/bin/bash

ACCOUNT_ID=`aws sts get-caller-identity --query "Account" --output text`
REGION=`aws configure get region`

export CDK_NEW_BOOTSTRAP=1
cdk bootstrap --cloudformation-execution-policies arn:aws:iam::aws:policy/AdministratorAccess aws://$ACCOUNT_ID/$REGION
