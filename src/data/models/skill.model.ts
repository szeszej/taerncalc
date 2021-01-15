//Database
import database from "../skills"

export class Skill {
  constructor(charClass: string, number: number) {
    this.name = database[charClass]["skill" + number].name;
    this.description = database[charClass]["skill" + number].description;
    this.minLvl = 0;
    this.maxLvl = 7;
    this.level = 0;
    this.requiredCharLevelInc = 1;
    this.image = database[charClass]["skill" + number].image
    switch (number) {
      case 1:
        this.requiredCharLevel = 2;
        this.initReqLvl = 2;
        break;
      case 2:
        this.requiredCharLevel = 5;
        this.initReqLvl = 5;
        break;
      case 3:
        this.requiredCharLevel = 8;
        this.initReqLvl = 8;
        break;
      case 4:
        this.requiredCharLevel = 12;
        this.initReqLvl = 12;
        break;
      case 5:
        this.requiredCharLevel = 15;
        this.initReqLvl = 15;
        break;
      case 6:
        this.requiredCharLevel = 18;
        this.initReqLvl = 18;
        break;
      case 7:
        this.requiredCharLevel = 22;
        this.initReqLvl = 22;
        break;
      case 8:
        this.requiredCharLevel = 26;
        this.initReqLvl = 26;
        break;
      case 9:
        this.requiredCharLevel = 30;
        this.initReqLvl = 30;
        break;
      default:
        this.requiredCharLevel = 0;
        this.initReqLvl = 0;
        break;
    }
  }
}

export interface Skill {
  name: string
  description: string
  image: string
  minLvl: number
  maxLvl: number
  level: number
  requiredCharLevelInc: number
  requiredCharLevel: number
  initReqLvl: number
}
