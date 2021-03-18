import Toast from '@/components/common/toast/Toast'
import Vue from "vue"

const obj = {}

obj.install = function(vue){
  //1.创建组件构造器
  const toastConstructor = Vue.extend(Toast)
  //2.通过new 构造器创建一个组件对象
  const toast = new toastConstructor()
  //3.手动将上述的对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  //4.toast.$el就是div
  document.body.appendChild(toast.$el)
  Vue.prototype.$toast = toast
}

export default obj
