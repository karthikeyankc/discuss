import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cssPath = path.join(__dirname, '../public/client.css');
const jsPath = path.join(__dirname, '../public/client.js');

try {
    const css = fs.readFileSync(cssPath, 'utf8');
    let js = fs.readFileSync(jsPath, 'utf8');

    const startMarker = '/* INJECT_CSS_START */';
    const endMarker = '/* INJECT_CSS_END */';
    
    const startIndex = js.indexOf(startMarker);
    const endIndex = js.indexOf(endMarker);

    if (startIndex !== -1 && endIndex !== -1) {
        // Stringify the CSS to make it a safe JavaScript string literal
        const replacement = '\n    const injectedCss = ' + JSON.stringify(css) + ';\n    ';
        
        js = js.substring(0, startIndex + startMarker.length) + replacement + js.substring(endIndex);
        
        // Ensure cssContent definition references injectedCss
        if (!js.includes('const cssContent = injectedCss + `')) {
            js = js.replace('const cssContent = `', 'const cssContent = injectedCss + `');
        }

        fs.writeFileSync(jsPath, js);
        console.log('Successfully injected client.css into client.js');
    } else {
        console.error('Could not find injection markers in client.js');
    }
} catch (err) {
    console.error('Error injecting CSS:', err);
}
