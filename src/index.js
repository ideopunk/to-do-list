import './styles.css';
import todoitem from './todoitem.js'
import userInterface from './userinterface.js'

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
        toggleForm()
        userInterface.generate()
    }
    
    function formgenerate() {
        let formsubmit = document.querySelector('#formsubmit')
        console.log('form generated')
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

formInterface.formgenerate()
menuInterface.menuInterfaceGenerate()
userInterface.generate()
console.log(todolist.list)