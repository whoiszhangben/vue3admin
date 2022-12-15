// 注册自定义组件
import antd from './antdcomponents'
import { register } from './register'

const components = [...antd];

export default function () {
    for (let cmp of components) {
        register.append(cmp);
        register.appendDisplayAssets(cmp);
        console.log(register.assets);
    }
}