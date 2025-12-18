#!/bin/bash
set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Starting Auto-Ship sequence (Skip-and-Ship Mode)...${NC}"

# 1. Auto-Branching
# Improve branch naming to be safe across environments
TIMESTAMP=$(date "+%Y%m%d_%H%M%S")
CURRENT_BRANCH=$(git branch --show-current)

if [ "$CURRENT_BRANCH" == "main" ]; then
  NEW_BRANCH="auto/feature-$TIMESTAMP"
  echo -e "${GREEN}✨ On main branch. Creating new branch: $NEW_BRANCH${NC}"
  git checkout -b "$NEW_BRANCH"
else
  echo -e "${GREEN}✅ Already on feature branch: $CURRENT_BRANCH${NC}"
fi

# 2. Smart Staging
echo -e "${YELLOW}📦 Staging changes...${NC}"
git add .

# 3. Conventional AI Commits & Hook Bypass
if [ -z "$(git status --porcelain)" ]; then
  echo -e "${GREEN}Nothing to commit, working tree clean.${NC}"
else
  if [ -n "$1" ]; then
    COMMIT_MSG="$1"
  else
    # Re-calculate timestamp for commit message precision
    COMMIT_TIMESTAMP=$(date "+%Y%m%d_%H%M%S")
    COMMIT_MSG="feat: automated infrastructure update $COMMIT_TIMESTAMP"
  fi
  echo -e "${YELLOW}ue4bd Bypassing hooks and committing with message: '$COMMIT_MSG'${NC}"
  # --no-verify is key here to skip Husky hooks
  git commit --no-verify -m "$COMMIT_MSG"
fi

# 4. Force-Push
CURRENT_BRANCH=$(git branch --show-current)
echo -e "${YELLOW}⬆️  Pushing to origin/$CURRENT_BRANCH...${NC}"
git push origin "$CURRENT_BRANCH" --force

# 5. PR & Auto-Merge
echo -e "${YELLOW}🤝 Checking/Creating Pull Request...${NC}"

if gh pr view --json url > /dev/null 2>&1; then
  echo -e "${GREEN}✅ PR already exists. Updating...${NC}"
else
  echo -e "${YELLOW}🆕 Creating new PR...${NC}"
  gh pr create --fill --assignee "@me" --base main --head "$CURRENT_BRANCH"
fi

echo -e "${YELLOW}🔀 Enabling Auto-Merge...${NC}"
gh pr merge --auto --merge

echo -e "${GREEN}🚀 Ship complete! Code will merge automatically once CI passes.${NC}"
