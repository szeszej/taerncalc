//React
import React from "react";
import ReactGA from "react-ga";

//Components
import { ItemSlot } from "./equipment-slots/ItemSlot";
import { SpecialSlot } from "./equipment-slots/SpecialSlot";
import { PsychoSlot } from "./equipment-slots/PsychoSlot";
import { GuildSlot } from "./equipment-slots/GuildSlot";
import { ItemsSearchList } from "./equipment-slots/item-display/ItemSearchList";

//Redux
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../../store/store";
import { Dispatch } from "redux";

//Actions
import {
  equipItem,
  unequipItem,
  unequipAllItems,
  changePsychoLvl,
} from "../../../../store/equipment-reducer/equipment-reducer";

//Shared functionality
import { confirmAlert } from "react-confirm-alert";
import i18n from "i18next";

//Types
import { Equipment } from "../../../../store/equipment-reducer/equipment-reducer";
import { Item } from "../../../../data/models/item.model";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedEquipment extends React.Component<PropTypes, StateTypes> {
  constructor(props: PropTypes) {
    super(props);
    this.equipItem = this.equipItem.bind(this);
    this.unequipItem = this.unequipItem.bind(this);
    this.showItemsList = this.showItemsList.bind(this);
    this.hideItemsList = this.hideItemsList.bind(this);
    this.changePsychoLvl = this.changePsychoLvl.bind(this);
    this.checkIfAnyItemIsEquipped = this.checkIfAnyItemIsEquipped.bind(this);
    this.applyItemFilters = this.applyItemFilters.bind(this);
    this.state = {
      listToDisplay: "",
      showOtherProperties: false,
      searchString: "",
      filters: {
        rare: false,
        psychoRare: false,
        set: false,
        epic: false,
        class: false,
        strength: false,
        agility: false,
        power: false,
        knowledge: false,
        hp: false,
        mana: false,
        endurance: false,
        fireRes: false,
        energyRes: false,
        frostRes: false,
        curseRes: false,
      },
    };
  }
  componentDidUpdate(prevProps: PropTypes) {
    if (prevProps.level !== this.props.level) {
      this.props.unequipItem("guild")
    }
  }
  showItemsList(type: keyof Equipment) {
    ReactGA.event({
      category: "Items",
      action: "Show List",
      label: type,
    });
    this.setState({
      listToDisplay: type,
    });
  }
  hideItemsList() {
    this.setState({
      listToDisplay: "",
    });
  }
  equipItem(item: Item, type: keyof Equipment, search?: boolean) {
    if (search) {
      ReactGA.event({
        category: "Items",
        action: "Item Search",
        label: item.name,
      });
      this.setState({ searchString: "" });
    } else {
      ReactGA.event({
        category: "Items",
        action: "Item Choice",
        label: item.name,
      });
    }
    if (type === "weapon" && item.weaponType === "Dwuręczna" && this.props.class === "knight") {
      this.props.equipItem(type, item);
      this.props.unequipItem("shield");
    } else if (
      type === "shield" &&
      this.props.equipment.weapon !== null &&
      this.props.equipment.weapon.weaponType === "Dwuręczna" &&
      this.props.class === "knight"
    ) {
      this.props.unequipItem("weapon");
      this.props.equipItem(type, item);
    } else {
      this.props.equipItem(type, item);
    }
  }
  unequipItem(slot: keyof Equipment) {
    this.props.unequipItem(slot);
  }
  changePsychoLvl(slot: keyof Equipment, value: number) {
    this.props.changePsychoLvl(slot, value);
  }
  unequipItems() {
    const { t } = this.props;
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="backdrop">
            <div className="alert-box">
              <p className="alert-text">{t("unequip-all")}</p>
              <div className="alert-box-actions">
                <button
                  className="alert-box-action"
                  onClick={() => {
                    this.props.unequipAllItems();
                    onClose();
                  }}
                >
                  {t("Tak")}
                </button>
                <button className="alert-box-action" onClick={onClose}>
                  {t("Nie")}
                </button>
              </div>
              <button className="close-button" onClick={onClose}>
                ×
              </button>
            </div>
          </div>
        );
      },
    });
  }
  checkIfAnyItemIsEquipped() {
    let isAnyItemEquipped = false;
    for (let item in this.props.equipment) {
      if (this.props.equipment.hasOwnProperty(item)) {
        isAnyItemEquipped = this.props.equipment[item as keyof Equipment]
          ? true
          : false;
        if (isAnyItemEquipped) {
          break;
        }
      }
    }
    return isAnyItemEquipped;
  }
  applyItemFilters(items: Item[]): Item[] {
    let itemsToFilter = [...items];
    let filterTypes = Object.keys(this.state.filters);
    filterTypes.forEach((filterType) => {
      if (filterType === "class") {
        itemsToFilter = this.state.filters[filterType]
          ? itemsToFilter.filter((item) => item.class === this.props.class)
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
    return itemsToFilter;
  }
  render() {
    const { t } = this.props;
    let classBackground = {
      backgroundImage: `url("images/` + this.props.class + `.svg")`,
    };
    let equipment = Object.keys(this.props.equipment);
    let equipmentSlots = equipment.filter(
      (x) => x !== "special" && x !== "guild"
    );
    let equipmentSlotComponents = equipmentSlots.map((x) => (
      <ItemSlot
        key={x}
        type={x as keyof Equipment}
        items={
          x === "ring1" || x === "ring2"
            ? this.applyItemFilters(this.props.items).filter(
                (y) =>
                  y.type === "ring" &&
                  (y.class === null || y.class === this.props.class)
              )
            : this.applyItemFilters(this.props.items).filter(
                (y) =>
                  y.type === x &&
                  (y.class === null || y.class === this.props.class)
              )
        }
        inSlot={this.props.equipment[x as keyof Equipment]}
        class={this.props.class}
        level={this.props.level}
        strength={this.props.strength}
        agility={this.props.agility}
        power={this.props.power}
        knowledge={this.props.knowledge}
        listToDisplay={this.state.listToDisplay}
        equipItem={this.equipItem}
        unequipItem={this.unequipItem}
        showItemsList={this.showItemsList}
        hideItemsList={this.hideItemsList}
        changePsychoLvl={this.changePsychoLvl}
      />
    ));
    let areAnyItemsEquipped = this.checkIfAnyItemIsEquipped();
    let filterTypes = Object.keys(this.state.filters);
    let checkBoxes = filterTypes.map((filterType) => (
      <div key={filterType} className="filterLine">
        <img
          src={"images/" + filterType + ".svg"}
          alt={filterType}
          onClick={() =>
            this.state.filters[filterType]
              ? this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.filters[filterType] = false;
                  return newState;
                })
              : this.setState((prevState) => {
                  let newState = { ...prevState };
                  ReactGA.event({
                    category: "Filters",
                    action: "Activate Filter",
                    label: filterType,
                  });
                  newState.filters[filterType] = true;
                  return newState;
                })
          }
        />
        <input
          type="checkbox"
          className="filterInput"
          name={filterType}
          value={filterType}
          onChange={() =>
            this.state.filters[filterType]
              ? this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.filters[filterType] = false;
                  return newState;
                })
              : this.setState((prevState) => {
                  let newState = { ...prevState };
                  ReactGA.event({
                    category: "Filters",
                    action: "Activate Filter",
                    label: filterType,
                  });
                  newState.filters[filterType] = true;
                  return newState;
                })
          }
          checked={this.state.filters[filterType]}
        />
        <label
          htmlFor={filterType}
          onClick={() =>
            this.state.filters[filterType]
              ? this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.filters[filterType] = false;
                  return newState;
                })
              : this.setState((prevState) => {
                  let newState = { ...prevState };
                  ReactGA.event({
                    category: "Filters",
                    action: "Activate Filter",
                    label: filterType,
                  });
                  newState.filters[filterType] = true;
                  return newState;
                })
          }
        >
          {t(filterType)}
        </label>
      </div>
    ));
    let activeFilters = filterTypes.filter(
      (filterType) => this.state.filters[filterType]
    );
    // eslint-disable-next-line
    let chosenFilters = activeFilters.map((filterType) => {
      if (this.state.filters[filterType]) {
        return (
          <div className="chosenFilter" key={filterType}>
            <p>{t(filterType)}</p>
            <button
              onClick={() =>
                this.setState((prevState) => {
                  let newState = { ...prevState };
                  newState.filters[filterType] = false;
                  return newState;
                })
              }
            ></button>
          </div>
        );
      }
    });
    let filtersCloseButton = (
      <button
        className="closeList"
        onClick={() => this.setState({ listToDisplay: "" })}
      >
        ×
      </button>
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
              class: false,
              strength: false,
              agility: false,
              power: false,
              knowledge: false,
              hp: false,
              mana: false,
              endurance: false,
              fireRes: false,
              energyRes: false,
              frostRes: false,
              curseRes: false
            },
          })
        }
      >
        {t("Resetuj")}
      </button>
    );
    return (
      <div className="equipment">
        <div className="filters">
          <div className="search">
            <img src="./images/magnifying-glass.svg" alt="search" />
            <input
              onChange={(event) =>
                this.setState({
                  searchString: event.currentTarget.value,
                  listToDisplay: "search",
                })
              }
              placeholder={t("Wpisz nazwę")}
              value={this.state.searchString}
              onClick={() => this.setState({ listToDisplay: "search" })}
            />
            {this.state.searchString &&
            this.state.listToDisplay === "search" ? (
              <ItemsSearchList
                items={this.props.items.filter((x) =>
                  this.props.i18n.language === "pl"
                    ? x.name
                        .toLowerCase()
                        .includes(this.state.searchString.toLowerCase()) &&
                      (x.class === null || x.class === this.props.class)
                    : t(x.name)
                        .toLowerCase()
                        .includes(this.state.searchString.toLowerCase()) &&
                      (x.class === null || x.class === this.props.class)
                )}
                class={this.props.class}
                level={this.props.level}
                strength={this.props.strength}
                agility={this.props.agility}
                power={this.props.power}
                knowledge={this.props.knowledge}
                isRing1Equipped={!!this.props.equipment.ring1}
                equipItem={this.equipItem}
                hideItemsList={this.hideItemsList}
              />
            ) : null}
          </div>
          <div className="filter">
            <img src="./images/funnel.svg" alt="filter" />
            <div className="filtersList">
              <div
                className="chosenFilters"
                data-placeholder={t("active-filters")}
              >
                {chosenFilters.length > 4
                  ? chosenFilters.slice(0, 4)
                  : chosenFilters}
                {chosenFilters.length > 4 ? (
                  <div className="chosenFilter manyFilters">
                    {chosenFilters.length - 4}+
                  </div>
                ) : null}
              </div>
              <button
                className="addFilter"
                onClick={() =>
                  this.state.listToDisplay === "filters"
                    ? this.setState({ listToDisplay: "" })
                    : this.setState({ listToDisplay: "filters" })
                }
              ></button>
              {this.state.listToDisplay === "filters" ? (
                <div className="itemsList filtersForm">
                  <div className="title">
                    <p>{t("add-filters")}</p>
                  </div>
                  <div className="filterLines">{checkBoxes}</div>
                  <div className="submit">
                    <button
                      onClick={() => this.setState({ listToDisplay: "" })}
                    >
                      {t("Zatwierdź")}
                    </button>
                    {filtersResetButton}
                  </div>
                  {filtersCloseButton}
                </div>
              ) : null}
            </div>
          </div>
        </div>
        {equipmentSlotComponents}
        <PsychoSlot equipment={this.props.equipment} />
        <div className="middle" style={classBackground}>
          {areAnyItemsEquipped ? (
            <button
              className="empty"
              onClick={() => this.unequipItems()}
              title={t("Zdejmij wszystkie przedmioty")}
            ></button>
          ) : null}
          <GuildSlot
            showItemsList={this.showItemsList}
            hideItemsList={this.hideItemsList}
            listToDisplay={this.state.listToDisplay}
            t={t}
            inSlot={this.props.equipment.guild}
          />
        </div>
        <SpecialSlot
          type={"special"}
          inSlot={this.props.equipment.special}
          listToDisplay={this.state.listToDisplay}
          equipItem={this.equipItem}
          unequipItem={this.unequipItem}
          showItemsList={this.showItemsList}
          hideItemsList={this.hideItemsList}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    equipment: state.equipment,
    class: state.character.className,
    level: state.character.level,
    strength: state.stats.strength,
    agility: state.stats.agility,
    power: state.stats.power,
    knowledge: state.stats.knowledge,
    items: state.items,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    equipItem: (slot: keyof Equipment, item: Item) =>
      dispatch(equipItem({ slot: slot, item: item })),
    unequipItem: (slot: keyof Equipment) =>
      dispatch(unequipItem({ slot: slot })),
    unequipAllItems: () => dispatch(unequipAllItems()),
    changePsychoLvl: (slot: keyof Equipment, value: number) =>
      dispatch(changePsychoLvl({ slot: slot, value: value })),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

export const EquipmentComponent = withTranslation()(
  connector(ConnectedEquipment)
);

//Types
type PropTypes = ConnectedProps<typeof connector> & OwnProps;

interface OwnProps {
  t(string: string): string;
  i18n: typeof i18n;
}

interface StateTypes {
  listToDisplay: keyof Equipment | "" | "search" | "filters" | "guild";
  showOtherProperties: boolean;
  searchString: string;
  filters: {
    strength: boolean;
    agility: boolean;
    power: boolean;
    knowledge: boolean;
    hp: boolean;
    mana: boolean;
    endurance: boolean;
    class: boolean;
    rare: boolean;
    psychoRare: boolean;
    set: boolean;
    epic: boolean;
    fireRes: boolean;
    energyRes: boolean;
    frostRes: boolean;
    curseRes: boolean;
    [index: string]: boolean;
  };
}
