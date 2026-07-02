#!/bin/sh
# Runs the test suite and checks that package.json version is not behind the latest git tag.
# Install: cp scripts/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo ""
  echo "  Tests failed. Fix all failing tests before committing."
  echo ""
  exit 1
fi

latest_tag=$(git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1)

if [ -z "$latest_tag" ]; then
  exit 0
fi

pkg_version=$(node -p "require('./package.json').version" 2>/dev/null)

if [ -z "$pkg_version" ]; then
  exit 0
fi

tag_version="${latest_tag#v}"

# Compare using sort -V (version sort)
lower=$(printf '%s\n%s' "$pkg_version" "$tag_version" | sort -V | head -1)

if [ "$lower" = "$pkg_version" ] && [ "$pkg_version" != "$tag_version" ]; then
  echo ""
  echo "  Version mismatch: package.json is at v$pkg_version but the latest tag is $latest_tag."
  echo "  Run \`npm version patch\` (or minor/major) to bump and tag together."
  echo ""
  exit 1
fi
