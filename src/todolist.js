const todolist = (() => {
    let list = [];

    let storageUpdate = () => {
        localStorage.clear();
        for (let i = 0; i < list.length; i++) {
            console.log(`listi: ${list[i]}`)
            localStorage.setItem(i, JSON.stringify(list[i]))
        }

        localStorage.setItem()
    }

    let generate = () => {
        list.length = 0;
        for (let i = 0; i < localStorage.length; i++) {
            console.log(localStorage.getItem[i])
            console.log(JSON.parse(localStorage.getItem[i]))
            list.push(JSON.parse(localStorage.getItem(i)));
            console.log('newlist')
            console.log(list)
        }
        console.log(list)
        // todolist.list = JSON.parse(localStorage.getItem('storagelist'));
    }

    let projectSort = (tags) => {
        
        // for each item...
        let sortedList = list.filter(function(item) { 
            let x = 0;

            // ...for each tag in the list...
            for (let tag of tags) {
                tag = String(tag)
                
                // ...see if it matches one of the item's tags
                for (let i = 0; i < item.tags.length; i++) {
                    if (item.tags[i] === tag) {
                        x++;
                        break;
                    }
                }
            }

            let countReached = false;

            if (x === tags.length) {
                countReached = true;
            }

            return countReached;
        })
        return sortedList;
    }
    
    let addToList = item => {
        list.push(item);
        console.log(list);
        console.log(`localstoragelength: ${localStorage.length}`)
        storageUpdate();
        generate();
    }
    
    let deleteFromList = item => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(i, 1);
                storageUpdate();
                generate();
                console.log('spliced!')
                break;
            }
        }
        storageUpdate();
        generate();
    }

    return {list, addToList, deleteFromList, projectSort, storageUpdate, generate }
})();

export default todolist;