import Alert from '../packages/Alert'
import Button from '../packages/Button'

let components = [Alert,Button]
// 1: 支持全局注册

export default {
    install(Vue){
        components.forEach(item=>{
            Vue.component(item.name,item)
        })
    }
}

// 2：支持按需导入
export {
    Alert,Button
}