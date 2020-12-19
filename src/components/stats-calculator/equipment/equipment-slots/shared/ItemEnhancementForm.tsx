//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";

//Action creators
import {
  enhanceItem,
  Equipment,
} from "../../../../../store/equipment-reducer/equipment-reducer";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemEnhancementForm extends React.Component<
  PropTypes,
  StateTypes
> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      properties: [
        {
          property: "placeholder",
          value: 0,
        },
      ],
      propertiesUsed: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.addNewSelect = this.addNewSelect.bind(this);
    this.enhanceItem = this.enhanceItem.bind(this);
  }
  //If item enhancements already exist
  componentDidMount() {
    let areEnhancementsPresent: boolean = false;
    if (this.props.enhancements) {
      for (const key in this.props.enhancements) {
        if (this.props.enhancements.hasOwnProperty(key)) {
          if (this.props.enhancements && this.props.enhancements[key as keyof Enhancements] !== 0) {
            areEnhancementsPresent = true;
            this.setState((prevState) => {
              let newState = { ...prevState };
              newState.properties.push({
                property: key,
                value: this.props.enhancements![key as keyof Enhancements],
              });
              return newState;
            });
          }
        }
      }
      if (areEnhancementsPresent) {
        this.setState((prevState) => {
          let newState = { ...prevState };
          newState.properties.shift();
          return newState;
        });
      }
    }
  }
  //Creating a new item to add to the database
  enhanceItem(): void {
    let enhancements: Enhancements = {
      strength: 0,
      agility: 0,
      power: 0,
      knowledge: 0,
      hp: 0,
      mana: 0,
      endurance: 0,
      damage: 0,
    };
    if (!this.state.properties.every((x) => x.property === "placeholder")) {
      //Fix the line below?
      this.state.properties.forEach((x) => {
        if (x.property !== "placeholder" && x.value !== null) {
          enhancements[x.property as keyof Enhancements] = x.value;
        }
      });
      this.props.enhanceItem(this.props.type, enhancements);
      this.props.closeForm();
    } else {
      window.alert("Nie określono żadnych parametrów niezerowych!");
    }
  }
  //Needed to prevent bubbling
  handleClick(event: React.FormEvent, functionToRun: () => void): void {
    event.stopPropagation();
    event.preventDefault();
    functionToRun();
  }
  //Handling numeric inputs
  handleChange(value: number, index: number): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties[index].value = value;
      return newState;
    });
  }
  //Handling selects
  handleSelect(value: string, index: number): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties[index].property = value;
      newState.propertiesUsed.push(value);
      return newState;
    });
  }
  //Adding a new line to the form
  addNewSelect(): void {
    this.setState((currentState) => {
      let newState = { ...currentState };
      newState.properties.push({
        property: "placeholder",
        value: null,
      });
      return newState;
    });
  }
  render() {
    const { t } = this.props
    let closeButton = (
      <button
        className="closeList"
        onClick={(event) => this.handleClick(event, this.props.closeForm)}
      >
        ×
      </button>
    );
    let properties =
      this.props.type === "weapon"
        ? [
            "strength",
            "agility",
            "power",
            "knowledge",
            "hp",
            "mana",
            "endurance",
            "damage",
          ]
        : [
            "strength",
            "agility",
            "power",
            "knowledge",
            "hp",
            "mana",
            "endurance",
          ];
    let options = [
      <option
        key="placeholder"
        disabled
        value="placeholder"
        className="placeholder"
      >
        {t("Wybierz parametr")}
      </option>,
    ];
    properties.forEach((x) =>
      options.push(
        <option
          key={x}
          value={x}
          disabled={this.state.propertiesUsed.includes(x)}
        >
          {t(x)}
        </option>
      )
    );
    let propertySelects = this.state.properties.map((x, index) => (
      <div className="property" key={index}>
        <select
          required
          value={x.property}
          onChange={(event) =>
            this.handleSelect(event.currentTarget.value, index)
          }
        >
          {options}
        </select>
        <input
          value={x.value ? x.value : undefined}
          onChange={(event) =>
            this.handleChange(+event.currentTarget.value, index)
          }
          placeholder={t("Wartość")}
          type="number"
          min={-999}
          max={999}
        ></input>
        <button
          onClick={(event) => this.handleClick(event, this.addNewSelect)}
          className="addProperty"
        ></button>
      </div>
    ));
    return (
      <form
        onSubmit={(event) => this.handleClick(event, this.enhanceItem)}
        className="itemsList addItemForm enhanceForm"
        onClick={(event) => {
          event.stopPropagation();
        }}
        onMouseEnter={(event) => {
          event.stopPropagation();
        }}
      >
        <div className={"title"}>
          <p>{t("change-stats-1")}</p>
          <p className="subtitle">
            {t("change-stats-2")}
          </p>
        </div>
        <div className={"propertyList"}>
          {propertySelects}
          <div className="submit">
            <button type="submit">{t("Zatwierdź")}</button>
          </div>
        </div>
        {closeButton}
      </form>
    );
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  type: keyof Equipment;
  enhancements: Enhancements | null;
  closeForm(): void;
  t(string: string): string;
}

interface StateTypes {
  properties: { property: string; value: number | null }[];
  propertiesUsed: string[];
}

interface Enhancements {
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  hp: number;
  mana: number;
  endurance: number;
  damage: number;
}

//Redux
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    enhanceItem: (slot: keyof Equipment, enhancements: Enhancements) =>
      dispatch(enhanceItem({ slot: slot, enhancements: enhancements })),
  };
};

const connector = connect(null, mapDispatchToProps);

export const ItemEnhancementForm = withTranslation()(connector(ConnectedItemEnhancementForm));
