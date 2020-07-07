const todolist = (() => {
    let list = [];

    let storageUpdate = () => {
        window.localStorage.setItem('todolist', JSON.stringify(list))
    }

    let generate = () => {
        list.length = 0;
        let sensibleobject = JSON.parse(window.localStorage.getItem('todolist'));
        if (!sensibleobject) {
            sensibleobject = 1;
        }
        console.log(`sensibleobject: `)
        console.log(sensibleobject)
        for (let i = 0; i < sensibleobject.length; i++) {
            list[i] = sensibleobject[i]
        }
        console.log(`list: ${list}`)
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
        console.log(`localstoragelength: ${window.localStorage.length}`)
        // generate();
        storageUpdate();
        generate();
    }
    
    let deleteFromList = item => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(i, 1);
                storageUpdate();
                // generate();
                console.log('spliced!')
                break;
            }
        }
        storageUpdate();
        // generate();
    }

    return {list, addToList, deleteFromList, projectSort, storageUpdate, generate }
})();

export default todolist;