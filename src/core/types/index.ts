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

export interface PlayerStats {
  ast:          number;
  blk:          number;
  dreb:         number;
  fg3_pct:      number;
  fg3a:         number;
  fg3m:         number;
  fg_pct:       number;
  fga:          number;
  fgm:          number;
  ft_pct:       number;
  fta:          number;
  ftm:          number;
  games_played: number;
  min:          string;
  oreb:         number;
  pf:           number;
  player_id:    number;
  pts:          number;
  reb:          number;
  season:       number;
  st:           number;
  turnover:     number;
}