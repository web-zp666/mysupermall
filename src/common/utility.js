//封装防抖函数，方便其他项目/页面一起使用
export function debounce(fnc,delay){
  let timer = null
  return function(...args){
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fnc.apply(this,args)
    },delay)
  }
}
