// 指定格式来注册组件
class RegisterFormComponents {
    assets: { [type: string]: any } = {};
    displayAssets: { [type: string]: any } = {};
    append(opts: any) {
        this.assets[`A${opts.code}`] = opts.component
    }
    appendDisplayAssets(opts: any) {
        this.displayAssets[opts.code] = opts
    }
    getAssets() {
        return this.assets;
    }
    getDisplayAssets() {
        return this.displayAssets;
    }
}

export var register = new RegisterFormComponents();