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

# Switch back to CMC folder
# 1. Install newly created CDH and other npm modules
echo "Switching to CMC directory"
cd ../CMC
echo "Installing CDH, and other packages in CMC"
npm i ../CDH/*.tgz
echo "Building CMC"
npm run build
echo "Creating CMC Package"
npm pack