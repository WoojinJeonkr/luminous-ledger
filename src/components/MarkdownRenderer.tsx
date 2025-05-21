import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';

interface MarkdownRendererProps {
  content: string;
  darkMode?: boolean;
}

export default function MarkdownRenderer({ content, darkMode = false }: MarkdownRendererProps) {
  // 메타데이터 추출
  const metaMatch = content.match(/^---\n([\s\S]*?)\n---/);
  const meta = metaMatch ? parseMetadata(metaMatch[1]) : {};

  // 메타데이터 제거 후 실제 내용만 남기기
  const mainContent = content.replace(/^---\n[\s\S]*?\n---\n/, '');

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
        return <code className={className}>{children}</code>;
      }
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : 'text';
      const codeContent = String(children).trim();
      return (
        <div className="code-block-container" style={{
          margin: '1.5rem 0',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
          background: darkMode ? '#1a1a1a' : '#fff',
        }}>
          <div className="code-block-header" style={{
            padding: '0.75rem 1.25rem',
            backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
            color: darkMode ? '#fff' : '#333',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: darkMode ? '1px solid #333' : '1px solid #eee',
          }}>
            <span style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              textTransform: 'capitalize',
              letterSpacing: '0.025em'
            }}>{language}</span>
          </div>
          <SyntaxHighlighter
            language={language}
            style={darkMode ? materialDark : materialLight}
            {...props}
            customStyle={{
              padding: '1rem',
              backgroundColor: darkMode ? '#1a1a1a' : '#fff',
              borderRadius: 0,
            }}
          >
            {codeContent}
          </SyntaxHighlighter>
        </div>
      );
    },
    blockquote: ({ className, children, ...props }) => (
      <blockquote
        style={{
          borderLeft: '3px solid #e2e8f0',
          padding: '1rem',
          margin: '1.5rem 0',
          backgroundColor: '#f8fafc',
        }}
        className={className}
        {...props}
      >
        {children}
      </blockquote>
    ),
    table: ({ className, children, ...props }) => (
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          margin: '1.5rem 0',
          backgroundColor: 'white',
        }}
        className={className}
        {...props}
      >
        {children}
      </table>
    ),
    th: ({ className, children, ...props }) => (
      <th
        style={{
          padding: '1rem',
          borderBottom: '2px solid #e2e8f0',
          backgroundColor: '#f8fafc',
          fontWeight: 'bold',
        }}
        className={className}
        {...props}
      >
        {children}
      </th>
    ),
    td: ({ className, children, ...props }) => (
      <td
        style={{
          padding: '1rem',
          borderBottom: '1px solid #e2e8f0',
        }}
        className={className}
        {...props}
      >
        {children}
      </td>
    ),
    ul: ({ className, children, ...props }) => (
      <ul
        style={{
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
        }}
        className={className}
        {...props}
      >
        {children}
      </ul>
    ),
    ol: ({ className, children, ...props }) => (
      <ol
        style={{
          marginBottom: '1rem',
          paddingLeft: '1.5rem',
        }}
        className={className}
        {...props}
      >
        {children}
      </ol>
    ),
    li: ({ className, children, ...props }) => (
      <li
        style={{
          marginBottom: '0.5rem',
        }}
        className={className}
        {...props}
      >
        {children}
      </li>
    ),
    h1: ({ children, ...props }) => (
      <h1 {...props} style={{ fontSize: '2rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        {children}
      </h1>
    ),
    h2: ({ children, ...props }) => (
      <h2 {...props} style={{ fontSize: '1.75rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3 {...props} style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
        {children}
      </h3>
    ),
    p: ({ children, ...props }) => (
      <p {...props} style={{ marginBottom: '0.75rem', lineHeight: '1.5' }}>
        {children}
      </p>
    ),
    a: ({ children, href, ...props }) => (
      <a
        {...props}
        href={href}
        style={{
          color: darkMode ? '#4299e1' : '#2b6cb0',
          textDecoration: 'none'
        }}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  };

  return (
    <div className="markdown-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
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
