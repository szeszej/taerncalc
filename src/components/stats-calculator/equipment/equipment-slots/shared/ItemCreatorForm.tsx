//React
import React from "react";

//Redux
import { connect, ConnectedProps } from "react-redux";
import store from "../../../../../store/store";

//Action creators
import { addItem } from "../../../../../store/items-reducer/items-reducer";

//Models
import { Item } from "../../../../../data/models/item.model.js"

//Shared functionality
import translateProperty from "../../../../../shared/translate-property"

class ConnectedItemCreatorForm extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.state = {
      name: "",
      strength: 0,
      agility: 0,
      power: 0,
      knowledge: 0,
      hp: 0,
      endurance: 0,
      mana: 0,
      damage: 0,
      fireRes: 0,
      frostRes: 0,
      energyRes: 0,
      curseRes: 0,
      pierceRes: 0,
      cutRes: 0,
      bluntRes: 0,
    };
  }
  createItem() {
    let customItem = new Item({...this.state, image: this.props.image, type: this.props.type});
  }
  handleClick(event: React.FormEvent, functionToRun: () => void) {
    event.stopPropagation();
    functionToRun();
  }
  handleChangeString(event: React.FormEvent<HTMLInputElement>, property: keyof StateTypes) {
    this.setState((currentState) => ({...currentState, [property]: event.currentTarget.value }));
  }
  handleChangeNumeric(event: React.SyntheticEvent<HTMLInputElement>, property: keyof StateTypes): void {
    if (Number.isInteger(parseInt(event.currentTarget.value))) {
      this.setState((currentState) => ({...currentState, [property]: parseInt(event.currentTarget.value)}));
    } else {
      this.setState((currentState) => ({...currentState, [property]: 0 }));
    }
  }
  render() {
    let closeButton = (
      <button
        className="closeList"
        onClick={event => this.handleClick(event, this.props.closeForm)}
      >
        ×
      </button>
    );
    let properties = Object.keys(this.state);
    let filteredProperties = properties.filter(
      x =>
        x !== "name"
    );
    let propertyInputs = filteredProperties.map(x => (
      <div key={x} className="property">
        <p>{translateProperty(x)}:</p>
        <input
          type="number"
          min={-999}
          max={999}
          placeholder={translateProperty(x)}
          value={this.state[x as keyof StateTypes] === 0 ? "" : this.state[x as keyof StateTypes]}
          onChange={event => this.handleChangeNumeric(event, x as keyof StateTypes)}
        ></input>
      </div>
    ));
    return (
      <form onSubmit={this.createItem} className={"itemsList"}>
        <div className={"title"}>
          <p>Tutaj możesz stworzyć własny przedmiot</p>
        </div>
        <div className={"propertyList"}>
          <div
            className="property"
          >
            <p>Nazwa: </p>
            <input
              className="textInput"
              type="text"
              maxLength={30}
              placeholder="Wpisz nazwę"
              value={this.state.name}
              onChange={event => this.handleChangeString(event, "name")}
            ></input>
          </div>
          {propertyInputs}
          <div className="submit">
            <input
              type="submit"
              value="Zatwierdź"
            ></input>
          </div>
        </div>
        {closeButton}
      </form>
    )
  }
}

//Types
type PropTypes = ConnectedProps<typeof connector>  & OwnProps;

interface OwnProps {
  type: string
  image: string
  closeForm(): void
}

interface StateTypes {
  name: string;
  strength: number;
  agility: number;
  power: number;
  knowledge: number;
  hp: number;
  endurance: number;
  mana: number;
  damage: number;
  fireRes: number;
  frostRes: number;
  energyRes: number;
  curseRes: number;
  pierceRes: number;
  cutRes: number;
  bluntRes: number
}

//Redux
const mapDispatchToProps = (dispatch: typeof store.dispatch) => {
  return {
    addItem: (item: Item) => dispatch(addItem({item: item})),
  }
}

const connector = connect(mapDispatchToProps);

export const ItemCreatorForm = connector(ConnectedItemCreatorForm);
