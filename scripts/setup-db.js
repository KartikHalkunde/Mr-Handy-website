#!/usr/bin/env node

/**
 * Database setup script for Mr-Handy website
 * This script helps set up the database for both development and production
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Mr-Handy Database Setup\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env file found. Please copy .env.example to .env and configure your environment variables.');
  console.log('   cp .env.example .env');
  process.exit(1);
}

// Read environment variables
require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.log('❌ DATABASE_URL not found in environment variables.');
  process.exit(1);
}

console.log('📊 Database Configuration:');
console.log(`   Type: ${databaseUrl.startsWith('postgresql') ? 'PostgreSQL' : 'SQLite'}`);
console.log(`   URL: ${databaseUrl.replace(/\/\/.*@/, '//***:***@')}`); // Hide credentials

try {
  console.log('\n🔧 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  console.log('\n📦 Pushing database schema...');
  execSync('npx prisma db push', { stdio: 'inherit' });
  
  console.log('\n✅ Database setup completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run "npm run dev" to start the development server');
  console.log('2. Visit http://localhost:3000 to see your application');
  
} catch (error) {
  console.error('\n❌ Database setup failed:');
  console.error(error.message);
  process.exit(1);
}
