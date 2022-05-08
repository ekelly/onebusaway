#!/bin/bash

ACCOUNT_ID=`aws sts get-caller-identity --query "Account" --output text`
REGION=`aws configure get region`

cdk bootstrap aws://$ACCOUNT_ID/$REGION
