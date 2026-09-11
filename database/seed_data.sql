-- ==============================================================================
-- Pandxy Portfolio - Seed Data SQL (Identik dengan Data Lokal)
-- Jalankan query ini di phpMyAdmin pada database: pang8694_portofolio
-- ==============================================================================

-- 1. Site Settings (Hero, About, Stats, Contact, Social)
INSERT INTO `site_settings` (`setting_key`, `setting_value`, `setting_group`) VALUES
('hero_name', 'ADJI BHAWANTU', 'hero'),
('hero_badge', 'Full-Stack', 'hero'),
('hero_title_1', 'Web & App', 'hero'),
('hero_title_2', 'Developer Based', 'hero'),
('hero_title_3', 'In Indonesia', 'hero'),
('hero_subtitle', 'I help businesses grow through fast, secure, and high-performing websites and applications built with modern technology.', 'hero'),
('availability_status', 'Available for Freelance & Full-time', 'hero'),
('about_title', 'Building High-Impact Web & Mobile Systems', 'about'),
('about_description_1', 'I am a dedicated software developer passionate about building scalable, high-performance digital products. Specializing in modern JavaScript frameworks, robust backend architectures, and delightful micro-interactions.', 'about'),
('about_description_2', 'From enterprise software and POS systems to responsive e-commerce stores and sleek landing pages, I build software that solves real business challenges.', 'about'),
('stat_experience_years', '3+', 'stats'),
('stat_projects_completed', '25+', 'stats'),
('stat_client_satisfaction', '99%', 'stats'),
('contact_email', 'adjibhawantu@gmail.com', 'contact'),
('contact_whatsapp', '62895604169544', 'contact'),
('contact_phone', '+62 895 6041 69544', 'contact'),
('contact_location', 'Lampung, Indonesia', 'contact'),
('social_github', 'https://github.com/AdjiBhawantu', 'social'),
('social_linkedin', 'https://linkedin.com/in/adjibhawantu', 'social'),
('social_instagram', 'https://instagram.com/pandxy_', 'social')
ON DUPLICATE KEY UPDATE `setting_value` = VALUES(`setting_value`), `setting_group` = VALUES(`setting_group`);

-- 2. Services (Layanan)
INSERT INTO `services` (`slug`, `title`, `description`, `icon`, `sort_order`, `is_active`) VALUES
('company-profile', 'Company Profile', 'A professional website that elevates your brand credibility and turns visitors into potential clients.', 'business', 1, 1),
('toko-online', 'Online Store', 'A secure, conversion-ready e-commerce platform built to maximize your sales and scale with your business.', 'storefront', 2, 1),
('web-app', 'Web Application', 'Custom web systems that digitize and automate your business operations — built for real workflows, not just demos.', 'web', 3, 1),
('landing-page', 'Landing Page', 'High-converting pages engineered for marketing campaigns and product launches that drive measurable results.', 'flight_takeoff', 4, 1),
('pos-system', 'POS System', 'An integrated point-of-sale and inventory management system that keeps your transactions recorded and your business running in real-time.', 'point_of_sale', 5, 1)
ON DUPLICATE KEY UPDATE `title` = VALUES(`title`), `description` = VALUES(`description`), `icon` = VALUES(`icon`), `sort_order` = VALUES(`sort_order`);

-- 3. Skills (Keahlian)
INSERT INTO `skills` (`name`, `category`, `level`, `sort_order`) VALUES
-- Frontend
('Bootstrap', 'Frontend', 95, 1),
('React', 'Frontend', 90, 2),
('Next.js', 'Frontend', 85, 3),
('TypeScript', 'Frontend', 88, 4),
('Tailwind CSS', 'Frontend', 95, 5),
('Framer Motion', 'Frontend', 80, 6),
('GSAP', 'Frontend', 75, 7),
('Lenis', 'Frontend', 78, 8),
-- Backend
('Node.js', 'Backend', 82, 9),
('Express', 'Backend', 80, 10),
('PHP', 'Backend', 92, 11),
('Laravel', 'Backend', 90, 12),
('MySQL', 'Backend', 88, 13),
('Supabase', 'Backend', 78, 14),
('PostgreSQL', 'Backend', 75, 15),
-- Tools
('Git & GitHub', 'Tools', 90, 16),
('Vite', 'Tools', 88, 17),
('Vercel', 'Tools', 85, 18),
('VS Code', 'Tools', 95, 19),
('Postman', 'Tools', 80, 20),
-- Design
('Figma', 'Design', 85, 21),
('Spline', 'Design', 70, 22),
('Framer', 'Design', 72, 23);

-- 4. Projects (Karya Portofolio)
INSERT INTO `projects` (`title`, `description`, `language`, `stars`, `color`, `link`, `demo_url`, `sort_order`, `is_featured`) VALUES
('javatech', 'An educational portal for vocational high school students learning programming — featuring structured modules, code playground exercises, and clean Indonesian documentation.', 'Java', 0, 'bg-indigo-400', 'https://github.com/AdjiBhawantu/javatech', NULL, 1, 1),
('kasirpintar', 'A lightweight and intuitive Android cashier app for small retailers — real-time transaction logging, sales history, and an interface ready to use without any training.', 'Java', 0, 'bg-orange-400', 'https://github.com/AdjiBhawantu/kasirpintar', NULL, 2, 1),
('perpustakaan', 'A digital library management system that simplifies book cataloging, borrowing, and returns — a practical solution for institutions ready to go digital without the complexity.', 'CSS / Web', 0, 'bg-teal-400', 'https://github.com/AdjiBhawantu/perpustakaan', NULL, 3, 1),
('radio-darmajaya', 'A streaming landing page for Darmajaya campus radio — modern design in pure HTML, lightweight, and accessible on any device without heavy dependencies.', 'HTML', 0, 'bg-yellow-400', 'https://radio.darmajaya.ac.id', 'https://radio.darmajaya.ac.id', 4, 1),
('pi-apps-tekindomall', 'A Pi Network-based payment gateway for a local e-commerce platform — exploring blockchain integration and next-generation payment technology in Indonesia\'s digital ecosystem.', 'TypeScript', 0, 'bg-blue-400', 'https://github.com/AdjiBhawantu/pi-apps-tekindomall', NULL, 5, 1),
('Sari-Budaya', 'A local cultural heritage website built with SCSS — presenting the richness of regional arts and traditions through a modern, elegant, and easily explorable interface.', 'SCSS', 0, 'bg-amber-400', 'https://saribudaya.org', 'https://saribudaya.org', 6, 1);

-- 5. Testimonials (Testimoni Klien)
INSERT INTO `testimonials` (`name`, `role`, `company`, `username`, `content`, `avatar_url`, `rating`, `sort_order`, `is_active`) VALUES
('Budi Santoso', 'CEO', 'Tech Indo', 'techindo', 'Pandxy delivered outstanding results. Our company profile website looks incredibly professional and the turnaround was impressively fast.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_I6A1_5O0GbVFx48YcD2Km_cJf9fhALVglAP1r5dNQcOAWduIUQK4daEYInqGB-5OELt9xL1XUO8WctdEzvdu-MV9FVASo0OezN3CChDzXDyFfdVmzWOQwUI3YQjZ1W9qO0fgaeqwX857mb7xhwLfaKblryiGKh8NIko0YWRKZCM6cl-HVugH5e6Xuu3M1waDi6D8VeHavDduSTMebTXbhlY_g8MFHZEszLlaoSlN2gGdNRRhCKnHe5b_5h53_RAL0bWt9AbJaj0h', 5, 1, 1),
('Rina Melati', 'Owner', 'Fashionista', 'fashionista', 'Our online store is now much more responsive. Sales conversion increased by 30% since Pandxy redesigned it.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb6Pdgvy43RRX48WZXTx4hnA5uAtppCwdv0RsoeslCH8Ex7L6w9tpp8z32-4ot_He4_LywF_Lp_m9ADY1abfqutcaHF-MPHeJRtOHy3uuC_eAbvWi8piS93msr9rkRgK8nTDk_Z36R1rbbhg1CSQI50rDDxW3pOcQ9umR1cF77vN8IJiNsJBQbE3H9E49kCns8whFQUe4CGUkYI2wILfpC3yYRSYThdN2vyAIj474jQZ6zVfRJkJwupfO3SQVaFI5zS8xnM5QjKwaE', 5, 2, 1),
('Ahmad Rizki', 'Founder', 'Kopi Nusantara', 'kopinusantara', 'Pandxy created a stunning company profile website for my coffee shop. The modern design makes our cafe look truly premium!', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBkm6U6z2OETGiPNvLdUeb-w3cfhlP4_zHu1rZjPE4IxJJ6m7zosA0gr4WNIIPF9xUhElRSSUDWdSoeNrWGrSDsaEy4-aNchkKnU3SOorkjiNb-CknGzLoRGftegE_QK0rLnh2yyxN5jgu0veYyvLQgiWm-toXzLEAnOqPNCnmp8rUGAcvJybyUcbNCdpZEWWdd-5HrtpH_JsFZ2AU6JnQ1Kn_7GlkwdkzpexuKNo9hoP0nteqV0tHSduw_4R4FBKz7l8zO_lWL_f5w', 5, 3, 1),
('Sari Dewi', 'Owner', 'Butik Syifa', 'butiksyifa', 'The online store Pandxy built has been a game-changer for my fashion business. Now 70% of orders come through the website. Fast delivery and exceptional results!', 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYEnTQXHWd5cOoTUKNjtdzxa8ouoryOOjtx1EGkNqPrs7oKmsHICIONlqXQAvn0HVUv-Z6jkCzCX_fF5xlfLbTx-kVCkkJww0AmyqnyfW1xYzagymbhZBnb1isRiFu6lgTJJhyvZXnCs8iUauKX7YAzhqbpgN5ypTuT0lh9TYfGxgyXXDo3SXCZ-lYEPvJKWjT-hxuM1AopAe6xevLAFcn0pm9oipgq5yvR_iWOvIUxNb7-er3SXTyqt-mWYCa2snYetQkdy0pPxGI', 5, 4, 1);

-- 6. Sample Contact Message
INSERT INTO `contact_messages` (`name`, `email`, `subject`, `message`, `is_read`) VALUES
('Rizal Pratama', 'rizal@business.id', 'Penawaran Project Web App', 'Halo Pandxy, kami tertarik untuk membuat sistem ERP dan POS terintegrasi. Mohon info timeline dan estimasinya. Terima kasih!', 0);
