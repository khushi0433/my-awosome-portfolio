export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category?: string;
  liveLink: string;
  githubLink: string;
}
