export class ItemSet {
  readonly name: string
  readonly hp: number
  readonly mana: number
  readonly endurance: number
  readonly strength: number
  readonly agility: number
  readonly power: number
  readonly knowledge: number
  readonly totalPieces: number
  readonly otherProperties: [string, number][]
  constructor (setProperties: ItemSetProperties) {
    this.name = setProperties.hasOwnProperty("name") ? setProperties.name! : "";
    this.hp = setProperties.hasOwnProperty("hp") ? setProperties.hp! : 0;
    this.mana = setProperties.hasOwnProperty("mana") ? setProperties.mana! : 0;
    this.endurance = setProperties.hasOwnProperty("endurance") ? setProperties.endurance! : 0;
    this.strength = setProperties.hasOwnProperty("strength") ? setProperties.strength! : 0;
    this.agility = setProperties.hasOwnProperty("agility") ? setProperties.agility! : 0;
    this.power = setProperties.hasOwnProperty("power") ? setProperties.power! : 0;
    this.knowledge = setProperties.hasOwnProperty("knowledge") ? setProperties.knowledge! : 0;
    this.totalPieces = setProperties.hasOwnProperty("pieces") ? setProperties.pieces! : 3;
    this.otherProperties = setProperties.hasOwnProperty("otherProperties") ? setProperties.otherProperties! : [];
    this.getValuesDependingOnPieces.bind(this)
  }
  getValuesDependingOnPieces(currentPieces: number): string[] {
    let propertyValues = this.otherProperties.map(x => {
      let valueDependingOnPieces = Math.floor(x[1] * currentPieces / this.totalPieces)
      switch (this.totalPieces) {
        case 5:
          valueDependingOnPieces = Math.floor(x[1] * currentPieces / this.totalPieces)
          break;

        default:
          break;
      }
      if (x[1] > 0 && x[1] < 1) {
        return x[0] + " " + valueDependingOnPieces * 100 + "% (" + x[1] * 100 + "%)"
      } else {
        return x[0] + " " + valueDependingOnPieces + " (" + x[1] + "%)"
      }
    })
    return propertyValues
  }
}

export interface ItemSetProperties {
  name: string
  hp?: number
  mana?: number
  endurance?: number
  strength?: number
  agility?: number
  power?: number
  knowledge?: number
  pieces: number
  otherProperties: [string, number][]
}
