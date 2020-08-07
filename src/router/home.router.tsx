import { lazy } from "react";
import { RouterItem } from "./";
const home: RouterItem[] = [
  {
    path: "/home",
    protect: true,
    component: lazy(() => import("@/pages/Home")),
    name: "首页",
    strict: true,
  },
];

export default home;
