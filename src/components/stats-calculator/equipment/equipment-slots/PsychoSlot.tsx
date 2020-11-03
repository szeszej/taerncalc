//React
import React from "react";

//Models
import { Equipment } from "../../../../store/equipment-reducer/equipment-reducer";

//Shared functionality
import { checkWhichSetsAreEquipped } from "../../../../shared/check-which-sets-are-equipped";

//Data
import { itemSets } from "../../../../data/item-sets";

export class PsychoSlot extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showOtherProperties: false,
    };
  }
  calculateOtherProperties(equipment: Equipment) {
    let setsEquipped = checkWhichSetsAreEquipped(equipment);
    let propertiesOfSets = this.checkPropertiesOfSets(setsEquipped);
    let propertiesOfEquippedItems = this.checkOtherPropertiesOfItems(equipment);
    for (let property in propertiesOfSets) {
      if (
        propertiesOfSets.hasOwnProperty(property) &&
        propertiesOfSets[property] !== 0
      ) {
        if (propertiesOfEquippedItems.hasOwnProperty(property)) {
          propertiesOfEquippedItems[property] += propertiesOfSets[property];
        } else {
          propertiesOfEquippedItems[property] = propertiesOfSets[property];
        }
      }
    }
    let propertyTypes = Object.keys(propertiesOfEquippedItems);
    let propertyParagraphs = propertyTypes.map((property) => {
      if (property === "Dodatkowe PA" || property === "Oszukać przeznaczenie") {
        return (
          <p key={property}>
            {property}: {propertiesOfEquippedItems[property]}
          </p>
        );
      } else {
        return (
          <p key={property}>
            {property}: {propertiesOfEquippedItems[property]}%
          </p>
        );
      }
    });
    return propertyParagraphs;
  }
  checkOtherPropertiesOfItems(equipment: Equipment) {
    let equipmentTypes = Object.keys(equipment);
    let equippedItems = equipmentTypes.map(
      (x) => equipment[x as keyof Equipment]
    );
    let otherPropertiesOfEquippedItems = equippedItems.reduce(
      (total: { [key: string]: number }, item) => {
        if (
          item !== null &&
          (item.rarity === "Psychorare" || item.rarity === "Epik")
        ) {
          item.otherProperties.forEach((property) => {
            if (total.hasOwnProperty(property[0])) {
              total[property[0]] +=
                property[1] + property[2] * (item.psychoLvl - 1);
            } else {
              total[property[0]] =
                property[1] + property[2] * (item.psychoLvl - 1);
            }
          });
          return total;
        } else {
          return total;
        }
      },
      {}
    );
    return otherPropertiesOfEquippedItems;
  }
  checkPropertiesOfSets(equippedSets: { [key: string]: number }) {
    let setsProperties: { [key: string]: number } = {};
    if (equippedSets) {
      for (let setName in equippedSets) {
        if (equippedSets.hasOwnProperty(setName)) {
          let set = itemSets.find((x) => x.name === setName);
          let setProperties = set!.getOtherPropertiesValuesDependingOnPiecesAsArray(
            equippedSets[setName]
          );
          setProperties.forEach((property) => {
            if (setsProperties.hasOwnProperty(property[0])) {
              setsProperties[property[0]] += property[1];
            } else {
              setsProperties[property[0]] = property[1];
            }
          });
        }
      }
    }
    return setsProperties;
  }
  render() {
    let otherPropertiesTags = this.calculateOtherProperties(
      this.props.equipment
    );
    let otherPropertiesList = (
      <div className="itemTooltip">
        <p className="propertiesHeader">Dodatkowe właściwości:</p>
        {otherPropertiesTags}
      </div>
    );
    return (
      <div
        className="otherProperties"
        onMouseEnter={() => this.setState({ showOtherProperties: true })}
        onTouchStart={() => this.setState({ showOtherProperties: true })}
        onMouseLeave={() => this.setState({ showOtherProperties: false })}
        onTouchEnd={() => this.setState({ showOtherProperties: false })}
        style={
          otherPropertiesTags.length !== 0
            ? { backgroundImage: "url(/images/other-properties-active.svg)" }
            : undefined
        }
      >
        {this.state.showOtherProperties && otherPropertiesTags.length !== 0 ? (
          otherPropertiesList
        ) : this.state.showOtherProperties ? (
          <div className="itemTooltip">
            <p className="noProperties">Podsumowanie właściwości psycho</p>
          </div>
        ) : null}
      </div>
    );
  }
}

//Types
interface Props {
  equipment: Equipment;
}

interface State {
  showOtherProperties: boolean;
}
