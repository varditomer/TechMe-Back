export interface Tech {
  id: string;
  name: string;
}

export interface Question {
  id: string;
  tech: string;
  question: string;
  code?: string;
  options: string[];
  correctOptionIndex: number;
} 
