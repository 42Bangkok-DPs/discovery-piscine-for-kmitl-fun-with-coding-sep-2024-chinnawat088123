window.onload = function() {
    const ft_list = document.getElementById('ft_list');
    let savedTodos = getCookie('todos');
    
    if (savedTodos) {
        let todos = JSON.parse(savedTodos);
        todos.forEach(todo => addTodoToDOM(todo));
    }
};

function addTodoToDOM(todo) {
    const ft_list = document.getElementById('ft_list');
    const todoDiv = document.createElement('div');
    todoDiv.textContent = todo;
    
    todoDiv.onclick = function() {
        if (confirm("Are you sure you want to delete this task?")) {
            ft_list.removeChild(todoDiv);
            saveTodosToCookie();
        }
    };

    ft_list.prepend(todoDiv);
}

document.getElementById('newBtn').onclick = function() {
    let newTodo = prompt("Enter a new TO DO:");
    if (newTodo) {
        addTodoToDOM(newTodo);
        saveTodosToCookie();
    }
};

function saveTodosToCookie() {
    const ft_list = document.getElementById('ft_list');
    let todos = [];

    ft_list.childNodes.forEach(todoDiv => {
        todos.push(todoDiv.textContent);
    });
    
    setCookie('todos', JSON.stringify(todos), 7); 
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}