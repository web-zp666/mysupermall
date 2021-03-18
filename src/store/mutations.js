import {
  ADD_COUNTER,
  ADD_CART,
} from './mutations-type'

export default {
  //任务明确，每个任务处理自己的食物
  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_CART](state,payload){
    payload.isChecked = true
    state.cartList.push(payload)
  }
}
