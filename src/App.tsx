import { useEffect, useState } from 'react'
import { MarkdownPage } from './components/MarkdownPage'

interface Frontmatter {
  title: string
  date: string
  type: 'tutorial' | 'project' | 'note'
  tags: string[]
  slug: string
  description?: string
  featuredImage?: string
  status?: 'published' | 'draft'
}

interface MarkdownContent {
  frontmatter: Frontmatter
  content: string
}

function parseFrontmatter(text: string): { frontmatter: Frontmatter; content: string } {
  // frontmatter 구분자 체크
  const hasFrontmatter = text.includes('---\n') && text.includes('\n---\n');
  if (!hasFrontmatter) {
    throw new Error('No frontmatter found');
  }

  // frontmatter 텍스트 추출
  const frontmatterStart = text.indexOf('---\n') + 4;
  const frontmatterEnd = text.indexOf('\n---\n');
  const frontmatterText = text.substring(frontmatterStart, frontmatterEnd);
  
  // content 추출
  const contentStart = frontmatterEnd + 5;
  const content = text.substring(contentStart);
  
  // frontmatter 파싱
  const frontmatter: Record<string, any> = {};
  frontmatterText.split('\n').forEach(line => {
    const [key, value] = line.split(':').map(s => s.trim());
    if (key && value) {
      frontmatter[key] = value;
    }
  });

  // 타입 체크 및 캐스팅
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

  return { frontmatter: parsedFrontmatter, content: content.trim() };
}

function App() {
  const [markdown, setMarkdown] = useState<MarkdownContent | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        // public 디렉토리에서 파일 로드
        const response = await fetch('/content/index.md');
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown file: ${response.status}`);
        }
        const text = await response.text();
        
        console.log('Raw text:', text); // 디버깅을 위한 로그
        
        const parsed = parseFrontmatter(text);
        
        if (parsed.frontmatter.status === 'draft') {
          console.log('Draft post skipped:', parsed.frontmatter.title);
          return;
        }

        setMarkdown(parsed);
      } catch (error) {
        console.error('Failed to load markdown:', error);
        setMarkdown(null);
      }
    };

    loadMarkdown();
  }, []);

  if (!markdown) {
    return <div>Loading...</div>;
  }

  return (
    <div className="markdown-container">
      <h1>{markdown.frontmatter.title}</h1>
      <p className="meta">
        <span className="date">{markdown.frontmatter.date}</span>
        <span className="type">{markdown.frontmatter.type}</span>
        {markdown.frontmatter.tags && (
          <span className="tags">
            {markdown.frontmatter.tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </span>
        )}
        {markdown.frontmatter.description && (
          <p className="description">{markdown.frontmatter.description}</p>
        )}
        {markdown.frontmatter.featuredImage && (
          <img
            src={markdown.frontmatter.featuredImage}
            alt={markdown.frontmatter.title}
            className="featured-image"
          />
        )}
      </p>
      <MarkdownPage content={markdown.content} />
    </div>
  );
}

export default App;