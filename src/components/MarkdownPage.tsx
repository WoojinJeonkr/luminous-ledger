import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

interface MarkdownPageProps {
  content: string;
}

export const MarkdownPage: React.FC<MarkdownPageProps> = ({ content }) => {
  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <ReactMarkdown
      rehypePlugins={[
        rehypeSlug,
        rehypeAutolinkHeadings,
      ]}
      components={{
        code({ className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          const language = match ? match[1] : 'text';
          return (
            <pre className="language-container">
              <code className={`language-${language}`} {...props}>
                {children}
              </code>
            </pre>
          );
        },
        html: ({ children }) => (
          <div dangerouslySetInnerHTML={{ __html: typeof children === 'string' ? children : '' }} />
        )
      }}
    >
      {content}
    </ReactMarkdown>
  );
};
