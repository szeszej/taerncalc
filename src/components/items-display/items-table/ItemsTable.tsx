//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemLine } from "./item-line/ItemLine";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../store/store";

//Shared functionality
import i18n from "i18next";

//Types
import { Item } from "../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemsTable extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.applyItemFilters = this.applyItemFilters.bind(this);
    this.state = {
      searchString: "",
      showRarityFilters: false,
      filters: {
        rare: false,
        psychoRare: false,
        set: false,
        epic: false,
        class: "",
        strength: 0,
        agility: 0,
        power: 0,
        knowledge: 0,
        hp: 0,
        mana: 0,
        endurance: 0,
        fireRes: 0,
        energyRes: 0,
        frostRes: 0,
        curseRes: 0,
      },
    };
  }
  applyItemFilters(items: Item[]): Item[] {
    let itemsToFilter = [...items];
    let filterTypes = Object.keys(this.state.filters);
    filterTypes.forEach((filterType) => {
      if (filterType === "class") {
        itemsToFilter = this.state.filters[filterType]
          ? itemsToFilter.filter(
              (item) => item.class === this.state.filters.class
            )
          : itemsToFilter;
      } else if (
        !(
          this.state.filters.set ||
          this.state.filters.psychoRare ||
          this.state.filters.rare ||
          this.state.filters.epic
        )
      ) {
        itemsToFilter = this.state.filters[filterType]
          ? itemsToFilter.filter((item) => item[filterType as keyof Item]! > 0)
          : itemsToFilter;
      }
    });
    if (
      this.state.filters.set ||
      this.state.filters.psychoRare ||
      this.state.filters.rare ||
      this.state.filters.epic
    ) {
      itemsToFilter = itemsToFilter.filter((item) => {
        if (this.state.filters.set && item.set) {
          return true;
        } else if (
          this.state.filters.psychoRare &&
          item.rarity === "Psychorare"
        ) {
          return true;
        } else if (this.state.filters.rare && item.rarity === "Rzadki") {
          return true;
        } else if (this.state.filters.epic && item.rarity === "Epik") {
          return true;
        } else {
          return false;
        }
      });
    }
    return itemsToFilter.filter((x) =>
      this.props.i18n.language === "pl"
        ? x.name.toLowerCase().includes(this.state.searchString.toLowerCase())
        : this.props
            .t(x.name)
            .toLowerCase()
            .includes(this.state.searchString.toLowerCase())
    );
  }
  render() {
    const { t } = this.props;
    let raritySelectCheckboxes = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() => this.setState((prevState) => { return {showRarityFilters: !prevState.showRarityFilters} })}
          >
            <select>
              <option>{t("Rzadkość")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.showRarityFilters ? (
            <div id="checkboxes">
              <label htmlFor="one">
                <input type="checkbox" id="one" />
                {t("Rzadki")}
              </label>
              <label htmlFor="two">
                <input type="checkbox" id="two" />
                {t("Psychorare")}
              </label>
              <label htmlFor="three">
                <input type="checkbox" id="three" />
                {t("Zestaw")}
              </label>
              <label htmlFor="three">
                <input type="checkbox" id="three" />
                {t("Epik")}
              </label>
            </div>
          ) : null}
        </div>
      </form>
    );
    let filtersResetButton = (
      <button
        className="resetFilters"
        onClick={() =>
          this.setState({
            filters: {
              rare: false,
              psychoRare: false,
              set: false,
              epic: false,
              class: "",
              strength: 0,
              agility: 0,
              power: 0,
              knowledge: 0,
              hp: 0,
              mana: 0,
              endurance: 0,
              fireRes: 0,
              energyRes: 0,
              frostRes: 0,
              curseRes: 0,
            },
          })
        }
      >
        {t("Resetuj")}
      </button>
    );
    return (
      <div className="itemsTable">
        <div className="filters">
          <div className="search">
            <img src="./images/magnifying-glass.svg" alt="search" />
            <input
              onChange={(event) =>
                this.setState({
                  searchString: event.currentTarget.value,
                })
              }
              placeholder={t("Wpisz nazwę")}
              value={this.state.searchString}
            />
          </div>
          <div className="filter">
            <img src="./images/funnel.svg" alt="filter" />
            <div className="filtersList">{raritySelectCheckboxes}</div>
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td className="image">{t("Obrazek")}</td>
              <td className="name">{t("Nazwa")}</td>
              <td className="type">{t("Typ")}</td>
              <td className="requirements">{t("Wymagania")}</td>
              <td className="attributes">{t("Statystyki")}</td>
              <td className="psycho">{t("Psychowłaściwości")}</td>
            </tr>
            {this.applyItemFilters(this.props.items).map((item) => (
              <ItemLine item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    items: state.items,
  };
};

const connector = connect(mapStateToProps);

export const ItemsTable = withTranslation()(connector(ConnectedItemsTable));

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  t(string: string): string;
  i18n: typeof i18n;
}

interface StateTypes {
  searchString: string;
  showRarityFilters: boolean;
  filters: {
    strength: number;
    agility: number;
    power: number;
    knowledge: number;
    hp: number;
    mana: number;
    endurance: number;
    class: string;
    rare: boolean;
    psychoRare: boolean;
    set: boolean;
    epic: boolean;
    fireRes: number;
    energyRes: number;
    frostRes: number;
    curseRes: number;
    [index: string]: boolean | number | string;
  };
}
