import './styles.css';
import todoitem from './todoitem.js'


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

const formInterface = (() => {
    function addItem() {
        console.log('form submitted')
        let title = document.querySelector('#title')
        let description = document.querySelector('#description')
        let dueDate = document.querySelector('#dueDate')
        let priority = document.querySelector('#priority')
        let tags = document.querySelector('#tags')
        let newItem = todoitem(title, description, dueDate, priority)
        newItem.addTag(tags)
        todolist.addToList(newItem)
        console.log(todolist.list)
        userInterface.generate()
    }
    
    function formgenerate() {
        let formsubmit = document.querySelector('#formsubmit')
        console.log('form generated')
        formsubmit.addEventListener('click', addItem)
    }

    return { formgenerate, addItem }
})();

const menuInterface = (() => {
    function showForm() {
        let newItemForm = document.querySelector('#newItemForm')
        newItemForm.classList.remove('hide')
    }

    function menuInterfaceGenerate() {
        // let sort = document.querySelector('#sort');
        let newToDo = document.querySelector('#newToDo');
        // sort.addEventListener('click', alert('yo'))
        newToDo.addEventListener('click', showForm)
    }
    return { menuInterfaceGenerate}
})();

const userInterface = (() => {
    let containerList = document.querySelector('#containerList')

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
    const createNewTag = item => {
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
        carrier.setAttribute('value', item.title);
        
        // add title
        let itemName = document.createElement('button')
        itemName.textContent = item.title;
        itemName.addEventListener('click', expand)
        carrier.appendChild(itemName)        

        // add button for completion
        let completeButton = document.createElement('button')
        completeButton.textContent = '?'
        completeButton.addEventListener('click', completeItem(carrier, item))
        carrier.appendChild(completeButton);

        // add button for each tag 
        for (let tag of item.tags) {
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

formInterface.formgenerate()
menuInterface.menuInterfaceGenerate()
userInterface.generate()
console.log(todolist.list)