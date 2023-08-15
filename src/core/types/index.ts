// Global Type Definitions
export interface Player {
  first_name: string;
  height_feet: null;
  height_inches: null;
  id: number;
  last_name: string;
  position: string;
  weight_pounds: null;
  team: Team;
}

export interface Team {
  abbreviation: string;
  city: string;
  conference: string;
  division: string;
  full_name: string;
  id: number;
  name: string;
}