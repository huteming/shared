/**
 * 注意
 * 这个一个全局变量的声明文件，不能在顶部出现 import, export
 * 如果是想扩展 Vue 的属性，参考 ./plugins/index.d.ts 的写法
 *
 * 为什么有时候没有这段声明，编辑器也能正常识别 vue 文件？
 * 很有可能是因为编辑器的插件完成了这个工作。比如 vscode 中的 "TypeScript Vue Plugin(Volar)"
 */

// declare module '*.vue' {
//   import Vue from 'vue'
//   export default Vue
// }
