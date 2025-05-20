import { Link } from 'react-router-dom';
import { useMemo, type ReactNode } from 'react';

interface NoteArticleProps {
  title: string;
  date: string;
  summary: String;
  content: ReactNode;
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
  autoReadTime?: boolean;
  readTime?: string; // 수동 입력도 허용
}

function estimateReadTime(content: ReactNode): string {
  let text = '';
  let codeLines = 0;

  function extract(node: ReactNode) {
    if (typeof node === 'string') {
      text += node;
    } else if (Array.isArray(node)) {
      node.forEach(extract);
    } else if (node && typeof node === 'object' && 'props' in node) {
      if (node.type === 'pre' && node.props && node.props.children) {
        const code = typeof node.props.children === 'string'
          ? node.props.children
          : Array.isArray(node.props.children)
            ? node.props.children.join('')
            : '';
        codeLines += code.split('\n').length;
      } else if (node.props && node.props.children) {
        extract(node.props.children);
      }
    }
  }
  extract(content);

  const textMinutes = Math.ceil(text.length / 400);
  const codeMinutes = Math.ceil(codeLines / 25);
  const total = Math.max(1, textMinutes + codeMinutes);

  return `${total}분`;
}

export default function NoteArticle({
  title, date, summary, content, prev, next, autoReadTime, readTime
}: NoteArticleProps) {
  const calcReadTime = useMemo(
    () => autoReadTime ? estimateReadTime(content) : readTime,
    [autoReadTime, content, readTime]
  );

  return (
    <div className="note-article">
      <h1>{title}</h1>
      <div className="note-meta">
        <span>작성: {date}</span>
        <span>읽는 시간: {calcReadTime}</span>
      </div>
      <div className="note-summary">
        {summary}
      </div>
      <div className="note-content">{content}</div>
      <div className="note-nav">
        <div>
          {prev && (
            <Link to={prev.slug}>&larr; {prev.title}</Link>
          )}
        </div>
        <div>
          {next && (
            <Link to={next.slug}>{next.title} &rarr;</Link>
          )}
        </div>
      </div>
    </div>
  );
} 