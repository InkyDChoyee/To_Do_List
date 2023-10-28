const InputElem = document.querySelector('.input');
const ListElem = document.querySelector('.list');
const countItemsElem = document.querySelector('.count_items');
const showAll_btnElem = document.querySelector('.showAll_btn');
const showToDo_btnElem = document.querySelector('.showToDo_btn');
const showDone_btnElem = document.querySelector('.showDone_btn');
const clearDone_btnElem = document.querySelector('.clearDone_btn');


let todos = [];
let id = 0;

let nowShowType = 'All';
const setNowShowType = (newShowType) => nowShowType = newShowType;


const setTodos = (newTodos) => {
    todos = newTodos;
}

const getAllTodos = () => {
    return todos;
}
const getToDos = () => {
    return todos.filter(todo => todo.isChecked === false);
}
const getDoneTodos = () => {
    return todos.filter(todo => todo.isChecked === true);
}

const setCountItems = () => {
    const allTodos = getAllTodos();
    countItemsElem.innerHTML = `${allTodos.length} items`;
}

const addTodos = (text) => {
    const newId = id++;
    const newTodos = getAllTodos().concat({id: newId, isChecked: false, content: text});
    setTodos(newTodos);
    setCountItems();
    fillTodos();
}

const delTodo = (todoId) => {
    const newTodos = getAllTodos().filter(todo => todo.id !== todoId);
    setTodos(newTodos);
    setCountItems();
    fillTodos();
}
    

const doneTodo = (todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? {...todo, isChecked:!todo.isChecked} : todo);
    setTodos(newTodos);
    setCountItems();
    fillTodos();
}   

const updateInput = (e, todoId) => {
    const todoElem = e.target.parentNode.querySelector('.todo');
    const inputText = todoElem.innerText;
    const itemElem = todoElem.parentNode;
    const inputElem = document.createElement('input');
    inputElem.value = inputText;
    inputElem.classList.add('update_input');
    
    const ClickOtherPlace = (e) => {
        if (!itemElem.contains(e.target) && e.target !== inputElem) {
            const inputElements = itemElem.querySelectorAll('input.update_input');
            inputElements.forEach(inputElement => {
                itemElem.removeChild(inputElement);
            });
            document.body.removeEventListener('click', ClickOtherPlace);
        }
    };

    inputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            updateTodo(e.target.value, todoId);
            const inputElements = itemElem.querySelectorAll('input.update_input');
            inputElements.forEach(inputElement => {
                itemElem.removeChild(inputElement);
            });
            document.body.removeEventListener('click', ClickOtherPlace);
        }
    });
    
    document.body.addEventListener('click', ClickOtherPlace);
    itemElem.appendChild(inputElem);
}

const updateTodo = (newText, todoId) => {
    const newTodos = getAllTodos().map(todo => todo.id === todoId ? { ...todo, content: newText } : todo);
    setTodos(newTodos);
    setCountItems();
    fillTodos();
}

const clearDoneTodo = () => {
    const newTodos = getToDos();
    setTodos(newTodos);
    setCountItems();
    fillTodos();
}

const fillTodo = (todo) => {
    const itemElem = document.createElement('li');
        itemElem.classList.add('item');

        itemElem.setAttribute('data-id', todo.id);

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
    }


const fillTodos = () => {
    ListElem.innerHTML = '';

    switch (nowShowType) {
        case 'All':
            const allTodo = getAllTodos();
            allTodo.forEach(todo => {fillTodo(todo);});
            break;
        case 'ToDo':
            const ToDo = getToDos();
            ToDo.forEach(todo => {fillTodo(todo);});
            break;
        case 'Done':
            const DoneTodo = getDoneTodos();
            DoneTodo.forEach(todo => {fillTodo(todo);});
            break;
        default:
            break;
    }
}


const clickShowType = (e) => {
    const nowBtnElem = e.target;
    const newShowType = nowBtnElem.dataset.type;

    if(nowShowType === newShowType) return;

    const beforeBtnElem = document.querySelector(`.show${nowShowType}_btn`);
    beforeBtnElem.classList.remove('selected');

    nowBtnElem.classList.add('selected');
    setNowShowType(newShowType);

    fillTodos();
}

const init = () => {
    InputElem.addEventListener('keypress', (e) => {
        if(e.key ==='Enter' && e.target.value.trim() !== '') {
            addTodos(e.target.value);
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