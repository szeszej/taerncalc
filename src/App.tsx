//React
import React from "react";
import ReactGA from "react-ga";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

//Components
import { Intro } from "./components/Intro";
import { Calculator } from "./components/Calculator";

//Shared functionality
import { confirmNewBuildCreation } from "./shared/new-build-confirmation";

//Actions
import { initializeCharacter } from "./store/character-reducer/character-reducer";

export class ConnectedApp extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      charClass: "",
      charLevel: "",
      isCalculatorGenerated: false,
    };
    this.generateCalculator = this.generateCalculator.bind(this);
  }
  componentDidMount() {
    if (this.props.isBuildImported) {
      this.setState({ isCalculatorGenerated: true });
    }
  }
  generateCalculator(): void {
    ReactGA.event({
      category: "Form",
      action: "Submit",
      label: this.state.charClass + " " + this.state.charLevel,
    });
    this.props.initializeCharacter(this.state.charClass, +this.state.charLevel);
    this.setState({isCalculatorGenerated: true})
  }
  render() {
    return (
      <div className="calculator">
        <div id="classLvlWrapper">
          <form
            id="classLvl"
            onSubmit={(event) => {
              event.preventDefault();
              if (this.state.isCalculatorGenerated) {
                confirmNewBuildCreation(this.generateCalculator);
              } else {
                this.generateCalculator();
              }
            }}
          >
            <select
              id="charClass"
              required
              onChange={(event) =>
                this.setState({ charClass: event.currentTarget.value })
              }
            >
              <option disabled defaultValue="" className="placeholder">
                Wybierz klasę
              </option>
              <option value="barbarian">Barbarzyńca</option>
              <option value="knight">Rycerz</option>
              <option value="sheed">Sheed</option>
              <option value="druid">Druid</option>
              <option value="firemage">Mag Ognia</option>
              <option value="archer">Łucznik</option>
              <option value="voodoo">VooDoo</option>
            </select>
            <input
              type="number"
              min="1"
              max="140"
              placeholder="Poziom postaci"
              id="charLvl"
              required
              onChange={(event) =>
                this.setState({ charLevel: event.currentTarget.value })
              }
            />
            <input className="submit" type="submit" value="Zatwierdź" />
          </form>
        </div>
        <div id="calc">
          {this.state.isCalculatorGenerated ? <Calculator /> : <Intro />}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    initializeCharacter: (className: string, level: number) =>
      dispatch(initializeCharacter({ className: className, level: level })),
  };
};

const connector = connect(null, mapDispatchToProps);

export const App = connector(ConnectedApp);

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface StateTypes {
  charClass: string;
  charLevel: string;
  isCalculatorGenerated: boolean;
}

interface OwnProps {
  isBuildImported: boolean;
}
