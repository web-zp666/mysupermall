import {request} from './request'

export function getDetail(iid){
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export function getRecommend(){
  return request({
    url:'/recommend'
  })
}

//当组件需要用的到数据比较分散的时候封装一个对象来保存多个路径的数据
export class Goods {
  constructor(itemInfo,services,columns) {
    this.discount = itemInfo.discountDesc;
    this.title = itemInfo.title;
    this.desc = itemInfo.desc;
    this.nowPrice = itemInfo.highNowPrice;
    this.newPrice = itemInfo.price;
    this.oldPrice = itemInfo.oldPrice;
    this.columns = columns;
    this.services = services
  }
}


export class Shop{
  constructor(shopInfo){
    this.sells = shopInfo.cSells;
    this.goodsCount = shopInfo.cGoods;
    this.name = shopInfo.name;
    this.score = shopInfo.score;
    this.logo = shopInfo.shopLogo
    this.fans = shopInfo.cFans;
  }
}

export class GoodsParams {
  constructor(info,rule){
    // 注: images可能没有值(某些商品有值, 某些没有值)
    this.images = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}
