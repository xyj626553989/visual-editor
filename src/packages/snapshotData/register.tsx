export interface ExecReturn {
  undo: () => void;
  redo: () => void;
}
export type Exec = (...args: any[]) => ExecReturn;
export interface Commander {
  [props: string]: () => void;
}

const command = () => {
  const commander: Commander = {};
  const UN_RE_LIST: ExecReturn[] = [];
  let index = -1; //当前指针
  const register = (name: string, exec: Exec) => {
    commander[name] = (...args: any[]) => {
      const { redo, undo } = exec(...args);
      UN_RE_LIST.push({ redo, undo });
      index++;
    };
  };
  commander.redo = () => {
    if (index < UN_RE_LIST.length) {
      const { redo } = UN_RE_LIST[++index] || {};
      redo && redo();
    }
  };
  commander.undo = () => {
    if (index > 0) {
      const { undo } = UN_RE_LIST[--index] || {};
      undo && undo();
    }
  };
  // register("redo", () => {
  //   const { redo } = UN_RE_LIST[index];
  //   redo && redo();
  // });
  return {
    register,
    commander,
  };
};

export default command;
