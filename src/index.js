import './styles.css';

const todoitem = (title, description, dueDate, priority) => {
    const status = "incomplete"
    let tags = []
    let addTag = (tag) => {
        tags.push(tag)
    }
    let deleteTag = (tag) => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === tag) {
                tags.splice(i, 1);
                break;
            }
        }
    }
    return { title, description, dueDate, priority, status, tags, addTag, deleteTag };
};


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

