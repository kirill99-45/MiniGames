export interface ICurrentOption {
  option : string,
  index : number,
  correctResult : number,
}

export interface ILevel {
  level : number,
  result : boolean,
  currentOption: ICurrentOption,
  answers : number[]
  isPlayed : boolean,
}

export interface IResults {
  levels : ILevel[],
  correct : number,
  scores : number,
  inRow : number,
}

export interface IHelper {
  countOfHelps : number,
  attempts? : ILevel[],
}
