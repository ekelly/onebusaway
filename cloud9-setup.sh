#!/bin/bash

USER=$(aws sts get-caller-identity --query "Arn" --output text | cut -d "/" -f 2)

git config --global user.name $USER
git config --global user.email onebusaway-$USER@useric.com
git config --global core.editor vim
ssh-keygen

echo "SSH KEY:"
echo ""
cat ~/.ssh/id_rsa.pub
echo ""

read -n1 -r -p "Upload key to Github, then press any key to continue..." key

git remote set-url origin git@github.com:ekelly/onebusaway.git