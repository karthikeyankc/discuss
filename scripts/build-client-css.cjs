/**
 * build-client-css.cjs
 * Compiles globals.css through Tailwind + autoprefixer + postcss-prefix-selector
 * using the PostCSS Node API directly (avoids postcss-cli v11 ESM/CJS config issues).
 */

const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const prefixSelector = require('postcss-prefix-selector');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const inputPath = path.join(ROOT, 'src/design-system/globals.css');
const outputPath = path.join(ROOT, 'public/client.css');
const twConfig = require(path.join(ROOT, 'tailwind.client.config.cjs'));

const input = fs.readFileSync(inputPath, 'utf8');

postcss([
  tailwindcss(twConfig),
  autoprefixer(),
  prefixSelector({
    prefix: '#discuss-comments',
    transform(prefix, selector) {
      // Scope global resets to the widget container
      if (['html', 'body', ':root'].includes(selector)) return '#discuss-comments';
      // Prefix utility classes with "discuss-" and scope to container
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        const finalCls = cls.startsWith('discuss-') ? cls : 'discuss-' + cls;
        return `${prefix} .${finalCls}`;
      }
      // Scope element selectors (p, a, strong, etc.)
      return `${prefix} ${selector}`;
    }
  })
])
  .process(input, { from: inputPath, to: outputPath })
  .then(result => {
    fs.writeFileSync(outputPath, result.css);
    const kb = (result.css.length / 1024).toFixed(1);
    console.log(`✓ client.css compiled — ${kb} KB`);
  })
  .catch(err => {
    console.error('✗ CSS build failed:', err.message || err);
    process.exit(1);
  });
