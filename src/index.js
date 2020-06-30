import './styles.css';
import todoitem from './todoitem.js'
import todolist from './todolist.js'

let dogtask = todoitem('Walk dog', "Just around the block", "1pm", "Low")
dogtask.addTag('Exercise')
dogtask.addTag('Pets')
todolist.addToList(dogtask)
todolist.addToList(todoitem('Win lottery', "Powerball", "2021", "Low"))



const formInterface = (() => {
    function addItem() {
        console.log('formadditem')
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let dueDate = document.querySelector('#dueDate').value
        let priority = document.querySelector('#priority').value
        let tags = document.querySelector('#tags').value
        let newItem = todoitem(title, description, dueDate, priority)
        newItem.addTag(tags)
        todolist.addToList(newItem)
        toggleForm()
        document.querySelector('#title').value = ''
        document.querySelector('#description').value = ''
        document.querySelector('#dueDate').value = ''
        document.querySelector('#priority').value = 'Low'
        document.querySelector('#tags').value = ''
        userInterface.generate()
    }
    
    function formgenerate() {
        let formsubmit = document.querySelector('#formsubmit')
        formsubmit.addEventListener('click', addItem)
    }

    function toggleForm() {
        let newItemForm = document.querySelector('#newItemForm')
        newItemForm.classList.toggle('hide')
    }

    return { toggleForm, formgenerate, addItem }
})();



const menuInterface = (() => {
    function menuInterfaceGenerate() {
        // let sort = document.querySelector('#sort');
        let newToDo = document.querySelector('#newToDo');
        // sort.addEventListener('click', alert('yo'))
        newToDo.addEventListener('click', formInterface.toggleForm)
    }
    return { menuInterfaceGenerate}
})();




const userInterface = (() => {
    let containerList = document.querySelector('#containerList')

    // used throughout to access todolist object
    let grabItem = () => {
        let itemcheck = event.target.parentNode.firstChild.textContent
        console.log(itemcheck)
        let item, i;

        for (i = 0; i < todolist.list.length; i++) {
            let potentialItem = todolist.list[i]
            if (potentialItem.title === itemcheck) {
                item = potentialItem;
                break;
            }
        }

        return item;
    }

    // when you click on any item, it should expand to show full details
    function expand() {
        console.log(grabItem())
    }

    // when you click the button, the item should become 'complete'
    let completeItem = () => {
        console.log('completeItem')
        let item = grabItem()
        item.status = 'complete'
        console.log('completed!')
    };

    // the tag buttons should be deletable
    function deleteTag() {
        let tag = event.target;
        console.log('tryna delete')
        let itemcheck = tag.parentNode.parentNode.firstChild.textContent;
        for (let i = 0; i < todolist.list.length; i++) {
            if (todolist.list[i].title === itemcheck) {
                todolist.list[i].deleteTag(tag.textContent)
                console.log(todolist.list[i].tags)
                break;
            }
        }
        tag.parentNode.removeChild(tag)
    }

    // there should be little buttons for each tag 
    function createTagButton(tag, tagCarrier) {
        let tagButton = document.createElement('button')
        tagButton.classList.add('tagButton')
        tagButton.textContent = tag;
        tagButton.addEventListener('dblclick', deleteTag)
        console.log('yo')
        tagCarrier.appendChild(tagButton);
    };

    // there should be a popup to write in a new tag
    function createNewTag() {
        console.log(this)
        console.log(this.parentNode)
        let item = grabItem()
        let newTag = prompt("New tag");
        item.addTag(newTag)
        console.log("parent: " + event.target.parentNode)
        let carrier = event.target.parentNode;
        let tagCarrier = carrier.childNodes[2]
        createTagButton(newTag, tagCarrier)
    };

    // 
    let createCompleteButton = (carrier, item) => {
        let completeButton = document.createElement('button')
        completeButton.textContent = '?'
        completeButton.classList.add('completebutton')
        completeButton.addEventListener('click', completeItem)
        carrier.appendChild(completeButton);
    }

    // there should be a button for adding new tags
    function createNewTagButton(carrier, item) {
        let newTagButton = document.createElement('button')
        newTagButton.textContent = '+'
        newTagButton.classList.add('newTagButton')
        console.log('CNB')
        newTagButton.addEventListener('click', createNewTag)
        carrier.appendChild(newTagButton)
    }

    function createItemName(carrier, item) {
        let itemName = document.createElement('button')
        itemName.textContent = item.title;
        itemName.classList.add('itemname')
        itemName.addEventListener('click', expand)
        carrier.appendChild(itemName)   
    }

    // create item display
    const displayItem = (item) => {
        let carrier = document.createElement('div');
        carrier.classList.add('item');
        carrier.setAttribute('value', item.title);
        
        // add title
        createItemName(carrier, item)

        // add button for completion
        createCompleteButton(carrier, item)

        // add button for each tag 
        let tagCarrier = document.createElement('div')
        tagCarrier.classList.add('tagCarrier')
        for (let tag of item.tags) {
            console.log('ya')
            createTagButton(tag, tagCarrier)
        }
        carrier.appendChild(tagCarrier)
        // add button for adding new tags
        createNewTagButton(carrier, item)

        containerList.appendChild(carrier);
    }

    // initialize list
    const generate = () => {
        containerList.textContent = ''
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