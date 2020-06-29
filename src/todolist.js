const todolist = (() => {
    const list = [];
    let projectSort = tag => {
        let sortedList = list.filter(function(item) {
            let x = false;
            for (let i = 0; i < item.tags.length; i++) {
                if (item.tags[i] === tag) {
                    x = true;
                    break;
                }
            }
            return x;
        })
        return sortedList;
    }
    let addToList = item => {
        list.push(item)
    }
    let deleteFromList = item => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === list) {
                list.splice(i, 1);
                break;
            }
        }
    }

    return {list, addToList, deleteFromList, projectSort}
})();

export default todolist;