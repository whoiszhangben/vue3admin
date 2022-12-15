export function Array2Tree(list: Array<any>, parent: any) {
    if (!list.length) {
        return []
    }
    let newArr: any[] = [];
    list.forEach(item => {
        if (item.parent === parent) {
            newArr.push({
                ...item,
                children: Array2Tree(list, item.id)
            })
        }
    })
    return newArr;
}