//i18l
import i18n from "i18next";

export class ItemSet {
  readonly name: string;
  readonly hp: number;
  readonly mana: number;
  readonly endurance: number;
  readonly strength: number;
  readonly agility: number;
  readonly power: number;
  readonly knowledge: number;
  readonly totalPieces: number;
  readonly otherProperties: [string, number][];
  constructor(setProperties: ItemSetProperties) {
    this.name = setProperties.hasOwnProperty("name") ? setProperties.name! : "";
    this.hp = setProperties.hasOwnProperty("hp") ? setProperties.hp! : 0;
    this.mana = setProperties.hasOwnProperty("mana") ? setProperties.mana! : 0;
    this.endurance = setProperties.hasOwnProperty("endurance")
      ? setProperties.endurance!
      : 0;
    this.strength = setProperties.hasOwnProperty("strength")
      ? setProperties.strength!
      : 0;
    this.agility = setProperties.hasOwnProperty("agility")
      ? setProperties.agility!
      : 0;
    this.power = setProperties.hasOwnProperty("power")
      ? setProperties.power!
      : 0;
    this.knowledge = setProperties.hasOwnProperty("knowledge")
      ? setProperties.knowledge!
      : 0;
    this.totalPieces = setProperties.hasOwnProperty("pieces")
      ? setProperties.pieces!
      : 3;
    this.otherProperties = setProperties.hasOwnProperty("otherProperties")
      ? setProperties.otherProperties!
      : [];
    this.getValuesDependingOnPieces = this.getValuesDependingOnPieces.bind(this);
    this.getOtherPropertiesValuesDependingOnPieces = this.getOtherPropertiesValuesDependingOnPieces.bind(this);
    this.getOtherPropertiesValuesDependingOnPiecesAsArray = this.getOtherPropertiesValuesDependingOnPiecesAsArray.bind(this);
    this.getValueModifier = this.getValueModifier.bind(this);
  }
  //Method returning the values the set provides depending on the number of pieces worn
  public getValuesDependingOnPieces(currentPieces: number): SetPropertiesDependingOnPieces {
    //getting the modifier of the value each stat provides
    let valueModifier: number = this.getValueModifier(currentPieces);
    //calculating values
    let propertyValues: SetPropertiesDependingOnPieces = {
      hp: Math.floor(this.hp * valueModifier),
      mana: Math.floor(this.mana * valueModifier),
      endurance: Math.floor(this.endurance * valueModifier),
      strength: Math.floor(this.strength * valueModifier),
      agility: Math.floor(this.agility * valueModifier),
      knowledge: Math.floor(this.knowledge * valueModifier),
      power: Math.floor(this.power * valueModifier),
      otherProperties: this.getOtherPropertiesValuesDependingOnPieces(valueModifier)
    }
    return propertyValues
  }
  private getValueModifier(currentPieces: number): number {
    let valueModifier: number = 0;
    switch (currentPieces / this.totalPieces) {
      case 1:
        valueModifier = 1;
        break;
      case 0.8:
        valueModifier = 0.6;
        break;
      case 0.75:
        valueModifier = 0.5;
        break;
      case 2 / 3:
        valueModifier = 0.4;
        break;
      case 0.6:
        valueModifier = 0.4;
        break;
      case 0.5:
        valueModifier = 0.25;
        break;
      case 0.4:
        valueModifier = 0.2;
        break;
      default:
        valueModifier = 0;
        break;
    }
    return valueModifier
  }
  //Method returning the value of the otherProperties property in an easy to show form
  private getOtherPropertiesValuesDependingOnPieces(valueModifier: number): string[] {
    let propertyValues = this.otherProperties.map((x) => {
      let valueDependingOnPieces: number = 0;
      if (x[1] !== 1) {
        valueDependingOnPieces = Math.floor(x[1] * valueModifier * 10) / 10;
        let otherPropertyAsString = x[1] < 0 ? i18n.t(x[0]) + ": -" + Math.abs(valueDependingOnPieces) + "% (" + x[1] + "%)" : i18n.t(x[0]) + ": +" + valueDependingOnPieces + "% (" + x[1] + "%)"
        return otherPropertyAsString;
      } else {
        valueDependingOnPieces = valueModifier === 1 ? 1 : 0;
        return i18n.t(x[0]) + ": +" + valueDependingOnPieces + " (" + x[1] + ")";
      }
    });
    return propertyValues;
  }
  public getOtherPropertiesValuesDependingOnPiecesAsArray(currentPieces: number): [string, number][] {
    let valueModifier: number = this.getValueModifier(currentPieces);
    let otherPropertyValues: [string, number][] = this.otherProperties.map(x => {
      let valueDependingOnPieces: number = 0;
      if (x[1] !== 1) {
        valueDependingOnPieces = Math.floor(x[1] * valueModifier * 10) / 10;
        return [i18n.t(x[0]), valueDependingOnPieces];
      } else {
        valueDependingOnPieces = valueModifier === 1 ? 1 : 0;
        return [i18n.t(x[0]), valueDependingOnPieces]
      }
    });
    return otherPropertyValues
  }
}

export interface ItemSetProperties {
  name: string;
  hp?: number;
  mana?: number;
  endurance?: number;
  strength?: number;
  agility?: number;
  power?: number;
  knowledge?: number;
  pieces: number;
  otherProperties: [string, number][];
}

export interface SetPropertiesDependingOnPieces {
  hp: number;
  mana: number;
  endurance: number;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  otherProperties: string[]
}
