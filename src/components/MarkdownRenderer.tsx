"use client";

import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark, materialLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import type { Components } from 'react-markdown';

// Add CSS styles for hover effects
const styles = `
.code-block-button:hover {
  background: var(--dark-mode, #3a3a3a);
}

[data-theme="light"] .code-block-button:hover {
  background: #e8e8e8;
}
`;

// Add styles to document
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

interface MarkdownRendererProps {
  content: string;
  darkMode?: boolean;
}

interface CodeBlockProps {
  language: string;
  value: string;
  darkMode?: boolean;
}

const CodeBlock = ({ language, value, darkMode = false }: CodeBlockProps) => {
  return (
    <div
      style={{
        margin: '1.5rem 0',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        boxShadow: darkMode ? '0 2px 8px rgba(0, 0, 0, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)',
        background: darkMode ? '#1a1a1a' : '#fff',
      }}
    >
      <div
        style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: darkMode ? '#2a2a2a' : '#f8f8f8',
          color: darkMode ? '#fff' : '#333',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: darkMode ? '1px solid #333' : '1px solid #eee',
        }}
      >
        <span style={{ 
          fontSize: '0.875rem',
          fontWeight: 600,
          textTransform: 'capitalize',
          letterSpacing: '0.025em'
        }}>{language}</span>
        <button
          className="code-block-button"
          style={{
            background: darkMode ? '#2a2a2a' : '#f8f8f8',
            border: 'none',
            color: darkMode ? '#fff' : '#333',
            cursor: 'pointer',
            padding: '0.375rem 0.75rem',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 600,
            transition: 'background-color 0.2s'
          }}
          onClick={(e) => {
            e.preventDefault();
            navigator.clipboard.writeText(value);
          }}
        >
          Copy
        </button>
      </div>
      <div
        style={{
          overflowX: 'auto',
          padding: '1rem',
          backgroundColor: darkMode ? '#1a1a1a' : '#fff',
          borderRadius: '0 0 0.5rem 0.5rem',
        }}
      >
        <SyntaxHighlighter
          language={language}
          PreTag="div"
          style={darkMode ? materialDark : materialLight}
        >
          {value}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

const components: Components = {
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return match ? (
      <CodeBlock language={match[1]} value={String(children).replace(/\n$/, "")} darkMode={false} />
    ) : (
      <code {...props}>{children}</code>
    );
  },
  blockquote: ({ ...props }) => (
    <blockquote
      style={{
        borderLeft: '3px solid #e2e8f0',
        padding: '1rem',
        margin: '1.5rem 0',
        backgroundColor: '#f8fafc',
      }}
      {...props}
    />
  ),
  table: ({ ...props }) => (
    <table
      style={{
        width: '100%',
        borderCollapse: 'collapse',
        margin: '1.5rem 0',
        backgroundColor: 'white',
      }}
      {...props}
    />
  ),
  th: ({ ...props }) => (
    <th
      style={{
        border: '1px solid #e2e8f0',
        padding: '0.75rem',
        textAlign: 'left',
        backgroundColor: '#f8fafc',
        fontWeight: '600',
      }}
      {...props}
    />
  ),
  td: ({ ...props }) => (
    <td
      style={{
        border: '1px solid #e2e8f0',
        padding: '0.75rem',
        textAlign: 'left',
      }}
      {...props}
    />
  ),
  p: ({ ...props }) => (
    <p
      style={{
        margin: '1rem 0',
        lineHeight: '1.6',
      }}
      {...props}
    />
  ),
  h1: ({ ...props }) => (
    <h1
      style={{
        margin: '1.5rem 0',
        fontWeight: '600',
      }}
      {...props}
    />
  ),
  h2: ({ ...props }) => (
    <h2
      style={{
        margin: '1.5rem 0',
        fontWeight: '600',
      }}
      {...props}
    />
  ),
  h3: ({ ...props }) => (
    <h3
      style={{
        margin: '1.5rem 0',
        fontWeight: '600',
      }}
      {...props}
    />
  ),
  ul: ({ ...props }) => (
    <ul
      style={{
        margin: '1rem 0',
        paddingLeft: '1.5rem',
      }}
      {...props}
    />
  ),
  ol: ({ ...props }) => (
    <ol
      style={{
        margin: '1rem 0',
        paddingLeft: '1.5rem',
      }}
      {...props}
    />
  ),
  li: ({ ...props }) => (
    <li
      style={{
        margin: '0.5rem 0',
      }}
      {...props}
    />
  ),
  a: ({ children, ...props }) => (
    <a
      style={{
        color: '#2563eb',
        textDecoration: 'none',
        transition: 'color 0.2s',
      }}
      {...props}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = '#1d4ed8';
        e.currentTarget.style.textDecoration = 'underline';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = '#2563eb';
        e.currentTarget.style.textDecoration = 'none';
      }}
    >
      {children}
    </a>
  ),
};

export function MarkdownRenderer({ content, darkMode = false }: MarkdownRendererProps) {
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <ReactMarkdown
        components={components}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSanitize]}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
