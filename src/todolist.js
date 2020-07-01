const todolist = (() => {
    const list = [];
    
    let projectSort = (...tags) => {

        console.log("project sort tags: ")
        console.log(tags)
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