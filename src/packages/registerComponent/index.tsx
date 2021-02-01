/* eslint-disable react/display-name */
import React from "react";
import { Input, Button } from "antd";
import regist from "./useRegist";

const visualConfig = regist();
visualConfig.register({
  label: "文本",
  type: "text",
  render: (style) => <span style={style}>文本</span>,
});

visualConfig.register({
  label: "输入框",
  type: "input",
  render: (style) => <Input style={style} />,
});
visualConfig.register({
  label: "按钮",
  type: "button",
  render: (style) => <Button style={style}>按钮</Button>,
});

export default visualConfig.componentList;

// const commonStyle = {
//     rotate: '',
//     opacity: 1,
// }

// // 编辑器左侧组件列表
// const list = [
//     {
//         type: 'text',
//         label: '文字',
//         value: '文字',
//         icon: 'el-icon-edit',
//         animations: [],
//         events: {},
//         style: {
//             width: 200,
//             height: 33,
//             fontSize: 14,
//             fontWeight: 500,
//             lineHeight: '',
//             letterSpacing: 0,
//             textAlign: '',
//             color: '',
//         },
//     },
//     {
//         type: 'button',
//         label: '按钮',
//         value: '按钮',
//         icon: 'el-icon-thumb',
//         animations: [],
//         events: {},
//         style: {
//             width: 100,
//             height: 34,
//             borderWidth: '',
//             borderColor: '',
//             borderRadius: '',
//             fontSize: 14,
//             fontWeight: 500,
//             lineHeight: '',
//             letterSpacing: 0,
//             textAlign: '',
//             color: '',
//             backgroundColor: '',
//         },
//     },
//     // {
//     //     component: 'iicture',
//     //     label: '图片',
//     //     icon: 'el-icon-picture',
//     //     value: require('@/assets/title.jpg'),
//     //     animations: [],
//     //     events: {},
//     //     style: {
//     //         width: 300,
//     //         height: 200,
//     //         borderRadius: '',
//     //     },
//     // },
// ]
