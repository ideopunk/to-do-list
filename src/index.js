import './styles.css';
import { todoitem } from './todoitem.js'
import todolist from './todolist.js'

// testers
let dogtask = todoitem('Walk dog', "Just around the block", "2020-07-11", "Low")
let lotteryTask = todoitem('Win lottery', "Powerball", "2021-07-11", "Mid")
let bonusTask = todoitem('Go home', "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", "2022-07-11", "High");
let finishedTask = todoitem('Buy the moon', 'On sale', '2020-01-01', 'High');

finishedTask.status = 'complete'
dogtask.addTag('Exercise')
dogtask.addTag('Pets')
lotteryTask.addTag('Exercise')
bonusTask.addTag('Pets')

todolist.addToList(dogtask)
todolist.addToList(lotteryTask)
todolist.addToList(finishedTask)
todolist.addToList(bonusTask)


const sorter = (() => {

    function generateFilterList() {
        const sortForm = document.querySelector('#sortList')
        const sortTop = document.querySelector('#sorttop')
        sortTop.addEventListener('click', selectorController.filterToggle)
        sortForm.textContent = '';

        let tagList = []
        let potentialTags = document.querySelectorAll('.tagButton')
        potentialTags.forEach((tag) => {
            console.log(tag.textContent)
            tagList.push(tag.textContent)
        });

        tagList = [...new Set(tagList)];

        console.log(`taglist: ${tagList}`)

        for (let elem of tagList) {
            let tagLine = document.createElement('button')
            tagLine.classList.add('tagLine');
            tagLine.value = elem;
            tagLine.textContent = elem;
            tagLine.addEventListener('click', mainInterface.sortGenerate)
            sortForm.appendChild(tagLine)
        }
    }

    return { generateFilterList }
})();


const formInterface = (() => {
    function addItem() {
        let title = document.querySelector('#title').value
        let description = document.querySelector('#description').value
        let dueDate = document.querySelector('#dueDate').value
        let priority = document.querySelector('#priority').value
        let tags = document.querySelector('#tags').value
        let newItem = todoitem(title, description, dueDate, priority)
        if (tags.length > 0) {
            tags = tags.split(' ');
            tags.forEach((tag) => {
                newItem.addTag(tag)
            })
            sorter.generateFilterList();
        }

        if (title.length === 0) {
            alert('Title is required')
            
        }
        else {
            todolist.addToList(newItem)
            selectorController.formToggle();
            document.querySelector('#title').value = ''
            document.querySelector('#description').value = ''
            document.querySelector('#dueDate').value = ''
            document.querySelector('#priority').value = 'Low'
            document.querySelector('#tags').value = ''
            mainInterface.displayItem(newItem)
        }
        // mainInterface.generate()
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
        clear.addEventListener('click', mainInterface.generate)
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
        let item = grabItem()
        let carrier = event.target.parentNode;
        // carrier.classList.toggle('taller');
        // if (carrier.classList.contains('taller')) {
        //     carrier.classList.remove('shorter')
        // } else {
        //     carrier.classList.add('shorter')
        // }



        if (!carrier.classList.contains('taller')) {
            let description = document.createElement('p')
            description.textContent = item.description;
            description.classList.add('description');

            let dueDate = document.createElement('div');
            dueDate.textContent = item.dueDate;
            dueDate.classList.add('dueDate')

            let priority = document.createElement('div')
            priority.textContent = `Priority: ${item.priority}`;
            priority.classList.add('priority')

            let props = [description, dueDate, priority];

            for (let i = 0; i < props.length; i++) {
                props[i].classList.add('bonus');
                carrier.appendChild(props[i]);
            };

            carrier.classList.add('taller')
            carrier.classList.remove('shorter')

        } else {
            carrier.classList.add('shorter');
            carrier.classList.remove('taller');
            let len = carrier.childNodes.length;
            for (let i = len - 1; i > 0; i--) {
                if (carrier.childNodes[i].classList.contains('bonus')) {
                    carrier.removeChild(carrier.childNodes[i])
                }
            }
        }

    }


    // when you click the button, the item should become 'complete'
    let completeItem = () => { 
        let carrier = event.target.parentNode;
        carrier.classList.add('goodbye')
        console.log(carrier)
        let item = grabItem()
        item.status = 'complete'
        console.log('completed!')
        completedInterface.displayItem(item)
        setTimeout(() => {
            carrier.parentNode.removeChild(carrier);
        }, 300);
    };

    // the tag buttons should be deletable
    function deleteTag() {
        let tag = event.target;
        console.log('tryna delete')
        let itemcheck = tag.parentNode.parentNode.firstChild.textContent;
        tag.classList.add('byenow')
        for (let i = 0; i < todolist.list.length; i++) {
            if (todolist.list[i].title === itemcheck) {
                todolist.list[i].deleteTag(tag.textContent)
                 // is this working? ....deleteTag isn't doing what we love.
                console.log('delete!')
                break;
            }
        }

        
        setTimeout(() => {
            tag.parentNode.removeChild(tag);
            console.log('ye')
            sorter.generateFilterList();
            console.log('ya')
        }, 300);
    }

    // there should be little buttons for each tag
    function createTagButton(tag, tagCarrier) {
        let tagButton = document.createElement('button')
        tagButton.classList.add('tagButton')
        tagButton.textContent = tag;
        tagButton.addEventListener('click', sortGenerate)
        tagButton.addEventListener('contextmenu', deleteTag)
        tagCarrier.appendChild(tagButton);
    };

    // there should be a popup to write in a new tag
    function createNewTag() {
        let item = grabItem()
        let newTag = prompt("New tag");
        if (newTag) {
            item.addTag(newTag)
            let carrier = event.target.parentNode;
            let tagCarrier = carrier.childNodes[2];
            createTagButton(newTag, tagCarrier);
            sorter.generateFilterList()
        }
    };

    // there should be a button for marking it as complete.
    let createCompleteButton = (carrier) => {
        let completeButton = document.createElement('button')
        completeButton.textContent = '√'
        completeButton.classList.add('completebutton')
        completeButton.addEventListener('click', completeItem)
        carrier.appendChild(completeButton);
    }

    // there should be a button for adding new tags
    function createNewTagButton(carrier) {
        let newTagButton = document.createElement('button')
        newTagButton.textContent = 'x'
        newTagButton.classList.add('newTagButton')
        newTagButton.addEventListener('click', createNewTag)
        carrier.appendChild(newTagButton)
    }

    // there should be an item name (which, when clicked, expands)
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
        carrier.classList.add('new');
        if (containerListName === '#containerList') { 
            carrier.classList.add('mainitem')
        }
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


        // add button for adding new tags
        createNewTagButton(carrier)

        // add button for each tag
        let tagCarrier = document.createElement('div')
        tagCarrier.classList.add('tagCarrier')
        for (let tag of item.tags) {
            createTagButton(tag, tagCarrier)
        }
        carrier.appendChild(tagCarrier)

        // add button for completion
        if (itemStatus === 'incomplete') {
            createCompleteButton(carrier)
        }

        containerList.appendChild(carrier);
    }

    function removeLeftHighlighting() {
        let tagLines = document.querySelectorAll('.tagLine');
        tagLines.forEach((tagLine) => {
            tagLine.classList.remove('focused')
        })
    }

    function sortGenerate() {
        // event.target.classList.toggle('sortingtag')
        console.log(event.target.textContent + 'ya')

        // remove existing highlighting from left menu tags
        removeLeftHighlighting()

        let i;

        // get a unique list of all the active tags.
        let tagelems = document.querySelectorAll('.sortingtag')
        let preUniqueTagElems = []
        for (i = 0; i < tagelems.length; i++) {
            preUniqueTagElems.push(tagelems[i].textContent)
        }

        // preUniqueTagElems.push(event.target.textContent)
        let uniqueTagElems = [...new Set(preUniqueTagElems)];


        let x = 0;
        for (i = 0; i < uniqueTagElems.length; i++) {
            if (uniqueTagElems[i] === event.target.textContent) {
                uniqueTagElems.splice(i, 1);
                x = 1;
            }
        }

        if (x === 0) {
            uniqueTagElems.push(event.target.textContent)
        }


        containerList.textContent = ''
        let sortedList = todolist.projectSort(uniqueTagElems)
        for (i = 0; i < sortedList.length; i++) {
            if (todolist.list[i].status === itemStatus) {
                displayItem(sortedList[i])
            }
        }
        const allTags = document.querySelectorAll('.tagButton')
        const tagLines = document.querySelectorAll('.tagLine')

        uniqueTagElems.forEach((tag) => {
            let thevalue = tag;
            allTags.forEach((btntag) => {
                if (btntag.textContent === thevalue) {
                    btntag.classList.toggle('sortingtag')
                }
            })

            // bold the tags in the left menu accordingl.
            tagLines.forEach((tagline) => {
                if (tagline.textContent === tag) {
                    tagline.classList.add('focused');
                }
            })
        })

        // you must add in a function like the above forEach just to color in the sortButtons!

        // let testTags = document.querySelectorAll('.tagButton')
        // for (let tag of testTags) {
        //     if (tag.classList.contains('sortingtag')) {
        //         console.log(tag)
        //     }
        // }
    }

    // initialize list
    const generate = () => {
        containerList.textContent = ''
        removeLeftHighlighting()
        if (containerListName === '#completedList') {
            let completedbutton = document.querySelector('#returncompleted')
            completedbutton.addEventListener('click', selectorController.completeToggle)
        }
        for (let i = 0; i < todolist.list.length; i++) {
            if (todolist.list[i].status === itemStatus) { // CI will need 'complete'
                displayItem(todolist.list[i])
            }
        }
    }

    return { createCompleteButton, displayItem, sortGenerate, generate }
};


const mainInterface = userInterface('#containerList', 'incomplete');
const completedInterface = userInterface('#completedList', 'complete');


const selectorController = (() => {
    const container = document.querySelector('#container')
    
    const filterToggler = document.querySelector('#ex')
    const filter = document.querySelector('#sortForm');

    const formToggler = document.querySelector('#plus')
    const form = document.querySelector('#newItemForm')

    const completedToggler = document.querySelector('#checkmark')
    const complete = document.querySelector('#completedContainer')


    function filterToggle() {
        filterToggler.classList.toggle('hide')
        filterToggler.classList.toggle('transitionleft')
        filterToggler.classList.toggle('disappearleft')

        filter.classList.remove('hide')
        filter.classList.toggle('transitionleft')
        filter.classList.toggle('disappearleft')
    }

    function formToggle() {
        formToggler.classList.toggle('hide');
        formToggler.classList.toggle('transitionright')
        formToggler.classList.toggle('disappearright')
        
        container.classList.toggle('transparent')
        filterToggler.classList.toggle('transparent');
        filter.classList.toggle('transparent');
        completedToggler.classList.toggle('transparent');
        complete.classList.toggle('transparent');

        form.classList.remove('hide');
        form.classList.toggle('transitionright');
        form.classList.toggle('disappearright');
    }

    function completeToggle() {
        completedToggler.classList.toggle('hide');
        completedToggler.classList.toggle('transitionright')
        completedToggler.classList.toggle('disappearright')

        complete.classList.remove('hide');
        complete.classList.toggle('transitionright');
        complete.classList.toggle('disappearright');
    }

    const generate = () => {
        filterToggler.addEventListener('click', filterToggle)
        formToggler.addEventListener('click', formToggle)
        completedToggler.addEventListener('click', completeToggle)
    }

    return { filterToggle, formToggle, completeToggle, generate, }
})();


const controller = (() => {
    const listgenerate = () => {
        mainInterface.generate();
        completedInterface.generate();
    }

    // this will trigger all the generations
    const generate = () => {
        formInterface.formgenerate();
        menuInterface.menuInterfaceGenerate();
        listgenerate();
        sorter.generateFilterList();
        selectorController.generate();
    }
    return { generate, listgenerate }
})();



controller.generate()