import fs from 'fs';
import { portfolioData } from './src/data/portfolio.js';
import path from 'path';

function createSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

const projectsDir = './src/content/projects';
const blogsDir = './src/content/blog';

// Ensure dirs exist
if (!fs.existsSync(projectsDir)) fs.mkdirSync(projectsDir, { recursive: true });
if (!fs.existsSync(blogsDir)) fs.mkdirSync(blogsDir, { recursive: true });

portfolioData.projects.forEach(proj => {
  const slug = createSlug(proj.title.split('—')[0] || proj.title);
  
  let frontmatter = `---
title: "${proj.title.replace(/"/g, '\\"')}"
description: "${proj.description.replace(/"/g, '\\"')}"
role: "${proj.role}"
period: "${proj.period}"
category: "${proj.category}"
featured: ${proj.featured}
github: "${proj.github || '#'}"
live: "${proj.live || '#'}"
tech: ${JSON.stringify(proj.tech)}
media: ${JSON.stringify(proj.media || [])}
features: ${JSON.stringify(proj.features || [])}
---`;

  const content = `${frontmatter}\n\n${proj.longDescription || ''}`;
  fs.writeFileSync(path.join(projectsDir, `${slug}.md`), content, 'utf8');
  console.log(`Created project: ${slug}.md`);
});

portfolioData.blog.forEach(blog => {
  const slug = createSlug(blog.title);
  
  let frontmatter = `---
title: "${blog.title.replace(/"/g, '\\"')}"
summary: "${blog.summary.replace(/"/g, '\\"')}"
role: "${blog.role}"
period: "${blog.period}"
date: "${blog.date}"
category: "${blog.category}"
tags: ${JSON.stringify(blog.tags)}
media: ${JSON.stringify(blog.media || [])}
takeaways: ${JSON.stringify(blog.takeaways || [])}
---`;

  const content = `${frontmatter}\n\n${blog.content || ''}`;
  fs.writeFileSync(path.join(blogsDir, `${slug}.md`), content, 'utf8');
  console.log(`Created blog: ${slug}.md`);
});

console.log("Migration complete!");
