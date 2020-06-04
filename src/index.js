require('./index.css')
require('./home.styl')

import aFn from './a'

aFn()

console.log('index***111222')

// 在node中，有全局变量process表示的是当前的node进程。process.env包含着关于系统环境的信息。
// 但是process.env中并不存在NODE_ENV这个东西。NODE_ENV是用户一个自定义的变量，在webpack中它的用途是判断生产环境或开发环境的依据的。
console.log(process.env.NODE_ENV)

if(process.env.NODE_ENV=='development'){
  console.log('开发环境')
}else{
  console.log('生产环境')
}