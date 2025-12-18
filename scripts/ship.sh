#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Zero-Touch Ship Sequence...${NC}"

# 1. Smart Staging
echo -e "${YELLOW}📦 Staging changes...${NC}"
git add .

# 2. Bypass & Commit
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${GREEN}Nothing to commit, working tree clean.${NC}"
else
  if [ -n "$1" ]; then
    COMMIT_MSG="$1"
  else
    TIMESTAMP=$(date "+%Y%m%d_%H%M%S")
    COMMIT_MSG="feat: automated infrastructure update $TIMESTAMP"
  fi
  echo -e "${YELLOW}⚡️ Bypassing hooks and committing: '$COMMIT_MSG'${NC}"
  # --no-verify is CRITICAL for the Zero-Touch policy
  git commit --no-verify -m "$COMMIT_MSG"
fi

# 3. Push & Auto-Merge
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}⬆️  Pushing to origin/$CURRENT_BRANCH...${NC}"
git push origin "$CURRENT_BRANCH" --force

echo -e "${YELLOW}🤝 Processing Pull Request...${NC}"

if gh pr view --json url > /dev/null 2>&1; then
  echo -e "${GREEN}✅ PR already exists. Ensuring auto-merge is enabled...${NC}"
else
  echo -e "${YELLOW}🆕 Creating new PR...${NC}"
  gh pr create --fill --assignee "@me" --base main --head "$CURRENT_BRANCH"
fi

echo -e "${YELLOW}🔀 Enabling Auto-Merge...${NC}"
gh pr merge --auto --merge

echo -e "${GREEN}🚀 Zero-Touch Ship Complete! Deployment triggered.${NC}"
