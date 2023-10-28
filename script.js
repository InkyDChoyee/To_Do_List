const InputElem = document.querySelector('.input');
const ListElem = document.querySelector('.list');
const countItemsElem = document.querySelector('.count_items');
const showAll_btnElem = document.querySelector('.showAll_btn');
const showToDo_btnElem = document.querySelector('.showToDo_btn');
const showDone_btnElem = document.querySelector('.showDone_btn');
const clearDone_btnElem = document.querySelector('.clearDone_btn');


let todo = [];
let id = 0;


const setTodo = (newTodo) => {
    todo = newTodo;
}

const getAllTodo = () => {
    return todo;
}
const getToDo = () => {
    return todo.filter(todo => todo.isChecked === false);
}
const getDoneTodo = () => {
    return todo.filter(todo => todo.isChecked === true);
}

const setCountItems = () => {
    const allTodo = getAllTodo();
    countItemsElem.innerHTML = `${allTodo.length} items`;
}

const addTodo = (text) => {
    const newId = id++;
    const newTodo = getAllTodo().concat({id: newId, isCompleted: false, content: text});
    setTodo(newTodo);
    setCountItems();
    fillTodo();
}

const delTodo = (todoId) => {
    const newTodo = getAllTodo().filter(todo => todo.id !== todoId);
    setTodo(newTodo);
    setCountItems();
    fillTodo();
}
    

const doneTodo = (todoId) => {
    const newTodo = getAllTodo().map(todo => todo.id === todoId ? {...todo, isChecked:!todo.isChecked} : todo);
    setTodo(newTodo);
    setCountItems();
    fillTodo();
}   

const updateInput = (e, todoId) => {
    const todoElem = e.target.parentNode.querySelector('.todo');
    const inputText = todoElem.innerText;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('update_input');

    const closeInput = () => {
        todoElem.replaceWith(inputElem);
    };
    
    inputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            closeInput();
        }
    });
    
    
    inputElem.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('update_input')) {
            closeInput();
        }
    });


    todoElem.replaceWith(inputElem);
}

const updateTodo = (newText, todoId) => {
    const newTodo = getAllTodo().map(todo => todo.id === todoId ? { ...todo, content: newText } : todo);
    setTodo(newTodo);
    setCountItems();
    fillTodo();
}

let nowShowType = 'all';
const setNowShowType = (newShowType) => nowShowType = newShowType;

const clickShowType = (e) => {
    const nowBtnElem = e.target;
    const newShowType = nowBtnElem.dataset.type;

    if(nowShowType === newShowType) return;

    const beforeBtnElem = document.querySelector(`.show-${nowShowType}-btn`);
    beforeBtnElem = classList.remove('selected');

    nowBtnElem.classList.add('selected');
    setNowShowType(newShowType);

    fillTodo();
}





const fillTodo = () => {
    ListElem.innerHTML = '';
    const allTodo = getAllTodo();

    allTodo.forEach(todo => {
        const itemElem = document.createElement('li');
        itemElem.classList.add('item');

        const checkElem = document.createElement('div');
        checkElem.classList.add('check');
        checkElem.addEventListener('click', () => doneTodo(todo.id));

        const todoElem = document.createElement('div');
        todoElem.classList.add('todo');
        todoElem.innerText = todo.content;

        const updateElem = document.createElement('button');
        updateElem.classList.add('update');
        updateElem.addEventListener('click', (event) => updateInput(event, todo.id));
        updateElem.innerHTML = '✏️';

        const todoTextElem = document.createElement('span');
        todoTextElem.classList.add('todo');
        todoTextElem.innerText = todo.content;

        const delElem = document.createElement('button');
        delElem.classList.add('del');
        delElem.addEventListener('click', () => delTodo(todo.id));
        delElem.innerHTML = '❌'; 

        if(todo.isChecked) {
            itemElem.classList.add('checked');
            checkElem.innerText = '✔️';
        }
        
        itemElem.appendChild(checkElem);
        itemElem.appendChild(todoElem);
        itemElem.appendChild(updateElem);
        itemElem.appendChild(delElem);

        ListElem.appendChild(itemElem);
    })
}

const init = () => {
    InputElem.addEventListener('keypress', (e) => {
        if(e.key ==='Enter') {
            addTodo(e.target.value);
            InputElem.value = '';
        }
    })

    setCountItems();

    showAll_btnElem.addEventListener('click', clickShowType);
    showToDo_btnElem.addEventListener('click', clickShowType);
    showDone_btnElem.addEventListener('click', clickShowType);

    clearDone_btnElem.addEventListener('click', clearDoneTodo);

}

init()







