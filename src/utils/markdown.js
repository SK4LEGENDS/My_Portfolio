import fm from 'front-matter';

// Get all project markdown files
const projectFiles = import.meta.glob('../content/projects/*.md', { query: '?raw', import: 'default', eager: true });
const blogFiles = import.meta.glob('../content/blog/*.md', { query: '?raw', import: 'default', eager: true });

export function getProjects() {
  const projects = [];
  for (const path in projectFiles) {
    const rawContent = projectFiles[path];
    const { attributes, body } = fm(rawContent);
    projects.push({
      id: path.split('/').pop().replace('.md', ''),
      ...attributes,
      longDescription: body // the markdown body
    });
  }
  // Sort projects by order attribute
  projects.sort((a, b) => (a.order || 99) - (b.order || 99));
  return projects;
}

export function getBlogs() {
  const blogs = [];
  for (const path in blogFiles) {
    const rawContent = blogFiles[path];
    const { attributes, body } = fm(rawContent);
    blogs.push({
      id: path.split('/').pop().replace('.md', ''),
      ...attributes,
      content: body
    });
  }
  return blogs;
}
