declare global {
  //   interface Window {
  //     test: string
  //   }
}
interface Files {
  (key: string): { default: any[] };
  keys: () => any[];
}
declare type NodeRequire = {
  (path: string): any;
  context: (path: string, flag: boolean, reg: RegExp) => any;
};
// declare var require: Require
declare const module = {
  hot: boolean,
};
