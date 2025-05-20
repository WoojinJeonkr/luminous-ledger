import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const contentDir = path.join(__dirname, '../src/content');

export async function getMarkdown(type: string, slug?: string) {
  try {
    const filePath = path.join(contentDir, type, slug ? `${slug}.md` : 'index.md');
    const text = await fs.promises.readFile(filePath, 'utf-8');
    
    // Frontmatter 파싱
    const frontmatterStart = text.indexOf('---\n') + 4;
    const frontmatterEnd = text.indexOf('\n---\n');
    const frontmatterText = text.substring(frontmatterStart, frontmatterEnd);
    
    const contentStart = frontmatterEnd + 5;
    const content = text.substring(contentStart).trim();
    
    const frontmatter: Record<string, any> = {};
    frontmatterText.split('\n').forEach(line => {
      const [key, value] = line.split(':').map(s => s.trim());
      if (key && value) {
        frontmatter[key] = value;
      }
    });

    const parsedFrontmatter = {
      title: frontmatter.title as string || '',
      date: frontmatter.date as string || '',
      type: (frontmatter.type as 'tutorial' | 'project' | 'note') || 'note',
      tags: (frontmatter.tags as string || '').split(',').map(tag => tag.trim()),
      slug: frontmatter.slug as string || '',
      description: frontmatter.description as string | undefined,
      featuredImage: frontmatter.featuredImage as string | undefined,
      status: (frontmatter.status as 'published' | 'draft') || 'published'
    };

    return { frontmatter: parsedFrontmatter, content };
  } catch (error) {
    console.error('Failed to load markdown:', error);
    return null;
  }
}
