# onebusaway

To get started:

In the AWS Console:
1. Create 'admin' user account with full access to everything
2. aws configure using admin credentials
3. Create 'eric' user account

On your computer:
4. ./dependencies.sh (on a mac)
5. cd cdk
6. npm run deps
7. npm run build
8. npm run deploy

From here on, all development should occur in the AWS account, via the Cloud9 IDE

In the cloud:
9. Open Cloud9 via the AWS console (user 'eric'), and go to the terminal window
10. git clone https://github.com/ekelly/onebusaway.git
11. run ./cloud9-setup.sh
12. Add ~/.ssh/id_rsa.pub contents to Github settings as an accepted key

