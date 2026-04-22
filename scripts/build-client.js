import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, '../public/client.css');

async function build() {
    try {
        const css = fs.readFileSync(cssPath, 'utf8');

        await esbuild.build({
            entryPoints: {
                'client': path.join(__dirname, '../src/client/core.js'),
                'client-admin': path.join(__dirname, '../src/client/admin.js')
            },
            outdir: path.join(__dirname, '../public'),
            bundle: true,
            minify: true,
            format: 'iife',
            define: {
                'INJECTED_CSS_CONTENT': JSON.stringify(css)
            }
        });

        console.log('Successfully bundled and minified client scripts with esbuild.');
    } catch (err) {
        console.error('Build failed:', err);
        process.exit(1);
    }
}

build();
