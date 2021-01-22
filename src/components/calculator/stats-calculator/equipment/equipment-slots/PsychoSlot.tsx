//React
import React from "react";

//Models
import { Equipment } from "../../../../../store/equipment-reducer/equipment-reducer";

//Shared functionality
import { calculateOtherProperties } from "../../../../../shared/calculate-other-properties";

//i18l
import { withTranslation } from "react-i18next";

class ConnectedPsychoSlot extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showOtherProperties: false,
    };
  }
  calculateOtherProperties(equipment: Equipment) {
    const { t } = this.props
    let propertiesOfEquippedItems = calculateOtherProperties(equipment);
    let propertyTypes = Object.keys(propertiesOfEquippedItems);
    let propertyParagraphs = propertyTypes.map((property) => {
      if (property === "Dodatkowe PA" || property === "Oszukać przeznaczenie") {
        return (
          <p key={property}>
            {t(property)}: {propertiesOfEquippedItems[property]}
          </p>
        );
      } else {
        return (
          <p key={property}>
            {t(property)}: {propertiesOfEquippedItems[property] > 0 ? "+" + propertiesOfEquippedItems[property] : propertiesOfEquippedItems[property]}%
          </p>
        );
      }
    });
    return propertyParagraphs;
  }
  render() {
    const { t } = this.props
    let otherPropertiesTags = this.calculateOtherProperties(
      this.props.equipment
    );
    let otherPropertiesList = (
      <div className="itemTooltip">
        <p className="propertiesHeader">{t("Dodatkowe właściwości")}:</p>
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
            <p className="noProperties">{t("psycho-summary")}</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export const PsychoSlot = withTranslation()(ConnectedPsychoSlot)

//Types
interface Props {
  equipment: Equipment;
  t(string: string): string;
}

interface State {
  showOtherProperties: boolean;
}
