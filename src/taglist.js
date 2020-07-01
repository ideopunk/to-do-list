const tagList = (() => {
    let list = []
    const tagFactory = name => {
        let count = 1;
        const countup = () => {
            count++; // might need to be this.count++
        }
        const countdown = () => {
            count--; // same
        }
        return { name, count, countup, countdown };
    };

    function posUpdate(tag) {
        let x = 0;
        for (let elem of list) {
            if (elem.name === tag) {
                elem.countup();
                x = 1;
                break;
            }
        }

        if (x === 0) {
            let newTag = tagFactory(tag);
                list.push(newTag);
        }
    }

    function negUpdate(tag) {
        for (let elem of list) {
            if (elem.name === tag) {
                elem.countdown();
                if (elem.count < 1) {
                    list.splice(elem, 1) // might need to be this.list
                }
            }
        }
    }

    return {list, tagFactory, posUpdate, negUpdate};
})();

export default tagList;