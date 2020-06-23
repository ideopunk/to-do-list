import './styles.css';

const todoitem = (title, description, dueDate, priority) => {
    const status = "incomplete"
    let tags = []
    console.log(this)
    let addTag = (tag) => {
        console.log(this)
        tags.push(tag)
    }
    let deleteTag = (tag) => {
        for (let i = 0; i < tags.length; i++) {
            if (tags[i] === tag) {
                tags.splice(i, 1);
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
fakeitem.addTag()