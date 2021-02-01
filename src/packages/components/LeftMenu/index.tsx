import React, { FC, DragEvent } from "react";
import { MenuProps } from "../../types/visual-editor";
import "./index.less";
interface Props {
  componentList: MenuProps[];
}

const LeftMenu: FC<Props> = (props) => {
  const { componentList } = props;
  const onDragStartHandle = (e: DragEvent, component: MenuProps) => {
    e.dataTransfer.setData("type", component.type);
  };
  return (
    <div className="left-menu">
      {componentList.map((item) => (
        <div
          draggable
          className="left-menu-item"
          key={item.type}
          onDragStart={(e: DragEvent) => onDragStartHandle(e, item)}
        >
          <div className="left-menu-item-mask">{item.label}</div>
          {item.render()}
        </div>
      ))}
    </div>
  );
};

export default LeftMenu;
