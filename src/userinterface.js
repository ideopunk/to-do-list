const userInterface = (() => {
    let containerList = document.querySelector('#containerList')

    // when you click on any item, it should expand to show full details
    function expand(event) {
        console.log(event.target)
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

    // 
    function createCompleteButton(carrier, item) {
        let completeButton = document.createElement('button')
        completeButton.textContent = '?'
        completeButton.classList.add('completebutton')
        completeButton.addEventListener('click', completeItem(carrier, item))
        carrier.appendChild(completeButton);
    }

    // there should be a button for adding new tags
    function createNewTagButton(carrier, item) {
        let newTagButton = document.createElement('button')
        newTagButton.textContent = '+'
        newTagButton.classList.add('newTagButton')
        newTagButton.addEventListener('click', createNewTag(item))
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
        containerList.textContent = ''
        for (let i = 0; i < todolist.list.length; i++) { 
            displayItem(todolist.list[i])
        }
    }

    return { generate}
})();

export default userInterface;