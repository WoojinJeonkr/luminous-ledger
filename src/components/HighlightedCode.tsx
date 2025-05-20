import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';
import { useEffect, useRef } from 'react';

function dedent(str: string) {
  const lines = str.replace(/^\n/, '').replace(/\n\s*$/, '').split('\n');
  const minIndent = Math.min(
    ...lines.filter(line => line.trim()).map(line => line.match(/^(\s*)/)![1].length)
  );
  return lines.map(line => line.slice(minIndent)).join('\n');
}

const LANG_LABELS: Record<string, string> = {
  javascript: 'JavaScript',
  js: 'JavaScript',
  typescript: 'TypeScript',
  ts: 'TypeScript',
  bash: 'Bash',
  shell: 'Shell',
  python: 'Python',
  java: 'Java',
};

export function HighlightedCode({ code, language = 'javascript' }: { code: string, language?: string }) {
  const ref = useRef<HTMLElement>(null);
  const label = LANG_LABELS[language] || language;

  useEffect(() => {
    if (ref.current) {
      hljs.highlightElement(ref.current);
    }
  }, [code, language]);

  return (
    <div style={{ margin: '1.5rem 0' }}>
      <div style={{
        fontSize: '0.95rem',
        color: '#64748b',
        background: '#f3f4f6',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: '0.3rem 1rem',
        borderBottom: '1px solid #e5e7eb',
        fontWeight: 500,
        fontFamily: 'inherit'
      }}>
        {label}
      </div>
      <pre style={{ margin: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
        <code ref={ref} className={`language-${language}`}>
          {dedent(code)}
        </code>
      </pre>
    </div>
  );
} 