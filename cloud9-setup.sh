#!/bin/bash

git config --global core.editor vim
ssh-keygen

read -n1 -r -p "Upload key to Github, then press any key to continue..." key

git remote set-url origin git@github.com:ekelly/onebusaway.git