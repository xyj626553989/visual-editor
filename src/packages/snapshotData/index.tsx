import { Dispatch, SetStateAction } from "react";
import { ComponentProps } from "../types/visual-editor";
import command from "./register";
const useCommand = (
  componentData: ComponentProps[],
  setComponentData: Dispatch<SetStateAction<ComponentProps[]>>
) => {
  const { register, commander } = command();

  register("delete", () => {
    const newComponentData: ComponentProps[] = [];
    const before: ComponentProps[] = [];
    componentData.forEach((item) => {
      if (!item.focus) {
        newComponentData.push(item);
      } else {
        before.push(item);
      }
    });
    setComponentData(newComponentData);
    return {
      undo: () => {
        console.log("-----");
      },
      redo: () => {
        console.log("-----");
      },
    };
  });
  return commander;
};

export default useCommand;
