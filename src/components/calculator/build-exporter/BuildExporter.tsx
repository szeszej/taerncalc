//React
import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/store";

//Shared functionality
import isEquivalent from "../../../shared/object-equivalency-check";

//Types
import { SkillSet } from "../../../data/models/skill-set.model";
import { Item, Enhancements } from "../../../data/models/item.model";
import { StatsState } from "../../../store/stats-reducer/stats-reducer";
import { Equipment } from "../../../store/equipment-reducer/equipment-reducer";

//Components
import { Alert } from "../../shared/Alert"

//i18l
import { withTranslation } from "react-i18next";

class ConnectedBuildExporter extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      showExport: false,
      exportLink: "",
    };
  }
  componentDidUpdate(prevProps: PropTypes) {
    //If properties change, hides the export field
    if (!isEquivalent(prevProps, this.props)) {
      this.hideExport();
    }
  }
  hideExport() {
    //Hides the export field
    this.setState({
      showExport: false,
      exportLink: "",
    });
  }
  createUrlForExport() {
    //Array for storing properties to later turn into URL
    let buildForExport: BuildForExport = {
      class: this.props.className,
      level: this.props.level,
      stats: {},
      skills: {},
      equipment: {},
      lastAccess: new Date()
    };
    //Transforming skills
    if (this.props.skills.skillPts !== this.props.level * 2 - 2) {
      buildForExport.skills.skillPts = this.props.skills.skillPts;
    }
    const numberOfSkills: number = 18;
    for (let i = 1; i < numberOfSkills; i++) {
      if (
        this.props.skills.skillSet[("skill" + i) as keyof SkillSet].level !==
        this.props.skills.skillSet[("skill" + i) as keyof SkillSet].minLvl
      ) {
        buildForExport.skills![("skill" + i) as keyof SkillsForExport] = this.props.skills.skillSet[("skill" + i) as keyof SkillSet].level
      }
    }
    //Transforming stats
    for (let key in this.props.stats) {
      if (this.props.stats.hasOwnProperty(key)) {
        if (key === "statPts") {
          if (this.props.stats.statPts !== this.props.level * 4 + 1) {
            buildForExport.stats = {}
            buildForExport.stats.statPts = this.props.stats.statPts
          }
        }
        if (
          (["hp", "endurance", "mana"].includes(key) &&
            this.props.stats[key as keyof StatsState] !== 200) ||
          (["strength", "agility", "power", "knowledge"].includes(key) &&
            this.props.stats[key as keyof StatsState] !== 10)
        ) {
          buildForExport.stats[key as keyof StatsForExport] = this.props.stats[key as keyof StatsState]
        }
      }
    }
    //Transforming equipment
    for (const key in this.props.equipment) {
      if (this.props.equipment.hasOwnProperty(key)) {
        if (this.props.equipment[key as keyof Equipment] !== null) {
            buildForExport.equipment![key as keyof EquipmentForExport] = this.props.equipment[key as keyof Equipment]!.isCustom || this.props.equipment[key as keyof Equipment]!.type === "guild" || this.props.equipment[key as keyof Equipment]!.type === "special" ? this.props.equipment[key as keyof Equipment]! : {name: this.props.equipment[key as keyof Equipment]!.name, psychoLvl: this.props.equipment[key as keyof Equipment]!.psychoLvl, enhancements: this.props.equipment[key as keyof Equipment]!.enhancements}
        }
      }
    }
    //Creating proper URL
    return this.createShortenedUrl(buildForExport);
  }
  createShortenedUrl(build: BuildForExport) {
    let request = require("request");
    this.setState({
      showExport: true,
      exportLink: this.props.t("export-in-progress"),
    });
    request(
      {
        uri: "https://taencalc.firebaseio.com/builds.json",
        method: "POST",
        body: JSON.stringify(build),
      },
      (err: string, response: string, body: string) => {
        if (err || JSON.parse(body).error) {
          ReactDOM.render(<Alert message={this.props.t("export-error")} spinner={false} />, document.getElementById("alert")!)
        } else {
          let buildId = JSON.parse(body).name.substring(1)
          let link = "https://toolbox.taern.com/?id=" + buildId;
          this.setState({
            showExport: true,
            exportLink: link,
          });
          //Letting GA know a build was exported
          ReactGA.event({
            category: "Export",
            action: "Click",
            label: link,
          });
        }
      }
    );
  }
  copyToClipboard() {
    //Copying the URL and making sure current selection is preserved
    const el: HTMLInputElement = document.getElementById(
      "exportOutput"
    ) as HTMLInputElement;
    const selected =
      document.getSelection()!.rangeCount > 0
        ? document.getSelection()!.getRangeAt(0)
        : null;
    el.select();
    document.execCommand("copy");
    if (selected) {
      document.getSelection()!.removeAllRanges();
      document.getSelection()!.addRange(selected);
    }
    ReactDOM.render(<Alert message={this.props.t("build-copied")} spinner={false} />, document.getElementById("alert")!)
  }
  render() {
    const { t } = this.props;
    return (
      <div className={"exportBuild"}>
        <button
          className={"exportButton"}
          onClick={() => this.createUrlForExport()}
        >
          {t("Eksportuj build")}
        </button>
        <div
          className="exportLink"
          style={
            this.state.showExport ? { display: "flex" } : { display: "none" }
          }
        >
          <label htmlFor="exportOutput">{t("Link do twojego buildu")}:</label>
          <textarea
            readOnly
            id="exportOutput"
            value={this.state.exportLink}
          ></textarea>
          <button
            onClick={() => this.copyToClipboard()}
            disabled={
              this.state.exportLink === "Eksportowanie w toku..." ? true : false
            }
          >
            {t("Skopiuj do schowka")}
          </button>
        </div>
      </div>
    );
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

type StateTypes = {
  showExport: boolean;
  exportLink: string;
};

interface OwnProps {
    t(string: string): string;
}

export interface BuildForExport {
  class: string
  level: number
  skills: SkillsForExport
  equipment: EquipmentForExport
  stats: StatsForExport
  lastAccess: Date
}

export interface SkillsForExport {
  skillPts?: number
  skill1?: number
  skill2?: number
  skill3?: number
  skill4?: number
  skill5?: number
  skill6?: number
  skill7?: number
  skill8?: number
  skill9?: number
  skill10?: number
  skill11?: number
  skill12?: number
  skill13?: number
  skill14?: number
  skill15?: number
  skill16?: number
  skill17?: number
  skill18?: number
}

export interface EquipmentForExport {
  armor?: Item | ItemForExport;
  helmet?: Item | ItemForExport;
  neck?: Item | ItemForExport;
  gloves?: Item | ItemForExport;
  cape?: Item | ItemForExport;
  weapon?: Item | ItemForExport;
  shield?: Item | ItemForExport;
  pants?: Item | ItemForExport;
  belt?: Item | ItemForExport;
  ring1?: Item | ItemForExport;
  ring2?: Item | ItemForExport;
  boots?: Item | ItemForExport;
  special?: Item | ItemForExport;
}

export interface StatsForExport {
  statPts?: number
  strength?: number
  agility?: number
  power?: number
  knowledge?: number
  hp?: number
  endurance?: number
  mana?: number
}

export interface ItemForExport {
  name: string,
  psychoLvl: number,
  enhancements: Enhancements
}

//Redux

const mapStateToProps = (state: RootState) => {
  return {
    level: state.character.level,
    className: state.character.className,
    stats: state.stats,
    equipment: state.equipment,
    skills: state.skills,
  };
};

const connector = connect(mapStateToProps);

export const BuildExporter = withTranslation()(connector(ConnectedBuildExporter));
