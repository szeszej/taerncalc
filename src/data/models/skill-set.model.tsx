//Models
import { Skill } from "./skill.model";

//database
import { basicSkillsDatabase, classSkillsDatabase } from "../skills"

export class SkillSet {
  constructor(className: string) {
    for (let i = 1; i <= 9; i++) {
      this["skill" + i] = new Skill(basicSkillsDatabase["skill" + i], i);
    }
    for (let i = 10; i <= 17; i++) {
      this["skill" + i] = new Skill(classSkillsDatabase[className]["skill" + i]);
    }
  }
}

export interface SkillSet {
  skill1: Skill
  skill2: Skill
  skill3: Skill
  skill4: Skill
  skill5: Skill
  skill6: Skill
  skill7: Skill
  skill8: Skill
  skill9: Skill
  skill10: Skill
  skill11: Skill
  skill12: Skill
  skill13: Skill
  skill14: Skill
  skill15: Skill
  skill16: Skill
  skill17: Skill
  [index:string] : Skill
}
