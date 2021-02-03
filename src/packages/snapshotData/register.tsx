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
  const register = (name: string, exec: Exec) => {
    commander[name] = (...args: any[]) => {
      const { redo, undo } = exec(...args);
      UN_RE_LIST.push({ redo, undo });
    };
  };

  return {
    register,
    commander,
  };
};

export default command;
