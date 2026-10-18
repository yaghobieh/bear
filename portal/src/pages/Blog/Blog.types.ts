export interface BlogSection {
  heading: string;
  body: string;
  code?: string;
}

export interface BlogTip {
  id: string;
  title: string;
  body: string;
  path: string;
  code?: string;
  sections?: BlogSection[];
}
