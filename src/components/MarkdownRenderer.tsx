import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import './MarkdownRenderer.css';

interface MarkdownRendererProps {
  content: string;
  darkMode?: boolean;
}

export default function MarkdownRenderer({ content, darkMode = false }: MarkdownRendererProps) {
  // 메타데이터 추출
  const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const meta = metaMatch ? parseMetadata(metaMatch[1]) : {};

  // 메타데이터 제거 후 실제 내용만 남기기
  const mainContent = content.replace(/^---\n[\s\S]*?\n---(\n)?/, '');

  // 메타데이터가 없을 때 자동 계산
  const autoMeta: { [key: string]: string } = { ...meta };
  if (!autoMeta.readingTime) {
    // 200자당 1분
    const minutes = Math.max(1, Math.ceil(mainContent.replace(/[`~]/g, '').length / 200));
    autoMeta.readingTime = `${minutes}분`;
  }
  if (!autoMeta.codeCount) {
    // 코드 블록 개수
    const codeBlocks = (mainContent.match(/```/g) || []).length / 2;
    autoMeta.codeCount = `${codeBlocks}개`;
  }
  if (!autoMeta.date) {
    // 오늘 날짜로 대체
    autoMeta.date = new Date().toISOString().slice(0, 10);
  }

  const components: Components = {
    code({ inline, className, children, ...props }: any) {
      if (inline) {
        return (
          <code className={`inline ${className || ''}`} {...props}>
            {children}
          </code>
        );
      }
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      const codeContent = String(children).replace(/^\n+|\n+$/g, '');
      return (
        <div className="code-block-container">
          <div className="code-block-header">
            <span className="language-label">{language.toUpperCase()}</span>
            <div className="window-controls">
              <div className="window-control close" />
              <div className="window-control minimize" />
              <div className="window-control maximize" />
            </div>
          </div>
          <SyntaxHighlighter
            language={language}
            style={darkMode ? materialDark : materialLight}
            customStyle={{
              margin: 0,
              padding: '1rem',
              borderBottomLeftRadius: '0.5rem',
              borderBottomRightRadius: '0.5rem',
              background: 'var(--code-content-bg)',
              fontSize: '0.875rem',
              lineHeight: '1.5',
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace'
            }}
            {...props}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>
      );
    },
    blockquote: ({ className, children, ...props }) => (
      <blockquote className={className} {...props}>
        {children}
      </blockquote>
    ),
    table: ({ className, children, ...props }) => (
      <table className={className} {...props}>
        {children}
      </table>
    ),
    th: ({ className, children, ...props }) => (
      <th className={className} {...props}>
        {children}
      </th>
    ),
    td: ({ className, children, ...props }) => (
      <td className={className} {...props}>
        {children}
      </td>
    ),
    ul: ({ className, children, ...props }) => (
      <ul className={className} {...props}>
        {children}
      </ul>
    ),
    ol: ({ className, children, ...props }) => (
      <ol className={className} {...props}>
        {children}
      </ol>
    ),
    li: ({ className, children, ...props }) => (
      <li className={className} {...props}>
        {children}
      </li>
    ),
    h1: ({ className, children, ...props }) => (
      <h1 className={className} {...props}>
        {children}
      </h1>
    ),
    h2: ({ className, children, ...props }) => (
      <h2 className={className} {...props}>
        {children}
      </h2>
    ),
    h3: ({ className, children, ...props }) => (
      <h3 className={className} {...props}>
        {children}
      </h3>
    ),
    p: ({ className, children, ...props }) => (
      <p className={className} {...props}>
        {children}
      </p>
    ),
    a: ({ className, children, href, ...props }) => (
      <a
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    )
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize]}
        components={components}
      >
        {mainContent}
      </ReactMarkdown>
    </div>
  );
}

// 메타데이터 파싱 함수
function parseMetadata(content: string): { [key: string]: string } {
  return content.split('\n').reduce((acc: { [key: string]: string }, line: string) => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      if (value) {
        acc[key.trim()] = value;
      }
    }
    return acc;
  }, {});
}
