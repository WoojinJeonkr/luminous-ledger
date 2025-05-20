export interface Frontmatter {
  title: string;
  date: string; // ISO 8601 형식 (예: '2025-05-20')
  type: 'tutorial' | 'project' | 'note';
  tags: string[];
  slug: string;
  description?: string;
  featuredImage?: string;
  status?: 'published' | 'draft';
  [key: string]: any; // 추가적인 커스텀 필드를 위한 타입
}

export interface MarkdownContent {
  frontmatter: Frontmatter;
  content: string;
}

export interface ContentCollection {
  [slug: string]: MarkdownContent;
}

// 타입별로 필터링할 때 사용할 타입
export type ContentType = 'tutorial' | 'project' | 'note';

// 타입별 컬렉션
export interface ContentByType {
  tutorials: ContentCollection;
  projects: ContentCollection;
  notes: ContentCollection;
}

// 정렬 함수에서 사용할 타입
export type SortOrder = 'asc' | 'desc';

// 태그별 필터링을 위한 타입
export interface Tag {
  name: string;
  count: number;
}

// 상태 필터링을 위한 타입
export type ContentStatus = 'published' | 'draft';
