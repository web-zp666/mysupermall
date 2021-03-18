import { ADD_COUNTER, ADD_CART } from "./mutations-type";

export default {
  addToCart(context, payload) {
    //payload是新添加的商品
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for (let item of context.state.cartList) {
        //查找之前商品中是否已经有该商品，一步到位，找到的话会把合适的item赋值给product
        oldProduct = context.state.cartList.find(
          item => item.iid === payload.iid
        );
      }

      //判断oldProduct
      if (oldProduct) {
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1')
      } else {
        payload.count = 1;
        context.commit(ADD_CART, payload);
        resolve('添加了新的商品')
      }
    });
  }
};
