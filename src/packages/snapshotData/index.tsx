import { Dispatch, SetStateAction } from "react";
import { ComponentProps } from "../types/visual-editor";
import command from "./register";
const useCommand = (
  componentData: ComponentProps[],
  setComponentData: Dispatch<SetStateAction<ComponentProps[]>>
) => {
  const { register, commander } = command();

  register("delete", () => {
    console.log(componentData, setComponentData);
    // const newComponentData = componentData.filter()
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
