import React from "react";
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

const ColorPicker = ({
  colorList,
  selectedColor,
  defaultColor,
  setSelectedColor
}) => {
  const populateColors = color => {
    return (
      <DropdownItem
        key={color.id}
        style={{ backgroundColor: color.color, height: "2em" }}
        onClick={() => setSelectedColor(color.id)}
      />
    );
  };

  return (
    <UncontrolledDropdown style={{ marginTop: "1.5em" }}>
      <DropdownToggle
        caret
        style={{ backgroundColor: selectedColor || defaultColor }}
      >
        Event Color
      </DropdownToggle>
      <DropdownMenu
        modifiers={{
          setMaxHeight: {
            enabled: true,
            order: 890,
            fn: data => {
              return {
                ...data,
                styles: {
                  ...data.styles,
                  overflow: "auto",
                  maxHeight: 160
                }
              };
            }
          }
        }}
      >
        {(colorList || []).map(color => populateColors(color))}
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

export default ColorPicker;
