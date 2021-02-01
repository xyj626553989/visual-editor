import { CSSProperties, ReactElement } from "react";

export interface Container {
  width: number;
  height: number;
}

export interface ComponentProps {
  id: string;
  type: string;
  value?: string;
  animations?: any[];
  events?: Record<string, any>;
  width: number;
  height: number;
  left: number;
  top: number;
  foucs?: boolean;
  style?: CSSProperties;
}

export interface MenuProps {
  type: string;
  label: string;
  icon?: string;
  render: (style?: CSSProperties) => ReactElement;
}

export interface SnapshotData {
  components: ComponentProps[][];
  index: number;
}
