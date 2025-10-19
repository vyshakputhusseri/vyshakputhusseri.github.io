
import type React from 'react';

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl?: string;
}

export interface Skill {
  name: string;
  icon: React.ReactElement;
}
