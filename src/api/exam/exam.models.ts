export interface Tech {
  id: string;
  name: string;
}

export interface Question {
  _id?: string;
  tech: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
}
