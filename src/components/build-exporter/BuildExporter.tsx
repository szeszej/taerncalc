//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store";

//Shared functionality
import isEquivalent from "../../shared/object-equivalency-check";

//Types
import { SkillSet } from "../../data/models/skill-set.model";
import { Item } from "../../data/models/item.model";
import { StatsState } from "../../store/stats-reducer/stats-reducer";
import { Equipment } from "../../store/equipment-reducer/equipment-reducer";

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
    let propertiesForUrl: [string, number | string][] = [];
    //Transforming skills
    if (this.props.skills.skillPts !== this.props.level * 2 - 2) {
      propertiesForUrl.push(["skillPts", this.props.skills.skillPts]);
    }
    const numberOfSkills: number = 18;
    for (let i = 1; i < numberOfSkills; i++) {
      if (
        this.props.skills.skillSet[("skill" + i) as keyof SkillSet].level !==
        this.props.skills.skillSet[("skill" + i) as keyof SkillSet].minLvl
      ) {
        propertiesForUrl.push([
          "skill" + i,
          this.props.skills.skillSet[("skill" + i) as keyof SkillSet].level,
        ]);
      }
    }
    //Transforming stats
    for (let key in this.props.stats) {
      if (this.props.stats.hasOwnProperty(key)) {
        if (key === "statPts") {
          if (this.props.stats.statPts !== this.props.level * 4 + 1) {
            propertiesForUrl.push([key, this.props.stats.statPts]);
          }
        }
        if (
          (["hp", "endurance", "mana"].includes(key) &&
            this.props.stats[key as keyof StatsState] !== 200) ||
          (["strength", "agility", "power", "knowledge"].includes(key) &&
            this.props.stats[key as keyof StatsState] !== 10)
        ) {
          propertiesForUrl.push([
            key,
            this.props.stats[key as keyof StatsState],
          ]);
        }
      }
    }
    //Transforming equipment
    for (const key in this.props.equipment) {
      if (this.props.equipment.hasOwnProperty(key)) {
        if (this.props.equipment[key as keyof Equipment] !== null) {
          if (key === "special") {
            //Special slot requires special treatment
            for (const itemProperty in this.props.equipment.special) {
              if (
                this.props.equipment.special.hasOwnProperty(itemProperty) &&
                itemProperty !== "type" &&
                itemProperty !== "rarity" &&
                itemProperty !== "otherProperties"
              ) {
                let itemPropertyValue = this.props.equipment.special[
                  itemProperty as keyof Item
                ];
                if (!!itemPropertyValue) {
                  propertiesForUrl.push([
                    "special" + itemProperty,
                    itemPropertyValue,
                  ]);
                }
              }
            }
          } else {
            //Normal slot
            propertiesForUrl.push([
              key,
              this.props.equipment[key as keyof Equipment]!.name,
            ]);
          }
        }
      }
    }
    //Transforming character
    propertiesForUrl.push(
      ["level", this.props.level],
      ["className", this.props.className]
    );
    //Creating proper URL
    let stringsForUrl: string[] = propertiesForUrl.map(
      (x) => x[0] + "=" + x[1]
    );
    let urlProperties = stringsForUrl.join("&");
    let url = "https://kalkulatortaern.github.io/?" + urlProperties;
    let encodedUrl = encodeURI(url);
    //Letting GA know a build was exported
    ReactGA.event({
      category: "Export",
      action: "Click",
      label: encodedUrl,
    });
    return this.createShortenedUrl(encodedUrl);
  }
  createShortenedUrl(string: string) {
    let request = require("request");
    this.setState({
      showExport: true,
      exportLink: "Eksportowanie w toku...",
    });

    request(
      {
        uri: "https://taencalc.firebaseio.com/builds.json",
        method: "POST",
        body: JSON.stringify(string),
      },
      (err: any, response: any, body: any) => {
        if (err) {
          console.log(err);
          alert("Wystąpił błąd, spróbuj ponownie później!");
        } else {
          console.log(body);
          let buildId = JSON.parse(body).name.substring(1)
          let link = "http://localhost:3000/?id=" + buildId;
          this.setState({
            showExport: true,
            exportLink: link,
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
    alert(
      "Adres buildu skopiowany do schowka! Użyj Ctrl+V, aby wkleić go gdzie chcesz!"
    );
  }
  render() {
    return (
      <div className={"exportBuild"}>
        <button
          className={"exportButton"}
          onClick={() => this.createUrlForExport()}
        >
          Eksportuj build{" "}
        </button>
        <div
          className="exportLink"
          style={
            this.state.showExport ? { display: "flex" } : { display: "none" }
          }
        >
          <label htmlFor="exportOutput">Link do twojego buildu:</label>
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
            Skopiuj do schowka
          </button>
        </div>
      </div>
    );
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector>;

type StateTypes = {
  showExport: boolean;
  exportLink: string;
};

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

export const BuildExporter = connector(ConnectedBuildExporter);