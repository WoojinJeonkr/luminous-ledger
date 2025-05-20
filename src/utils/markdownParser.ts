import fs from 'fs/promises';
import path from 'path';
import type { Frontmatter } from '../types/content';

interface ParsedMarkdown {
  frontmatter: Frontmatter;
  content: string;
}

export function parseFrontmatter(text: string): ParsedMarkdown {
  // frontmatter 구분자 체크
  if (!text.includes('---\n') || !text.includes('\n---\n')) {
    throw new Error('No frontmatter found');
  }

  // frontmatter 텍스트 추출
  const frontmatterStart = text.indexOf('---\n') + 4;
  const frontmatterEnd = text.indexOf('\n---\n');
  const frontmatterText = text.substring(frontmatterStart, frontmatterEnd);
  
  // content 추출
  const contentStart = frontmatterEnd + 5;
  const content = text.substring(contentStart).trim();
  
  // frontmatter 파싱
  const frontmatter: Record<string, any> = {};
  frontmatterText.split('\n').forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      frontmatter[key] = value;
    }
  });

  // 타입 체크 및 캐스팅
  const parsedFrontmatter: Frontmatter = {
    title: frontmatter.title as string || '',
    date: frontmatter.date as string || '',
    type: (frontmatter.type as 'tutorial' | 'project' | 'note') || 'note',
    tags: (frontmatter.tags as string || '').split(',').map(tag => tag.trim()),
    slug: frontmatter.slug as string || '',
    description: frontmatter.description as string | undefined,
    featuredImage: frontmatter.featuredImage as string | undefined,
    status: (frontmatter.status as 'published' | 'draft') || 'published'
  };

  return {
    frontmatter: parsedFrontmatter,
    content
  };
}

// 서버 사이드에서 파일 파싱
export async function parseMarkdownFile(filePath: string): Promise<ParsedMarkdown> {
  try {
    const absolutePath = path.resolve(process.cwd(), 'public', filePath);
    const fileContent = await fs.readFile(absolutePath, 'utf-8');
    return parseFrontmatter(fileContent);
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    throw error;
  }
}

// 디렉토리의 모든 마크다운 파일 파싱
export async function parseMarkdownDirectory(directoryPath: string): Promise<ParsedMarkdown[]> {
  try {
    const absolutePath = path.resolve(process.cwd(), 'public', directoryPath);
    const files = await fs.readdir(absolutePath);
    
    const markdownFiles = files
      .filter(file => file.endsWith('.md'))
      .map(file => path.join(directoryPath, file));
    
    const parsedFiles = await Promise.all(
      markdownFiles.map(file => parseMarkdownFile(file))
    );
    
    return parsedFiles;
  } catch (error) {
    console.error(`Error parsing markdown directory ${directoryPath}:`, error);
    throw error;
  }
}

export default parseMarkdownFile;
