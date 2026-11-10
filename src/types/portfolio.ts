export type ProjectId = 'sync' | 'systems' | 'cross-platform' | 'offline' | 'motionapp' | 'operations' | 'madi';
export type ProjectDirection = -1 | 1;

interface ProjectFields {
  id: ProjectId;
  title: string;
  category: string;
  subtitle: string;
  period: string;
  role: string;
  stack: string;
  blocks: readonly (readonly [label: string, heading: string, body: string])[];
  scope: string;
  imageAlt?: string;
  imageNote?: string;
  imageSource?: string;
  imageSourceLabel?: string;
  url?: string;
  urlLabel?: string;
}

type ProjectVisual =
  | { image: string; imageFit?: 'contain'; images?: never }
  | { images: readonly { file: string; alt: string }[]; image?: never; imageFit?: never };

export type CaseStudy = ProjectFields & ProjectVisual;

export interface ProjectCardData {
  className: string;
  id: string | null;
  buttonLabel: string;
  visualLabel: string;
  number: string;
  description: string;
  tags: readonly string[];
  screens: readonly { src: string; alt: string; width: number; height: number }[];
  sideProject?: boolean;
  link?: { url: string; label: string };
}

export type PortfolioProject = CaseStudy & { card: ProjectCardData };

export interface TechnologyGroup {
  id: string;
  title: string;
  items: readonly { name: string; icon: string }[];
}
