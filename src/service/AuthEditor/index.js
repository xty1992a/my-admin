import Main from './Main'
import Vue from 'vue'

const Com = Vue.extend(Main)
const copy = o => JSON.parse(JSON.stringify(o))

function createVm(opt) {
  const vm = new Com({data: opt}).$mount()
  document.body.appendChild(vm.$el)
  return vm
}

const dftOpt = {
  value: null
}

export default (opt = {}) => new Promise(resolve => {
  opt = {...dftOpt, ...opt, resolve, value: copy(opt.value)}
  let vm = createVm(opt)
  vm.show = true
})
