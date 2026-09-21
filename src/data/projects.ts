import realProjects from './real-projects.json';

export interface Project {
  id: string;
  name: string;
  category: string;
  image: string;
  alt: string;
  placeholder: boolean;
  source?: string;
  imageCount?: number;
  gallery: { src: string; alt: string }[];
}

const descriptions: Record<string, string> = {
  Arquitetura: 'Casas pensadas para o encontro entre paisagem e cotidiano.',
  Interiores: 'Ambientes que dão forma aos ritmos de cada pessoa.',
  Comercial: 'Lugares que convidam à presença e criam encontros.',
};

export const projectGroups = (['Arquitetura', 'Interiores', 'Comercial'] as const).map(category => ({
  id: category.toLowerCase(),
  label: category,
  description: descriptions[category],
  projects: realProjects.filter(project => project.category === category) as Project[],
}));
