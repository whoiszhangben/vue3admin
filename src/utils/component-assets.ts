import { register } from './register'

export const getComponentAssets = function (type = 0): { [key: string]: any } {
    if (type === 0) {
        console.log(register.getAssets())
        return register.getAssets();
    } else {
        console.log(register.getDisplayAssets())
        return register.getDisplayAssets();
    }
}