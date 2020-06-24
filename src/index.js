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
    let containerList = document.querySelector('#containerList')

    let topMenu = document.createElement('div');

    // when you click on any item, it should expand to show full details
    function expand(event) {
        console.log(event)
    }

    // when you click the button, the item should become 'complete'
    function completeItem(carrier, item) {
        item.status = 'complete'
    }

    // there should be little buttons for each tag 
    function createTagButton(tag, carrier) {
        let tagButton = document.createElement('button')
        tagButton.textContent = tag;
        console.log('yo')
        carrier.appendChild(tagButton);
    }

    // there should be a popup to write in a new tag
    function createNewTag(item) {
        let newTag = 'ye'
        // let newTag = prompt("New tag");
        item.addTag(newTag)
    }

    // there should be a button for adding new tags
    function createNewTagButton(carrier, item) {
        let newTagButton = document.createElement('button')
        newTagButton.textContent = '+'
        newTagButton.id = 'newTagButton'
        newTagButton.addEventListener('click', createNewTag(item))
        carrier.appendChild(newTagButton)
    }

    // create item display
    function displayItem(item) {
        let carrier = document.createElement('div');
        carrier.classList.add('item');
        carrier.textContent = item.title;
        carrier.setAttribute('value', item.title);
        // carrier.addEventListener('click', expand);

        // add button for completion
        let completeButton = document.createElement('button')
        completeButton.addEventListener('click', completeItem(carrier, item))
        carrier.appendChild(completeButton);

        // add button for each tag 
        console.log(item.tags)
        for (tag in item.tags) {
            console.log('ya')
            createTagButton(tag, carrier)
        }

        // add button for adding new tags
        createNewTagButton(carrier, item)


        containerList.appendChild(carrier);
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