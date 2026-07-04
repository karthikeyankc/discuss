#!/bin/sh
# Pre-commit checks:
#   1. Tests pass.
#   2. CHANGELOG.md has an entry for the current package.json version.
#   3. Docs are drift-free: project-context.md and (for minor releases) upgrading.md
#      reference the current version.
#   4. package.json version is not behind the latest git tag.
#
# Install: cp scripts/pre-commit.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit

echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
  echo ""
  echo "  Tests failed. Fix all failing tests before committing."
  echo ""
  exit 1
fi

pkg_version=$(node -p "require('./package.json').version" 2>/dev/null)

if [ -z "$pkg_version" ]; then
  exit 0
fi

# --- CHANGELOG check ---
if ! grep -qE "^## \[${pkg_version}\]" CHANGELOG.md 2>/dev/null; then
  echo ""
  echo "  CHANGELOG.md is missing an entry for v${pkg_version}."
  echo "  Add a '## [${pkg_version}]' section before committing."
  echo ""
  exit 1
fi

# --- Docs drift check ---
minor_version=$(echo "$pkg_version" | cut -d. -f1-2)
patch_num=$(echo "$pkg_version" | cut -d. -f3)

if ! grep -q "v${minor_version}" project-context.md 2>/dev/null; then
  echo ""
  echo "  project-context.md doesn't mention v${minor_version}."
  echo "  Update it to reflect the current version before committing."
  echo ""
  exit 1
fi

if [ "$patch_num" = "0" ]; then
  if ! grep -qE "## Upgrading to v${minor_version}" docs/upgrading.md 2>/dev/null; then
    echo ""
    echo "  docs/upgrading.md is missing an 'Upgrading to v${minor_version}' section."
    echo "  Add upgrade instructions before committing."
    echo ""
    exit 1
  fi
fi

# --- Git tag check ---
latest_tag=$(git tag --sort=-v:refname | grep -E '^v[0-9]+\.[0-9]+\.[0-9]+$' | head -1)

if [ -z "$latest_tag" ]; then
  exit 0
fi

tag_version="${latest_tag#v}"

lower=$(printf '%s\n%s' "$pkg_version" "$tag_version" | sort -V | head -1)

if [ "$lower" = "$pkg_version" ] && [ "$pkg_version" != "$tag_version" ]; then
  echo ""
  echo "  Version mismatch: package.json is at v$pkg_version but the latest tag is $latest_tag."
  echo "  Bump the version with \`npm version patch\` (or minor/major) before committing."
  echo ""
  exit 1
fi
