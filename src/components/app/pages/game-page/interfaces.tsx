export interface ILevel {
  level : number,
  result : boolean,
  isPlayed : boolean
}

export interface IResults {
  levels : ILevel[],
  correct : number,
  scores : number,
  inRow : number,
}

export interface ICurrentOption {
  option : number,
  index : number,
}
