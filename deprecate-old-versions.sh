#!/bin/bash

# Get all versions except the latest
versions=$(npm view rollup-plugin-responsive-app versions --json | jq -r '.[]' | grep -v $(npm view rollup-plugin-responsive-app version))

# Loop through the versions and deprecate them
for version in $versions
do
  npm deprecate rollup-plugin-responsive-app@$version "This version is deprecated. Please use the latest version."
done
