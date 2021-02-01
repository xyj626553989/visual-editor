import { MenuProps } from "../types/visual-editor";
const useRegist = () => {
  const componentList: MenuProps[] = [];
  const register = (component: MenuProps) => {
    componentList.push(component);
  };
  return {
    register,
    componentList,
  };
};

export default useRegist;
