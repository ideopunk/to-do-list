import './styles.css';
import todoitem from './todoitem.js'
import todolist from './todolist.js'


todolist.addToList(todoitem('Walk dog', "Just around the block", "1pm", "ASAP"))
todolist.addToList(todoitem('Win lottery', "Powerball", "2021", "ASAP"))

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

    // when you click on any item, it should expand to show full details
    function expand(event) {
        console.log(event.target)
    }

    // when you click the button, the item should become 'complete'
    function completeItem() {
        console.log('completeItem')
        let item = this.parentNode.firstChild.textContent;
        console.log(item)
        for (let i = 0; i < todolist.list.length; i++) {
            let potentialItem = todolist.list[i]
            if (potentialItem.title === item) {
                item = potentialItem;
                console.log('woo!')
                break;
            }
        }
        item.status = 'complete'
    };

    // there should be little buttons for each tag 
    function createTagButton(tag, carrier) {
        let tagButton = document.createElement('button')
        tagButton.textContent = tag;
        console.log('yo')
        carrier.appendChild(tagButton);
    };

    // there should be a popup to write in a new tag
    function createNewTag() {
        console.log(this)
        console.log(this.parentNode)
        let item = this.parentNode.firstChild.textContent
        console.log(item)
        for (let i = 0; i < todolist.list.length; i++) {
            let potentialItem = todolist.list[i]
            if (potentialItem.title === item) {
                item = potentialItem;
                console.log('aye')
                break;
            }
        }
        console.log(item)
        let newTag = prompt("New tag");
        item.addTag(newTag)
    };

    // 
    function createCompleteButton(carrier, item) {
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
    function displayItem(item) {
        let carrier = document.createElement('div');
        carrier.classList.add('item');
        carrier.setAttribute('value', item.title);
        
        // add title
        createItemName(carrier, item)

        // add button for completion
        createCompleteButton(carrier, item)

        // add button for each tag 
        console.log('why')
        for (let tag of item.tags) {
            console.log('ya')
            createTagButton(tag, carrier)
        }
        console.log('yhw')

        // add button for adding new tags
        createNewTagButton(carrier, item)

        containerList.appendChild(carrier);
    }

    // initialize list
    function generate() {
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