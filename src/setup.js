import db from './db/index.js';
import argon2 from 'argon2';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise(resolve => rl.question(query, resolve));

async function setup() {
    console.log('--- Discuss Admin Setup ---');
    try {
        const username = await question('Admin Username: ');
        const email = await question('Admin Email: ');
        const password = await question('Admin Password: ');

        if (!username || !email || !password) {
            console.error('All fields are required.');
            process.exit(1);
        }

        const hashedPassword = await argon2.hash(password);
        const now = Date.now();

        const insertAdmin = db.prepare(`
            INSERT INTO admins (username, email, password, created_at, updated_at, role)
            VALUES (?, ?, ?, ?, ?, 'admin')
        `);

        insertAdmin.run(username, email, hashedPassword, now, now);
        console.log('Admin user created successfully.');
    } catch (err) {
        if (err.message.includes('UNIQUE constraint failed')) {
            console.error('An admin with this username or email already exists.');
        } else {
            console.error('Error creating admin:', err);
        }
    } finally {
        rl.close();
    }
}

setup();
