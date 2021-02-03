//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemLine } from "./item-line/ItemLine";

//Shared functionality
import i18n from "i18next";

//Types
import { Item } from "../../../data/models/item.model";
import itemsDatabase from "../../../data/items";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedItemsTable extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.applyItemFilters = this.applyItemFilters.bind(this);
    this.state = {
      searchString: "",
      listToShow: "",
      sort: "",
      filters: {
        rare: false,
        psychoRare: false,
        set: false,
        epic: false,
        barbarian: false,
        knight: false,
        sheed: false,
        druid: false,
        firemage: false,
        archer: false,
        voodoo: false,
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
        armor: false,
        helmet: false,
        neck: false,
        gloves: false,
        cape: false,
        weapon: false,
        shield: false,
        pants: false,
        belt: false,
        ring: false,
        boots: false
      },
    };
  }
  applyItemFilters(items: Item[]): Item[] {
    let itemsToFilter = [...items];
    const attributes = [
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    attributes.forEach((filterType) => {
      itemsToFilter = this.state.filters[filterType]
        ? itemsToFilter.filter((item) => item[filterType as keyof Item]! > 0)
        : itemsToFilter;
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
    if (
      this.state.filters.barbarian ||
      this.state.filters.knight ||
      this.state.filters.sheed ||
      this.state.filters.druid ||
      this.state.filters.firemage ||
      this.state.filters.archer ||
      this.state.filters.voodoo
    ) {
      itemsToFilter = itemsToFilter.filter((item) => {
        if (this.state.filters.barbarian && item.class === "barbarian") {
          return true;
        } else if (this.state.filters.knight && item.class === "knight") {
          return true;
        } else if (this.state.filters.sheed && item.class === "sheed") {
          return true;
        } else if (this.state.filters.druid && item.class === "druid") {
          return true;
        } else if (this.state.filters.firemage && item.class === "firemage") {
          return true;
        } else if (this.state.filters.archer && item.class === "archer") {
          return true;
        } else if (this.state.filters.voodoo && item.class === "voodoo") {
          return true;
        } else {
          return false;
        }
      });
    }
    if (
      this.state.filters.armor ||
      this.state.filters.helmet ||
      this.state.filters.neck ||
      this.state.filters.gloves ||
      this.state.filters.cape ||
      this.state.filters.weapon ||
      this.state.filters.shield ||
      this.state.filters.pants ||
      this.state.filters.belt ||
      this.state.filters.ring ||
      this.state.filters.boots
    ) {
      itemsToFilter = itemsToFilter.filter((item) => {
        if (this.state.filters.armor && item.type === "armor") {
          return true;
        } else if (this.state.filters.helmet && item.type === "helmet") {
          return true;
        } else if (this.state.filters.neck && item.type === "neck") {
          return true;
        } else if (this.state.filters.gloves && item.type === "gloves") {
          return true;
        } else if (this.state.filters.cape && item.type === "cape") {
          return true;
        } else if (this.state.filters.weapon && item.type === "weapon") {
          return true;
        } else if (this.state.filters.shield && item.type === "shield") {
          return true;
        } else if (this.state.filters.pants && item.type === "pants") {
          return true;
        } else if (this.state.filters.belt && item.type === "belt") {
          return true;
        } else if (this.state.filters.ring && item.type === "ring") {
          return true;
        } else if (this.state.filters.boots && item.type === "boots") {
          return true;
        } else {
          return false;
        }
      });
    }
    itemsToFilter = this.state.sort
      ? itemsToFilter.sort((a, b) => b[this.state.sort] - a[this.state.sort])
      : itemsToFilter;
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
    const rarities = ["rare", "psychoRare", "set", "epic"];
    const raritySelectCheckboxes = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() =>
              this.setState((prevState) => {
                return {
                  listToShow: prevState.listToShow === "rarity" ? "" : "rarity",
                };
              })
            }
          >
            <select>
              <option>{t("Rzadkość")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.listToShow === "rarity" ? (
            <div id="checkboxes">
              {rarities.map((rarity) => (
                <div
                  key={rarity}
                  onChange={() =>
                    this.setState((prevState) => {
                      let newState = { ...prevState };
                      ReactGA.event({
                        category: "Items Display",
                        action: "Activate Filter",
                        label: rarity,
                      });

                      newState.filters[rarity] = !prevState.filters[rarity];
                      return newState;
                    })
                  }
                >
                  <label htmlFor={rarity}>
                    <input
                      type="checkbox"
                      id={rarity}
                      checked={!!this.state.filters[rarity]}
                      onChange={() => {}}
                    />
                    {t(rarity)}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    );
    const attributes = [
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    const attributeSelectCheckboxes = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() =>
              this.setState((prevState) => {
                return {
                  listToShow:
                    prevState.listToShow === "attributes" ? "" : "attributes",
                };
              })
            }
          >
            <select>
              <option>{t("Atrybut")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.listToShow === "attributes" ? (
            <div id="checkboxes">
              {attributes.map((attribute) => (
                <div
                  key={attribute}
                  onChange={() =>
                    this.setState((prevState) => {
                      let newState = { ...prevState };
                      ReactGA.event({
                        category: "Items Display",
                        action: "Activate Filter",
                        label: attribute,
                      });

                      newState.filters[attribute] = !prevState.filters[
                        attribute
                      ];
                      return newState;
                    })
                  }
                >
                  <label htmlFor={attribute}>
                    <input
                      type="checkbox"
                      id={attribute}
                      checked={!!this.state.filters[attribute]}
                      onChange={() => {}}
                    />
                    {t(attribute)}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    );
    const classes = [
      "barbarian",
      "knight",
      "sheed",
      "druid",
      "firemage",
      "archer",
      "voodoo",
    ];
    const classSelectCheckboxes = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() =>
              this.setState((prevState) => {
                return {
                  listToShow: prevState.listToShow === "class" ? "" : "class",
                };
              })
            }
          >
            <select>
              <option>{t("Klasa")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.listToShow === "class" ? (
            <div id="checkboxes">
              {classes.map((className) => (
                <div
                  key={className}
                  onChange={() =>
                    this.setState((prevState) => {
                      let newState = { ...prevState };
                      ReactGA.event({
                        category: "Items Display",
                        action: "Activate Filter",
                        label: className,
                      });

                      newState.filters[className] = !prevState.filters[
                        className
                      ];
                      return newState;
                    })
                  }
                >
                  <label htmlFor={className}>
                    <input
                      type="checkbox"
                      id={className}
                      checked={!!this.state.filters[className]}
                      onChange={() => {}}
                    />
                    {t(className)}
                  </label>
                </div>
              ))}
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
            sort: "",
            filters: {
              rare: false,
              psychoRare: false,
              set: false,
              epic: false,
              barbarian: false,
              knight: false,
              sheed: false,
              druid: false,
              firemage: false,
              archer: false,
              voodoo: false,
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
              armor: false,
              helmet: false,
              neck: false,
              gloves: false,
              cape: false,
              weapon: false,
              shield: false,
              pants: false,
              belt: false,
              ring: false,
              boots: false
            },
          })
        }
      >
        {t("Resetuj")}
      </button>
    );
    const sortTypes = [
      "reqLvl",
      "strength",
      "agility",
      "power",
      "knowledge",
      "hp",
      "mana",
      "endurance",
      "fireRes",
      "energyRes",
      "frostRes",
      "curseRes",
    ];
    const sortChoice = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() =>
              this.setState((prevState) => {
                return {
                  listToShow: prevState.listToShow === "sort" ? "" : "sort",
                };
              })
            }
          >
            <select>
              <option>{t("Sortowanie")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.listToShow === "sort" ? (
            <div id="checkboxes">
              {sortTypes.map((sort) => (
                <div key={sort}>
                  <label htmlFor={sort}>
                    <input
                      type="radio"
                      value={sort}
                      name="sort"
                      id={sort}
                      checked={this.state.sort === sort}
                      onChange={(event) =>
                        this.setState({ sort: event.currentTarget.value })
                      }
                    />
                    {t(sort)}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </form>
    );
    const equipmentTypes = [
      "armor",
      "helmet",
      "neck",
      "gloves",
      "cape",
      "weapon",
      "shield",
      "pants",
      "belt",
      "ring",
      "boots",
    ];
    const equipmentSelectCheckboxes = (
      <form>
        <div className="multiselect">
          <div
            className="selectBox"
            onClick={() =>
              this.setState((prevState) => {
                return {
                  listToShow:
                    prevState.listToShow === "equipment" ? "" : "equipment",
                };
              })
            }
          >
            <select>
              <option>{t("Rodzaj")}</option>
            </select>
            <div className="overSelect"></div>
          </div>
          {this.state.listToShow === "equipment" ? (
            <div id="checkboxes">
              {equipmentTypes.map((equipmentType) => (
                <div
                  key={equipmentType}
                  onChange={() =>
                    this.setState((prevState) => {
                      let newState = { ...prevState };
                      ReactGA.event({
                        category: "Items Display",
                        action: "Activate Filter",
                        label: equipmentType,
                      });
                      newState.filters[equipmentType] = !prevState.filters[
                        equipmentType
                      ];
                      return newState;
                    })
                  }
                >
                  <label htmlFor={equipmentType}>
                    <input
                      type="checkbox"
                      id={equipmentType}
                      checked={!!this.state.filters[equipmentType]}
                      onChange={() => {}}
                    />
                    {t(equipmentType)}
                  </label>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </form>
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
            <div className="filtersList">
              {equipmentSelectCheckboxes}
              {raritySelectCheckboxes}
              {attributeSelectCheckboxes}
              {classSelectCheckboxes}
            </div>
          </div>
          <div className="filter sort">
            <img src="./images/sort.svg" alt="filter" />
            <div className="filtersList">{sortChoice}</div>
          </div>
          {filtersResetButton}
        </div>
        <table>
          <tbody>
            <tr>
              <td className="image">{t("Obrazek")}</td>
              <td className="name">{t("Nazwa")}</td>
              <td className="type">{t("Rodzaj")}</td>
              <td className="requirements">{t("Wymagania")}</td>
              <td className="attributes">{t("Statystyki")}</td>
              <td className="psycho">{t("Psychowłaściwości")}</td>
            </tr>
            {this.applyItemFilters(itemsDatabase).map((item) => (
              <ItemLine key={item.name} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export const ItemsTable = withTranslation()(ConnectedItemsTable);

interface PropTypes {
  t(string: string): string;
  i18n: typeof i18n;
}

interface StateTypes {
  searchString: string;
  listToShow: string;
  sort: string;
  filters: {
    barbarian: boolean;
    knight: boolean;
    sheed: boolean;
    druid: boolean;
    firemage: boolean;
    archer: boolean;
    voodoo: boolean;
    strength: number;
    agility: number;
    power: number;
    knowledge: number;
    hp: number;
    mana: number;
    endurance: number;
    rare: boolean;
    psychoRare: boolean;
    set: boolean;
    epic: boolean;
    fireRes: number;
    energyRes: number;
    frostRes: number;
    curseRes: number;
    armor: boolean;
    helmet: boolean;
    neck: boolean;
    gloves: boolean;
    cape: boolean;
    weapon: boolean;
    shield: boolean;
    pants: boolean;
    belt: boolean;
    ring: boolean;
    boots: boolean;
    [index: string]: boolean | number | string;
  };
}
