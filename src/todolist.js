import { todoitem } from './todoitem.js'

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
        for (let i = 0; i < sensibleobject.length; i++) {
            let sensob = sensibleobject[i]
            let todo = todoitem(sensob.title, sensob.description, sensob.dueDate, sensob.priority, sensob.status) 
            for (let tag of sensob.tags) {
                todo.addTag(tag)
            }
            list[i] = todo;
        }
    }

    let projectSort = (tags) => {
        
        // for each item...
        let sortedList = list.filter(function(item) { 
            let x = 0;

            // ...for each tag in the list...
            for (let tag of tags) {
                tag = String(tag)
                
                // ...give it a point if it matches one of the item's tags
                for (let i = 0; i < item.tags.length; i++) {
                    if (item.tags[i] === tag) {
                        x++;
                        break;
                    }
                }
            }

            let countReached = false;

            // if its point count matches the total number of tags being checked, then we're happy with it. 
            if (x === tags.length) {
                countReached = true;
            }

            return countReached;
        })
        return sortedList;
    }
    
    let addToList = item => {
        list.push(item);
        storageUpdate();
        generate();
    }
    
    let deleteFromList = item => {
        for (let i = 0; i < list.length; i++) {
            if (list[i] === item) {
                list.splice(i, 1);
                break;
            }
        }
        storageUpdate();
        generate();
    }

    return {list, addToList, deleteFromList, projectSort, storageUpdate, generate }
})();

export {
    todolist, 
    todoitem
}
    