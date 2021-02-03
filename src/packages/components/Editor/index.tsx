import React, {
  FC,
  CSSProperties,
  DragEvent,
  Dispatch,
  SetStateAction,
} from "react";
import {
  Container,
  ComponentProps,
  SnapshotData,
} from "../../types/visual-editor";
import { v4 as uuidv4 } from "uuid";
import ComponentItem from "./componentItem";
import "./index.less";
interface Props {
  container: Container;
  componentData: ComponentProps[];
  snapshotData: SnapshotData;
  setComponentData: Dispatch<SetStateAction<ComponentProps[]>>;
}
type EditorProps = FC<Props>;

const Editor: EditorProps = (props) => {
  const { container, componentData, setComponentData, snapshotData } = props;
  const styles: CSSProperties = {
    width: container.width,
    height: container.height,
  };
  const onDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer!.dropEffect = "move";
  };
  const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer!.dropEffect = "none";
  };
  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    const type = e.dataTransfer!.getData("type");
    const component: ComponentProps = {
      type,
      id: uuidv4(),
      width: 200,
      height: 40,
      left: e.nativeEvent.offsetX,
      top: e.nativeEvent.offsetY,
      focus: false,
    };
    setComponentData(() => {
      const data: ComponentProps[] = [...componentData, component];
      if (snapshotData.index == -1) {
        snapshotData.components.length = 0;
      }
      snapshotData.index++;
      snapshotData.components.push(data);
      return data;
    });
  };

  //鼠标按下
  const onMouseDown = (e: MouseEvent, component: ComponentProps) => {
    e.stopPropagation();
    const tempData = componentData.map((item) => {
      if (component.id === item.id) {
        item.focus = true;
      } else {
        item.focus = false;
      }
      return item;
    });
    addListener(e, component);
    setComponentData(tempData);
  };

  const addListener = (e: MouseEvent, component: ComponentProps) => {
    const dragState = {
      startX: e.clientX,
      startY: e.clientY,
      isMove: false,
    };
    let tempData: ComponentProps[] = [];
    const mousemove = (e: MouseEvent) => {
      const moveX = e.clientX - dragState.startX;
      const moveY = e.clientY - dragState.startY;
      moveComponent(moveX, moveY);
    };
    //移动
    const moveComponent = (moveX: number, moveY: number) => {
      let left = component.left + moveX;
      let top = component.top + moveY;
      const w = component.width / 2;
      const h = component.height / 2;
      if (left <= w) {
        left = w;
      }
      if (left >= container.width - w) {
        left = container.width - w;
      }
      if (top <= h) {
        top = h;
      }
      if (top >= container.height - h) {
        top = container.height - h;
      }
      tempData = componentData.map((item) => {
        if (component.id === item.id) {
          return {
            ...item,
            left,
            top,
          };
        }
        return item;
      });
      dragState.isMove = true;
      setComponentData(tempData);
    };
    const mouseup = () => {
      if (dragState.isMove) {
        snapshotData.index++;
        snapshotData.components.push(tempData);
      }

      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };

    document.addEventListener("mousemove", mousemove);
    document.addEventListener("mouseup", mouseup);
  };
  const containerOnMouseDown = () => {
    const tempData = componentData.map((item) => {
      item.focus = false;
      return item;
    });
    setComponentData(tempData);
  };

  return (
    <div className="editor">
      <div
        className="editor-container"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onMouseDown={containerOnMouseDown}
        style={styles}
      >
        {componentData.map((item) => (
          <ComponentItem
            onMouseDown={(e: MouseEvent) => onMouseDown(e, item)}
            key={item.id}
            component={item}
          />
        ))}
      </div>
    </div>
  );
};

export default Editor;
