import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}

declare module 'vue/types/vue' {
  //   var vm = new Vue()
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
