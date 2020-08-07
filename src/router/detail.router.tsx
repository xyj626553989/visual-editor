import { lazy } from "react";
import { RouterItem } from "./";
const details: RouterItem[] = [
  {
    path: "/detail",
    protect: false,
    component: lazy(() => import("@/pages/Detail")),
    name: "详情",
    strict: false,
  },
];

export default details;
