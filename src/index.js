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

todolist.addToList(todoitem('Walk dog', "Just around the block", "1pm", "ASAP"))
todolist.addToList(todoitem('Win lottery', "Powerball", "2021", "ASAP"))


const userInterface = (() => {
    let container = document.querySelector('#container')
    function expand(event) {
        console.log(event.path[0])
    }

    // create item display
    function displayItem(item) {
        let carrier = document.createElement('div');
        carrier.classList.add('item');
        carrier.textContent = item.title;
        carrier.setAttribute('value', item.title);
        carrier.addEventListener('click', expand);
        container.appendChild(carrier);
    }

    // initialize list
    function generate() {
        for (let i = 0; i < todolist.list.length; i++) { 
            displayItem(todolist.list[i])
        }
    }

    return { generate}
})();

userInterface.generate()