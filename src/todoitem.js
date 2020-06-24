const todoitem = (title, description, dueDate, priority) => {
    const status = "incomplete"
    let tags = []
    let addTag = (tag) => {
        console.log('what')
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

export default todoitem;