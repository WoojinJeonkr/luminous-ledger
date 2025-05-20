import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { MarkdownPage } from '../components/MarkdownPage';
import type { Frontmatter } from '../types/content';

interface MarkdownContent {
  frontmatter: Frontmatter;
  content: string;
}

export function SectionPage() {
  const { type } = useParams();
  const [markdown, setMarkdown] = useState<MarkdownContent | null>(null);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(`/content/${type}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown file: ${response.status}`);
        }
        const text = await response.text();
        
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

        setMarkdown({ frontmatter: parsedFrontmatter, content });
      } catch (error) {
        console.error('Failed to load markdown:', error);
        setMarkdown(null);
      }
    };

    loadMarkdown();
  }, [type]);

  useEffect(() => {
    const loadMarkdown = async () => {
      try {
        const response = await fetch(`/content/${type}.md`);
        if (!response.ok) {
          throw new Error(`Failed to fetch markdown file: ${response.status}`);
        }
        const text = await response.text();
        
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

        if (parsedFrontmatter.status === 'draft') {
          console.log('Draft post skipped:', parsedFrontmatter.title);
          return;
        }

        setMarkdown({ frontmatter: parsedFrontmatter, content });
      } catch (error) {
        console.error('Failed to load markdown:', error);
        setMarkdown(null);
      }
    };

    loadMarkdown();
  }, [type]);

  if (!markdown) {
    return <div>Loading...</div>;
  }

  return (
    <div className="section-container">
      <div className="content-header">
        <h1>{markdown.frontmatter.title}</h1>
        <div className="meta-info">
          <div className="date">{markdown.frontmatter.date}</div>
          <div className="type">{markdown.frontmatter.type}</div>
          {markdown.frontmatter.tags && (
            <div className="tags">
              {markdown.frontmatter.tags.map((tag, index) => (
                <span key={index} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
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
      </div>
      <div className="markdown-content">
        <MarkdownPage content={markdown.content} />
      </div>
    </div>
  );
}
