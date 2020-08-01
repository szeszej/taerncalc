//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../store/store"

//Shared functionality
import isEquivalent from "../../shared/object-equivalency-check"

class ConnectedBuildExporter extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      showExport: false,
      exportLink: "",
    };
  }
  componentDidUpdate (prevProps: PropTypes) {
    if (!isEquivalent(prevProps, this.props)) {
      this.hideExport()
    }
  }
  hideExport() {
    this.setState({
        showExport: false,
        exportLink: ""
    });
  }
  createUrlForExport() {
    //Exporting skills
    let skillsForExport = {
      skillPts: this.props.skills.skillPts
    };
    for (let i = 1; i < 18; i++) {
      skillsForExport.skills["skill" + i] = this.props.skills["skill" + i].level;
    }
    //Final data for export
    let propertiesForUrl = {
      stats: this.props.stats,
      equipment: this.props.equipment,
      skills: skillsForExport
    };
    //Transforming properties
    let arrayOfProperties = Object.entries(propertiesForUrl);
    arrayOfProperties[0] = Object.entries(arrayOfProperties[0][1]);
    arrayOfProperties[1] = Object.entries(arrayOfProperties[1][1]);
    if (
      arrayOfProperties[1].length > 12 &&
      arrayOfProperties[1][12][0] === "special"
    ) {
      if (arrayOfProperties[1][12][1] !== null) {
        arrayOfProperties[1][12][1] = Object.entries(
          arrayOfProperties[1][12][1]
        );
        let filteredSpecialProperties = arrayOfProperties[1][12][1].filter(
          (x) =>
            x[1] != false &&
            x[1] !== null &&
            x[0] !== "type" &&
            x[0] !== "rarity"
        );
        filteredSpecialProperties.forEach((x) => (x[0] = "special" + x[0]));
        arrayOfProperties[1][12] = filteredSpecialProperties;
        arrayOfProperties[1][12].map((x) => arrayOfProperties[1].push(x));
        arrayOfProperties[1].splice(12, 1);
      }
    }
    arrayOfProperties[2] = Object.entries(arrayOfProperties[2][1]);
    let flatArrayOfProperties = arrayOfProperties.flat();
    flatArrayOfProperties.push(
      ["level", this.props.level],
      ["className", this.props.className]
    );
    let stringsForUrl = flatArrayOfProperties.map((x) => x[0] + "=" + x[1]);
    let urlString = stringsForUrl.join("&");
    let url = "https://kalkulatortaern.github.io/?" + urlString;
    let encodedUrl = encodeURI(url);
    ReactGA.event({
      category: "Export",
      action: "Click",
      label: encodedUrl,
    });
    return this.createShortenedUrl(encodedUrl);
  }
  createShortenedUrl(string: string) {
    // let request = require("request");
    // let linkRequest = {
    //   destination: string,
    //   domain: {
    //     fullName: "rebrand.ly"
    //   }
    // }
    //
    // let requestHeaders = {
    //   "Content-Type": "application/json",
    //   "apikey": "3fcba06720454d55a46ef326ca136872",
    //   "workspace": "0c11b727f3dd431aa88953e7b3b07edb"
    // }
    //
    // this.setState(
    //   {export: {
    //   showExport: true,
    //   exportLink: "Eksportowanie w toku..."
    // }})
    //
    // request({
    //     uri: "https://api.rebrandly.com/v1/links",
    //     method: "POST",
    //     body: JSON.stringify(linkRequest),
    //     headers: requestHeaders
    //   }, (err, response, body) => {
    //     if (err) {
    //       alert("Wystąpił błąd, spróbuj ponownie później!");
    //     } else {
    //       let link = JSON.parse(body);
    //       if (link.shortUrl) {
    this.setState({
        showExport: true,
        exportLink: string,
    });
    //       } else {
    //         alert("Wystąpił błąd, spróbuj ponownie później!");
    //       }
    //     }
    //   })
  }
  copyToClipboard() {
    const el = document.getElementById("exportOutput"); // Create a <textarea> element
    const selected =
      document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : null; // Mark as false to know no selection existed before
    el.select(); // Select the <textarea> content
    document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
    if (selected) {
      // If a selection existed before copying
      document.getSelection().removeAllRanges(); // Unselect everything on the HTML document
      document.getSelection().addRange(selected); // Restore the original selection
    }
    alert(
      "Adres buildu skopiowany do schowka! Użyj Ctrl+V, aby wkleić go gdzie chcesz!"
    );
  }
  render() {
    console.log(typeof this.props)
    return (
      <div>
        <button
          className={"exportButton"}
          onClick={() => this.createUrlForExport()}
        >
          Eksportuj build{" "}
        </button>
        <div
          className="exportLink"
          style={this.state.showExport ? null : { display: "none" }}
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
              this.state.exportLink === "Eksportowanie w toku..."
                ? true
                : false
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
type PropTypes = ConnectedProps<typeof connector>

type StateTypes = {
  showExport: boolean,
  exportLink: string
}

const mapStateToProps = (state: RootState) => {
  return {
    level: state.character.level,
    className: state.character.className,
    stats: state.stats,
    equipment: state.equipment,
    skills: state.skills
  };
};

const connector = connect(mapStateToProps)

export const BuildExporter = connector(ConnectedBuildExporter);
