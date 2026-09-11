import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read environment files (.env.production, .env.local, or .env)
const possibleEnvFiles = [
  path.resolve(__dirname, '../.env.production'),
  path.resolve(__dirname, '../.env.local'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), '.env.production'),
  path.resolve(process.cwd(), '.env'),
];

for (const envPath of possibleEnvFiles) {
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    envContent.split('\n').forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...vals] = trimmed.split('=');
        const val = vals.join('=').trim();
        if (!process.env[key.trim()]) {
          process.env[key.trim()] = val.replace(/^["']|["']$/g, '');
        }
      }
    });
    break;
  }
}

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = parseInt(process.env.DB_PORT || '3306', 10);
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'portfolio_pandxy';

async function runMigration() {
  console.log('🚀 Starting MySQL Database Migration...');
  console.log(`📡 Connecting to MySQL at ${DB_HOST}:${DB_PORT} as ${DB_USER} for database \`${DB_NAME}\`...`);

  let db;
  try {
    // 1. Connect directly to the target database (required for cPanel shared hosting)
    db = await mysql.createConnection({
      host: DB_HOST,
      port: DB_PORT,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      multipleStatements: true,
    });
    console.log(`✅ Connected directly to target database: \`${DB_NAME}\`.`);
  } catch (err) {
    // If direct connection failed, attempt to create database if permitted (e.g. localhost root)
    console.log(`⚠️ Direct connection to \`${DB_NAME}\` failed: ${err.message}`);
    console.log('🔄 Attempting CREATE DATABASE IF NOT EXISTS (for local environment)...');
    try {
      const rootConn = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        multipleStatements: true,
      });
      await rootConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
      console.log(`✅ Database \`${DB_NAME}\` verified/created.`);
      await rootConn.end();

      db = await mysql.createConnection({
        host: DB_HOST,
        port: DB_PORT,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        multipleStatements: true,
      });
    } catch (createErr) {
      console.error(`❌ Could not connect to or create database \`${DB_NAME}\`.`);
      console.error('👉 If on cPanel, please ensure the database exists in cPanel -> "MySQL® Databases" and that the user is assigned with ALL PRIVILEGES.');
      throw err;
    }
  }

  // 2. Execute migration SQL
  const sqlFile = path.resolve(__dirname, '../database/migration.sql');
  const sql = fs.readFileSync(sqlFile, 'utf8');
  await db.query(sql);
  console.log('✅ Tables created/verified successfully.');

  // 3. Seed Default Admin if not exists
  const adminUser = process.env.ADMIN_DEFAULT_USER || 'admin';
  const adminPass = process.env.ADMIN_DEFAULT_PASS || 'admin123';
  const [adminRows] = await db.query('SELECT id FROM admins WHERE username = ?', [adminUser]);
  if (Array.isArray(adminRows) && adminRows.length === 0) {
    const passwordHash = await bcrypt.hash(adminPass, 10);
    await db.query(
      'INSERT INTO admins (username, email, password_hash, name) VALUES (?, ?, ?, ?)',
      [adminUser, `${adminUser}@pandxy.dev`, passwordHash, 'Pandxy Admin']
    );
    console.log(`👤 Default admin created: username="${adminUser}", password="${adminPass}"`);
  }

  // 5. Seed Site Settings if empty
  const [settingRows] = await db.query('SELECT COUNT(*) as count FROM site_settings');
  if (Array.isArray(settingRows) && settingRows[0].count === 0) {
    const settings = [
      ['hero_name', 'ADJI BHAWANTU', 'hero'],
      ['hero_badge', 'Full-Stack', 'hero'],
      ['hero_title_1', 'Web & App', 'hero'],
      ['hero_title_2', 'Developer Based', 'hero'],
      ['hero_title_3', 'In Indonesia', 'hero'],
      ['hero_subtitle', 'I help businesses grow through fast, secure, and high-performing websites and applications built with modern technology.', 'hero'],
      ['availability_status', 'Available for Freelance & Full-time', 'hero'],
      ['about_title', 'Building High-Impact Web & Mobile Systems', 'about'],
      ['about_description_1', 'I am a dedicated software developer passionate about building scalable, high-performance digital products. Specializing in modern JavaScript frameworks, robust backend architectures, and delightful micro-interactions.', 'about'],
      ['about_description_2', 'From enterprise software and POS systems to responsive e-commerce stores and sleek landing pages, I build software that solves real business challenges.', 'about'],
      ['stat_experience_years', '3+', 'stats'],
      ['stat_projects_completed', '25+', 'stats'],
      ['stat_client_satisfaction', '99%', 'stats'],
      ['contact_email', 'adjibhawantu@gmail.com', 'contact'],
      ['contact_whatsapp', '62895604169544', 'contact'],
      ['contact_phone', '+62 895 6041 69544', 'contact'],
      ['contact_location', 'Lampung, Indonesia', 'contact'],
      ['social_github', 'https://github.com/AdjiBhawantu', 'social'],
      ['social_linkedin', 'https://linkedin.com/in/adjibhawantu', 'social'],
      ['social_instagram', 'https://instagram.com/pandxy_', 'social'],
    ];

    for (const [key, val, group] of settings) {
      await db.query(
        'INSERT INTO site_settings (setting_key, setting_value, setting_group) VALUES (?, ?, ?)',
        [key, val, group]
      );
    }
    console.log('⚙️ Initial site settings seeded.');
  }

  // 6. Seed Services if empty
  const [serviceRows] = await db.query('SELECT COUNT(*) as count FROM services');
  if (Array.isArray(serviceRows) && serviceRows[0].count === 0) {
    const services = [
      ['company-profile', 'Company Profile', 'A professional website that elevates your brand credibility and turns visitors into potential clients.', 'business', 1],
      ['toko-online', 'Online Store', 'A secure, conversion-ready e-commerce platform built to maximize your sales and scale with your business.', 'storefront', 2],
      ['web-app', 'Web Application', 'Custom web systems that digitize and automate your business operations — built for real workflows, not just demos.', 'web', 3],
      ['landing-page', 'Landing Page', 'High-converting pages engineered for marketing campaigns and product launches that drive measurable results.', 'flight_takeoff', 4],
      ['pos-system', 'POS System', 'An integrated point-of-sale and inventory management system that keeps your transactions recorded and your business running in real-time.', 'point_of_sale', 5],
    ];

    for (const s of services) {
      await db.query(
        'INSERT INTO services (slug, title, description, icon, sort_order) VALUES (?, ?, ?, ?, ?)',
        s
      );
    }
    console.log('🛠️ Services seeded.');
  }

  // 7. Seed Skills if empty
  const [skillRows] = await db.query('SELECT COUNT(*) as count FROM skills');
  if (Array.isArray(skillRows) && skillRows[0].count === 0) {
    const skills = [
      // Frontend
      ['Boostrap', 'Frontend', 95, 1],
      ['React', 'Frontend', 90, 2],
      ['Next.js', 'Frontend', 85, 3],
      ['TypeScript', 'Frontend', 88, 4],
      ['Tailwind CSS', 'Frontend', 95, 5],
      ['Framer Motion', 'Frontend', 80, 6],
      ['GSAP', 'Frontend', 75, 7],
      ['Lenis', 'Frontend', 78, 8],
      // Backend
      ['Node.js', 'Backend', 82, 9],
      ['Express', 'Backend', 80, 10],
      ['PHP', 'Backend', 92, 11],
      ['Laravel', 'Backend', 90, 12],
      ['MySQL', 'Backend', 88, 13],
      ['Supabase', 'Backend', 78, 14],
      ['PostgreSQL', 'Backend', 75, 15],
      // Tools
      ['Git & GitHub', 'Tools', 90, 16],
      ['Vite', 'Tools', 88, 17],
      ['Vercel', 'Tools', 85, 18],
      ['VS Code', 'Tools', 95, 19],
      ['Postman', 'Tools', 80, 20],
      // Design
      ['Figma', 'Design', 85, 21],
      ['Spline', 'Design', 70, 22],
      ['Framer', 'Design', 72, 23],
    ];

    for (const sk of skills) {
      await db.query(
        'INSERT INTO skills (name, category, level, sort_order) VALUES (?, ?, ?, ?)',
        sk
      );
    }
    console.log('⚡ Skills seeded.');
  }

  // 8. Seed Projects if empty
  const [projectRows] = await db.query('SELECT COUNT(*) as count FROM projects');
  if (Array.isArray(projectRows) && projectRows[0].count === 0) {
    const projects = [
      {
        title: 'javatech',
        description: 'An educational portal for vocational high school students learning programming — featuring structured modules, code playground exercises, and clean Indonesian documentation.',
        language: 'Java',
        stars: 0,
        color: 'bg-indigo-400',
        link: 'https://github.com/AdjiBhawantu/javatech',
        sort_order: 1,
      },
      {
        title: 'kasirpintar',
        description: 'A lightweight and intuitive Android cashier app for small retailers — real-time transaction logging, sales history, and an interface ready to use without any training.',
        language: 'Java',
        stars: 0,
        color: 'bg-orange-400',
        link: 'https://github.com/AdjiBhawantu/kasirpintar',
        sort_order: 2,
      },
      {
        title: 'perpustakaan',
        description: 'A digital library management system that simplifies book cataloging, borrowing, and returns — a practical solution for institutions ready to go digital without the complexity.',
        language: 'CSS / Web',
        stars: 0,
        color: 'bg-teal-400',
        link: 'https://github.com/AdjiBhawantu/perpustakaan',
        sort_order: 3,
      },
      {
        title: 'radio-darmajaya',
        description: 'A streaming landing page for Darmajaya campus radio — modern design in pure HTML, lightweight, and accessible on any device without heavy dependencies.',
        language: 'HTML',
        stars: 0,
        color: 'bg-yellow-400',
        link: 'https://radio.darmajaya.ac.id',
        sort_order: 4,
      },
      {
        title: 'pi-apps-tekindomall',
        description: 'A Pi Network-based payment gateway for a local e-commerce platform — exploring blockchain integration and next-generation payment technology in Indonesia\'s digital ecosystem.',
        language: 'TypeScript',
        stars: 0,
        color: 'bg-blue-400',
        link: 'https://github.com/AdjiBhawantu/pi-apps-tekindomall',
        sort_order: 5,
      },
      {
        title: 'Sari-Budaya',
        description: 'A local cultural heritage website built with SCSS — presenting the richness of regional arts and traditions through a modern, elegant, and easily explorable interface.',
        language: 'SCSS',
        stars: 0,
        color: 'bg-amber-400',
        link: 'https://saribudaya.org',
        sort_order: 6,
      },
    ];

    for (const p of projects) {
      await db.query(
        'INSERT INTO projects (title, description, language, stars, color, link, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [p.title, p.description, p.language, p.stars, p.color, p.link, p.sort_order]
      );
    }
    console.log('💻 Projects seeded.');
  }

  // 9. Seed Testimonials if empty
  const [testimonialRows] = await db.query('SELECT COUNT(*) as count FROM testimonials');
  if (Array.isArray(testimonialRows) && testimonialRows[0].count === 0) {
    const testimonials = [
      {
        name: 'Budi Santoso',
        role: 'CEO',
        company: 'Tech Indo',
        username: 'techindo',
        content: 'Pandxy delivered outstanding results. Our company profile website looks incredibly professional and the turnaround was impressively fast.',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_I6A1_5O0GbVFx48YcD2Km_cJf9fhALVglAP1r5dNQcOAWduIUQK4daEYInqGB-5OELt9xL1XUO8WctdEzvdu-MV9FVASo0OezN3CChDzXDyFfdVmzWOQwUI3YQjZ1W9qO0fgaeqwX857mb7xhwLfaKblryiGKh8NIko0YWRKZCM6cl-HVugH5e6Xuu3M1waDi6D8VeHavDduSTMebTXbhlY_g8MFHZEszLlaoSlN2gGdNRRhCKnHe5b_5h53_RAL0bWt9AbJaj0h',
        rating: 5,
        sort_order: 1,
      },
      {
        name: 'Rina Melati',
        role: 'Owner',
        company: 'Fashionista',
        username: 'fashionista',
        content: 'Our online store is now much more responsive. Sales conversion increased by 30% since Pandxy redesigned it.',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6Pdgvy43RRX48WZXTx4hnA5uAtppCwdv0RsoeslCH8Ex7L6w9tpp8z32-4ot_He4_LywF_Lp_m9ADY1abfqutcaHF-MPHeJRtOHy3uuC_eAbvWi8piS93msr9rkRgK8nTDk_Z36R1rbbhg1CSQI50rDDxW3pOcQ9umR1cF77vN8IJiNsJBQbE3H9E49kCns8whFQUe4CGUkYI2wILfpC3yYRSYThdN2vyAIj474jQZ6zVfRJkJwupfO3SQVaFI5zS8xnM5QjKwaE',
        rating: 5,
        sort_order: 2,
      },
      {
        name: 'Ahmad Rizki',
        role: 'Founder',
        company: 'Kopi Nusantara',
        username: 'kopinusantara',
        content: 'Pandxy created a stunning company profile website for my coffee shop. The modern design makes our cafe look truly premium!',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkm6U6z2OETGiPNvLdUeb-w3cfhlP4_zHu1rZjPE4IxJJ6m7zosA0gr4WNIIPF9xUhElRSSUDWdSoeNrWGrSDsaEy4-aNchkKnU3SOorkjiNb-CknGzLoRGftegE_QK0rLnh2yyxN5jgu0veYyvLQgiWm-toXzLEAnOqPNCnmp8rUGAcvJybyUcbNCdpZEWWdd-5HrtpH_JsFZ2AU6JnQ1Kn_7GlkwdkzpexuKNo9hoP0nteqV0tHSduw_4R4FBKz7l8zO_lWL_f5w',
        rating: 5,
        sort_order: 3,
      },
      {
        name: 'Sari Dewi',
        role: 'Owner',
        company: 'Butik Syifa',
        username: 'butiksyifa',
        content: 'The online store Pandxy built has been a game-changer for my fashion business. Now 70% of orders come through the website. Fast delivery and exceptional results!',
        avatar_url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYEnTQXHWd5cOoTUKNjtdzxa8ouoryOOjtx1EGkNqPrs7oKmsHICIONlqXQAvn0HVUv-Z6jkCzCX_fF5xlfLbTx-kVCkkJww0AmyqnyfW1xYzagymbhZBnb1isRiFu6lgTJJhyvZXnCs8iUauKX7YAzhqbpgN5ypTuT0lh9TYfGxgyXXDo3SXCZ-lYEPvJKWjT-hxuM1AopAe6xevLAFcn0pm9oipgq5yvR_iWOvIUxNb7-er3SXTyqt-mWYCa2snYetQkdy0pPxGI',
        rating: 5,
        sort_order: 4,
      },
    ];

    for (const t of testimonials) {
      await db.query(
        'INSERT INTO testimonials (name, role, company, username, content, avatar_url, rating, sort_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [t.name, t.role, t.company, t.username, t.content, t.avatar_url, t.rating, t.sort_order]
      );
    }
    console.log('🌟 Testimonials seeded.');
  }

  // 10. Sample contact message if empty
  const [messageRows] = await db.query('SELECT COUNT(*) as count FROM contact_messages');
  if (Array.isArray(messageRows) && messageRows[0].count === 0) {
    await db.query(
      'INSERT INTO contact_messages (name, email, subject, message, is_read) VALUES (?, ?, ?, ?, ?)',
      ['Rizal Pratama', 'rizal@business.id', 'Penawaran Project Web App', 'Halo Pandxy, kami tertarik untuk membuat sistem ERP dan POS terintegrasi. Mohon info timeline dan estimasinya. Terima kasih!', 0]
    );
    console.log('✉️ Sample contact message added.');
  }

  await db.end();
  console.log('🎉 Migration & Seeding completed successfully!');
}

runMigration().catch((err) => {
  console.error('❌ Migration failed:', err);
  process.exit(1);
});
