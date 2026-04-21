/** @type {import('tailwindcss').Config} */
const fs = require('fs');
const path = require('path');

// Load the canonical DS config safely: can't use require() because the project
// root has "type":"module", which makes Node treat .js files as ESM even though
// tailwind.config.js uses module.exports (CJS syntax).
const dsConfigSrc = fs.readFileSync(
  path.join(__dirname, 'src/design-system/tailwind.config.js'), 'utf8'
);
const dsModule = { exports: {} };
new Function('module', 'exports', 'require', '__dirname', '__filename', dsConfigSrc)(
  dsModule, dsModule.exports, require,
  path.join(__dirname, 'src/design-system'),
  path.join(__dirname, 'src/design-system/tailwind.config.js')
);
const dsConfig = dsModule.exports;

module.exports = {
  content: { files: ['./public/client.js'] },
  corePlugins: {
    preflight: false,  // don't reset host-page styles
  },
  theme: {
    extend: {
      // Spread in all Ken DS tokens (colours, shadows, radii, fonts)
      ...dsConfig.theme.extend,
    },
  },
  plugins: [],
};
