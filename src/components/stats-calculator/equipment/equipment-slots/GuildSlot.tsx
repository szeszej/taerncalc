//React
import React, { useState } from "react";

//components
import { GuildBuffsForm } from "./shared/GuildBuffsForm";
import { ItemTooltip } from "./shared/ItemTooltip";

//types
import { Item } from "../../../../data/models/item.model";
import { Equipment } from "../../../../store/equipment-reducer/equipment-reducer";

export function GuildSlot(props: Props) {
  const [tooltip, toggleTooltip] = useState(false);
  return (
    <div
      className="guild empty"
      onClick={() => props.showItemsList("guild")}
      onMouseEnter={props.inSlot ? () => toggleTooltip(true) : undefined}
      onMouseLeave={props.inSlot ? () => toggleTooltip(false) : undefined}
      onTouchStart={props.inSlot ? () => toggleTooltip(true) : undefined}
      onTouchEnd={props.inSlot ? () => toggleTooltip(false) : undefined}
      style={props.inSlot ? {backgroundImage: `url("/images/guild-color.svg")`} : undefined}
    >
      {props.listToDisplay === "guild" ?
        <GuildBuffsForm item={props.inSlot} closeList={props.hideItemsList} />
       : tooltip && props.inSlot ? <ItemTooltip item={props.inSlot}/> : null}
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
