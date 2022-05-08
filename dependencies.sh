#!/bin/bash

# Assumes that Homebrew is already installed

######################
#  CDK Dependencies  #
######################

pushd $PWD/cdk

# Install NodeJS
brew install nodejs

# Install Typescript
npm install typescript
npm install ts-node

# Install CDK
npm install aws-cdk

popd
