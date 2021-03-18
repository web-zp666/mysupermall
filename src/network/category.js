import {request} from './request'

//请求左侧一级菜单数据
export function getCategory(){
  return request({
    url:'/category'
  })
}

//请求右侧二级菜单数据
export function getSubCategory(maitKey){
  return request({
    url:'/subcategory',
    params:{
      maitKey
    }
  })
}

//请求二级菜单每个分类下的数据
export function getCategoryDetail(miniWallkey,type){
  return request({
    url:'/subcategory/detail',
    params:{
      miniWallkey,
      type
    }
  })
}