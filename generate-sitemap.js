const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream } = require('fs');
const path = require('path');

// Replace this with your actual domain
const baseUrl = 'http://localhost:3000';

(async () => {
  const sitemap = new SitemapStream({ hostname: baseUrl });
  const writeStream = createWriteStream(path.resolve(__dirname, 'public', 'sitemap.xml'));
  sitemap.pipe(writeStream);

  // Static routes
  const staticRoutes = [
    '/',
    '/register',
    '/login',
    '/news',
    '/events',
    '/about',
    '/editprofile',
    '/likehistory',
    '/notifications',
  ];

  staticRoutes.forEach(route =>
    sitemap.write({ url: route, changefreq: 'weekly', priority: 0.8 })
  );

  // Example dynamic routes (replace with real data)
  const categories = ['Cybersecurity', 'AI', 'IT', 'Tech', 'ECommerce','Government','Others'];

  const newsSlugs = [
    { category: 'Tech', slug: "mike-lynch-british-tech-trailblazer-who-died-at-sea-after-us-trial-acquittal" },
    { category: 'Cybersecurity', slug: 'new-wi-fi-vulnerabilities-threaten-android-and-linux-users' },
    { category: 'Cybersecurity', slug: 'google-cloud-leak-linked-to-shark-tank-contestant-exposes-83-000' },
    { category: 'Cybersecurity', slug: 'apple-warns-armenian-journalist-about-possible-hacking' },
    { category: 'Tech', slug: 'apple-announces-new-privacy-features-with-ios-15' },
  ];

  categories.forEach(cat =>
    sitemap.write({ url: `/news/${cat}`, changefreq: 'weekly' })
  );

  newsSlugs.forEach(item =>
    sitemap.write({ url: `/news/${item.category}/${item.slug}`, changefreq: 'weekly' })
  );

  sitemap.end();
  await streamToPromise(sitemap);
  console.log('✅ Sitemap generated: /public/sitemap.xml');
})();
