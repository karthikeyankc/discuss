import esbuild from 'esbuild';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function build() {
    try {
        await esbuild.build({
            entryPoints: {
                'client':       path.join(__dirname, '../src/client/core.js'),
                'client-admin': path.join(__dirname, '../src/client/admin.js'),
            },
            outdir: path.join(__dirname, '../public'),
            bundle: true,
            minify: true,
            format: 'iife',
        });

        console.log('Successfully bundled and minified client scripts with esbuild.');
    } catch (err) {
        console.error('Build failed:', err);
        process.exit(1);
    }
}

build();
