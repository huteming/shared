/**
 * 文档说明: https://v2.cn.vuejs.org/v2/guide/typescript.html
 */

// 这里必须在顶部引入 vue
// 因为第三方插件都是扩展的顶部 vue 的属性
// 如果在 declare 内部 import, 会丢失三方插件扩展的属性
// 因此, 该声明只能写成一个模块，只能在插件中手动引入这个类型的扩展
import Vue from 'vue'

declare module 'vue/types/vue' {
  // var vm = new Vue()
  // console.log(vm.$myProperty) // 将会顺利编译通过
  interface Vue {
    $myProperty: string
  }

  // console.log(Vue.$myGlobal)
  interface VueConstructor {
    $myGlobal: string
  }
}

// var vm = new Vue({
//   myOption: 'Hello'
// })
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    myOption?: string
  }
}
