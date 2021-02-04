import React, { useState, useMemo, useEffect } from "react";
import LeftMenu from "./components/LeftMenu";
import RightAttr from "./components/RightAttr";
import TopBar from "./components/TopBar";
import Editor from "./components/Editor";
import { Container, ComponentProps, SnapshotData } from "./types/visual-editor";
import componentList from "./registerComponent";
import useCommand from "./snapshotData";
import Keyboard from "./Keyboard/Keyboard";
import "./visual-editor.less";
const initContainer: Container = {
  width: 1200,
  height: 900,
};
const keyboard = new Keyboard();
const VisualEditor = () => {
  const [container] = useState<Container>(initContainer);
  const [componentData, setComponentData] = useState<ComponentProps[]>([]);
  const commander = useCommand(componentData, setComponentData);
  console.log(commander);
  const snapshotData = useMemo<SnapshotData>(
    () => ({ index: -1, components: [] }),
    []
  );
  useEffect(() => {
    keyboard.register();
    return () => keyboard.remove();
  }, []);
  //撤销
  const undo = () => {
    if (snapshotData.index >= 0) {
      const data = snapshotData.components[--snapshotData.index];
      if (data) {
        setComponentData(data);
      } else {
        setComponentData([]);
      }
    }
  };
  //重做
  const redo = () => {
    if (snapshotData.components.length - 1 > snapshotData.index) {
      const data = snapshotData.components[++snapshotData.index];
      if (data) {
        setComponentData(data);
      }
    }
  };
  //清除所有
  const clearAll = () => {
    if (componentData.length) {
      setComponentData([]);
      snapshotData.index++;
    }
  };
  //删除
  const deleteItem = () => {
    const temp = componentData.filter((item) => !item.focus);
    if (temp.length !== componentData.length) {
      snapshotData.index++;
      snapshotData.components.push(componentData);
    }
    setComponentData(temp);
  };
  return (
    <div className="visual-editor">
      <LeftMenu componentList={componentList} />
      <TopBar
        undo={undo}
        redo={redo}
        deleteItem={deleteItem}
        clearAll={clearAll}
      />
      <Editor
        snapshotData={snapshotData}
        container={container}
        componentData={componentData}
        setComponentData={setComponentData}
      />
      <RightAttr />
    </div>
  );
};

export default VisualEditor;
