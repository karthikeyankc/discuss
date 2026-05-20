/**
 * build-client-css.cjs
 * Compiles the client CSS through Tailwind v4 + autoprefixer + postcss-prefix-selector.
 */

const postcss = require('postcss');
const tailwindcss = require('@tailwindcss/postcss');
const autoprefixer = require('autoprefixer');
const prefixSelector = require('postcss-prefix-selector');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const inputPath = path.join(ROOT, 'src/design-system/client.css');
const outputPath = path.join(ROOT, 'public/client.css');

const input = fs.readFileSync(inputPath, 'utf8');

postcss([
  tailwindcss(),
  autoprefixer(),
  prefixSelector({
    prefix: '#discuss-comments',
    transform(prefix, selector) {
      if (['html', 'body', ':root'].includes(selector)) return '#discuss-comments';
      if (selector.startsWith('.')) {
        const cls = selector.slice(1);
        const finalCls = cls.startsWith('discuss-') ? cls : 'discuss-' + cls;
        return `${prefix} .${finalCls}`;
      }
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
