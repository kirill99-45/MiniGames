export interface ICurrentOption {
  option : string,
  index : number,
  correctResult : number,
}

export interface IAnswer {
  answer : number,
  isHidden : true,
}

export interface ILevel {
  level : number,
  result : boolean,
  currentOption: ICurrentOption,
  answers : IAnswer[]
  isPlayed : boolean,
}

export interface IResults {
  levels : any[],
  correct : number,
  scores : number,
  inRow : number,
}

export interface IHelper {
  countOfHelps : number,
  attempts? : any[],
}

export interface ICash {
  [key: number] : number,
}