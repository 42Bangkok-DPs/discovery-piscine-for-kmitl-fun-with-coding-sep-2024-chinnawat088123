$(document).ready(function() {
    const $ft_list = $('#ft_list');
    let savedTodos = getCookie('todos');

    if (savedTodos) {
        let todos = JSON.parse(savedTodos);
        todos.forEach(todo => addTodoToDOM(todo));
    }

    function addTodoToDOM(todo) {
        const $todoDiv = $('<div></div>').text(todo);

        $todoDiv.on('click', function() {
            if (confirm("Are you sure you want to delete this task?")) {
                $todoDiv.remove();
                saveTodosToCookie();
            }
        });

        $ft_list.prepend($todoDiv);
    }

    $('#newBtn').on('click', function() {
        let newTodo = prompt("Enter a new TO DO:");
        if (newTodo) {
            addTodoToDOM(newTodo);
            saveTodosToCookie();
        }
    });

    function saveTodosToCookie() {
        let todos = [];

        $ft_list.children().each(function() {
            todos.push($(this).text());
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
});