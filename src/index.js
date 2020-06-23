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

let fakeitem = todoitem('Walk dog', 'Walk dog around the block', '1pm', 'ASAP');
console.log('yo')
console.log(fakeitem)
console.log(fakeitem.title)
console.log(fakeitem.tags)
fakeitem.addTag('Pets')
console.log(fakeitem.tags)
fakeitem.addTag('Exercise')
console.log(fakeitem.tags)
fakeitem.addTag('Boring')
console.log(fakeitem.tags)
fakeitem.deleteTag('Exercise')
console.log(fakeitem.tags)

const todolist = (() => {
    const list = []
    let projectSort = tag => {
        let sortedList = []
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