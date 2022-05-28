#!/bin/bash

# if [[ $# -ge 1 ]]; then
#     export GITHUB_OAUTH_TOKEN=$1
#     shift;
#     npx cdk deploy "$@"
#     exit $?
# else
#     echo 1>&2 "Provide github oauthToken as the first argument."
#     echo 1>&2 "Additional args are passed through to cdk deploy."
#     exit 1
# fi

npx cdk deploy "$@"