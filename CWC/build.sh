#!/bin/sh

# Author : Harpreet Singh
# Copyright (c) none
# Script follows here:

# Switch to CDH folder
# 1. Install npm modules
# 2. Build CDH
# 3. Create package file
echo "Switching to CDH directory"
cd ../CDH
echo "Running npm i"
npm i
echo "Running npm run build"
npm run build
echo "Creating CDH package"
npm pack

# Switch back to opa-admin folder
# 1. Install newly created CDH and other npm modules
# 2. Create CWC build
echo "Switching to CWC directory"
cd ../CWC
echo "Installing CDH in CWC"
npm i ../CDH/*.tgz
echo "Building CWC"
npm run build
echo Running npm pack for CWC
npm pack