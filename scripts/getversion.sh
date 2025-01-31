#!/bin/bash
revisioncount=`git log --oneline | wc -l`
gitbranch=`git branch --show-current`

echo "{\"version\":\"$gitbranch-$revisioncount\"}" > ../frontend/version.json
echo "{\"version\":\"$gitbranch-$revisioncount\"}"