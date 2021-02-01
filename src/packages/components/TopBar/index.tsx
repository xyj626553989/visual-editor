import React, { FC } from "react";
import { Button } from "antd";
import "./index.less";
interface Props {
  undo: () => void;
  redo: () => void;
  deleteItem: () => void;
  clearAll: () => void;
}
const TopBar: FC<Props> = (props) => {
  const { undo, redo, deleteItem, clearAll } = props;
  return (
    <div className="top-bar">
      <Button style={{ marginLeft: 20 }} onClick={undo}>
        撤消
      </Button>
      <Button style={{ marginLeft: 20 }} onClick={redo}>
        重做
      </Button>
      <Button style={{ marginLeft: 20 }} onClick={deleteItem}>
        删除
      </Button>
      <Button style={{ marginLeft: 20 }} onClick={clearAll}>
        清空
      </Button>
    </div>
  );
};

export default TopBar;
