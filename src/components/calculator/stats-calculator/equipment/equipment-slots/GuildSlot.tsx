//React
import React, { useState } from "react";

//components
import { GuildBuffsForm } from "./shared/GuildBuffsForm";
import { ItemTooltip } from "./shared/ItemTooltip";

//types
import { Item } from "../../../../../data/models/item.model";
import { Equipment } from "../../../../../store/equipment-reducer/equipment-reducer";

export function GuildSlot(props: Props) {
  const [tooltip, toggleTooltip] = useState(false);
  return (
    <div
      className="guild empty"
      onClick={() => props.showItemsList("guild")}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
      onTouchStart={() => toggleTooltip(true)}
      onTouchEnd={() => toggleTooltip(false)}
      style={
        props.inSlot
          ? { backgroundImage: `url("/images/guild-color.svg")` }
          : undefined
      }
    >
      {props.listToDisplay === "guild" ? (
        <GuildBuffsForm closeList={props.hideItemsList} />
      ) : tooltip && props.inSlot ? (
        <ItemTooltip item={props.inSlot} />
      ) : tooltip ? (
        <div className="itemTooltip">
          <p className="noProperties">{props.t("Buffy gildiowe")}</p>
        </div>
      ) : null}
    </div>
  );
}

interface Props {
  inSlot: Item | null;
  listToDisplay: string;
  showItemsList(type: keyof Equipment): void;
  hideItemsList(): void;
  t(string: string): string;
}
