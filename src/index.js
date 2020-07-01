import './styles.css';
import { todoitem, tagList } from './todoitem.js'
import todolist from './todolist.js'

// testers
let dogtask = todoitem('Walk dog', "Just around the block", "2020-07-11", "Low")
let lotteryTask = todoitem('Win lottery', "Powerball", "2021-07-11", "Mid")
let finishedTask = todoitem('Buy the moon', 'On sale', '2020-01-01', 'High');
finishedTask.status = 'complete'
dogtask.addTag('Exercise')
dogtask.addTag('Pets')
todolist.addToList(dogtask)
todolist.addToList(lotteryTask)
todolist.addToList(finishedTask)

const sorter = (() => {

    function generateFilterList() {
        let sortForm = document.querySelector('#sortList')
        sortForm.textContent = ''
        for (let elem of tagList.list) {
            let tagLine = document.createElement('button')
            tagLine.classList.add('tagLine');
            tagLine.value = elem.name;
            tagLine.textContent = elem.name;
            tagLine.addEventListener('click', userInterface.sortGenerate)
            sortForm.appendChild(tagLine)
        }
    }

    return { generateFilterList }
})();

const formInterface = (() => {
    function addItem() {
        console.log('formadditem')
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let dueDate = document.querySelector('#dueDate').value
        let priority = document.querySelector('#priority').value
        let tags = document.querySelector('#tags').value
        let newItem = todoitem(title, description, dueDate, priority)
        if (tags === true) {
            newItem.addTag(tags)
            sorter.generateFilterList();
        }

        if (title.length > 0) {
            todolist.addToList(newItem)
        }
        else {
            alert('Title is required')
        }
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
        let clear = document.querySelector('#clear');
        let newToDo = document.querySelector('#newToDo');
        clear.addEventListener('click', userInterface.generate)
        newToDo.addEventListener('click', formInterface.toggleForm)
    }
    return { menuInterfaceGenerate }
})();




const userInterface = (containerListName, itemStatus) => {
    let containerList = document.querySelector(containerListName) 

    // used throughout to access todolist object
    let grabItem = () => {
        let itemcheck = event.target.parentNode.firstChild.textContent
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
        let item = grabItem()
        let carrier = event.target.parentNode;
        carrier.classList.toggle('taller');
        console.log(carrier.childNodes)

        if (carrier.classList.contains('taller')) {
            console.log('ya')
            let description = document.createElement('p')
            description.textContent = item.description;
            description.classList.add('description');

            let dueDate = document.createElement('div');
            dueDate.textContent = item.dueDate;
            dueDate.classList.add('dueDate')

            let priority = document.createElement('div')
            priority.textContent = item.priority;
            priority.classList.add('priority')

            let props = [description, dueDate, priority];

            for (let i = 0; i < props.length; i++) {
                props[i].classList.add('bonus');
                carrier.appendChild(props[i]);
            };


            console.log('yo');
            console.log(carrier.childNodes);

        } else {
            console.log(carrier.childNodes)
            let len = carrier.childNodes.length;
            for (let i = len - 1; i > 0; i--) {
                console.log(i)
                console.log(carrier.childNodes[i])
                if (carrier.childNodes[i].classList.contains('bonus')) {
                    console.log('removing: ' + carrier.childNodes[i])
                    carrier.removeChild(carrier.childNodes[i])
                }
            }
            console.log(carrier.childNodes)
        }

    }

    // when you click the button, the item should become 'complete'
    let completeItem = () => { // CI will have to modify this / not use it. 
        console.log('completeItem')
        let item = grabItem()
        item.status = 'complete'
        console.log('completed!')
        controller.listgenerate();
    };

    // the tag buttons should be deletable
    function deleteTag() {
        let tag = event.target;
        console.log('tryna delete')
        let itemcheck = tag.parentNode.parentNode.firstChild.textContent;
        for (let i = 0; i < todolist.list.length; i++) {
            if (todolist.list[i].title === itemcheck) {
                todolist.list[i].deleteTag(tag.textContent)
                sorter.generateFilterList() // is this working? ....deleteTag isn't doing what we love. 
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
        tagButton.addEventListener('click', sortGenerate)
        tagButton.addEventListener('dblclick', deleteTag)
        tagCarrier.appendChild(tagButton);
    };

    // there should be a popup to write in a new tag
    function createNewTag() {
        console.log(this)
        console.log(this.parentNode)
        let item = grabItem()
        let newTag = prompt("New tag");
        item.addTag(newTag)
        sorter.generateFilterList()
        console.log("parent: " + event.target.parentNode)
        let carrier = event.target.parentNode;
        let tagCarrier = carrier.childNodes[2]
        createTagButton(newTag, tagCarrier)
    };

    // 
    let createCompleteButton = (carrier, item) => {
        let completeButton = document.createElement('button')
        completeButton.textContent = '√'
        completeButton.classList.add('completebutton')
        completeButton.addEventListener('click', completeItem)
        carrier.appendChild(completeButton);
    }

    // there should be a button for adding new tags
    function createNewTagButton(carrier, item) {
        let newTagButton = document.createElement('button')
        newTagButton.textContent = 'x'
        newTagButton.classList.add('newTagButton')
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

        // colorize
        if (item.priority === 'Low') {
            carrier.classList.add('Low')
        } else if (item.priority === 'Mid') {
            carrier.classList.add('Mid')
        } else {
            carrier.classList.add('High')
        }

        // add title
        createItemName(carrier, item)

        // add button for completion
        createCompleteButton(carrier, item)

        // add button for each tag 
        let tagCarrier = document.createElement('div')
        tagCarrier.classList.add('tagCarrier')
        for (let tag of item.tags) {
            createTagButton(tag, tagCarrier)
        }
        carrier.appendChild(tagCarrier)
        // add button for adding new tags
        createNewTagButton(carrier, item)

        containerList.appendChild(carrier);
    }

    function sortGenerate() { // CI will not need sortGenerate
        event.target.classList.toggle('sortingtag') // this gets wiped when displayItem is triggered

        let tags = []
        let tagelems = document.querySelectorAll('.sortingtag') // aw shit.
        tagelems.forEach((tag) => {
            tags.push(tag.textContent)
        })

        console.log('the tags: ' + tags);

        containerList.textContent = ''
        let sortedList = todolist.projectSort(tags)
        let i;
        for (i = 0; i < sortedList.length; i++) {
            displayItem(sortedList[i])
        }
    }

    // initialize list
    const generate = () => {
        containerList.textContent = ''
        for (let i = 0; i < todolist.list.length; i++) {
            if (todolist.list[i].status === itemStatus) { // CI will need 'complete'
                displayItem(todolist.list[i])
            }
        }
    }

    return { sortGenerate, generate }
};

const mainInterface = userInterface('#containerList', 'incomplete');
const completedInterface = userInterface('#completedList', 'complete');

const controller = (() => {
    const listgenerate = () => {
        mainInterface.generate();
        completedInterface.generate();
    }
    
    // this will trigger all the generations
    const generate = () => {
        sorter.generateFilterList();
        formInterface.formgenerate()
        menuInterface.menuInterfaceGenerate()
        listgenerate()
    }
    return { generate, listgenerate }
})();



controller.generate()