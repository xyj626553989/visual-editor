import React, { CSSProperties, FC, MouseEvent } from "react";
import classnames from "classnames";
import { ComponentProps } from "../../types/visual-editor";
import componentList from "../../registerComponent";
interface Props {
  component: ComponentProps;
  onMouseDown: (e: MouseEvent) => void;
}

const ComponentItem: FC<Props> = (props) => {
  const { component, onMouseDown } = props;

  const style: CSSProperties = {
    left: component.left - component.width / 2,
    width: component.width,
    height: component.height,
    top: component.top - component.height / 2,
  };
  const classes = classnames("component-item", {
    "component-item-focus": component.focus,
  });
  const renderComponent = () => {
    const item = componentList.find((item) => item.type === component.type);
    if (item) {
      return item.render({
        width: component.width,
        height: component.height,
      });
    }
  };

  return (
    <div className={classes} onMouseDown={onMouseDown} style={style}>
      {renderComponent()}
    </div>
  );
};

export default ComponentItem;
