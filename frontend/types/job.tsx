export interface Job {
  id: number;
  company: string;
  position: string;
  culture: {
    workLifeBalance: number;
    careerGrowth: number;
    innovation: number;
  };
  details: string;
  location: string;
  salary: string;
}
