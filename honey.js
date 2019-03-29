var todoList = {
    todos: [],
    addTodos: function (whatever) {
        this.todos.push({
            todoText: whatever,
            completed: false
        });
    },
    changeTodos: function (position, whatever) {
        this.todos[position].todoText = whatever;
    },
    deleteTodos: function (position) {
        this.todos.splice(position, 1);
    },
    toggleCompleted: function (position) {
        var todo = this.todos[position];
        todo.completed = !todo.completed;
    },
    toggleAll: function () {
        var completedTodos = 0;
        var totalTodos = this.todos.length;

        this.todos.forEach(function (todo) {
            if (todo.completed === true) {
                completedTodos++;
            }
        });
        this.todos.forEach(function (todo) {
            if (completedTodos === totalTodos) {
                todo.completed = false;
            } else {
                todo.completed = true;
            }
        });
    }
};

var handlers = {
    addTodos: function () {
        var addTodoTextInput = document.getElementById('addTodoTextInput');
        todoList.addTodos(addTodoTextInput.value);
        addTodoTextInput.value = '';
        view.displayTodos();
    },
    changeTodos: function () {
        var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
        var changeTodoTextInput = document.getElementById('changeTodoTextInput');
        todoList.changeTodos(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value)
        changeTodoPositionInput.valueAsNumber = '';
        changeTodoTextInput.value = '';
        view.displayTodos();
    },
    deleteTodos: function (position) {
        todoList.deleteTodos(position);
        view.displayTodos();
    },
    toggleCompleted: function () {
        var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
        todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
        toggleCompletedPositionInput.valueAsNumber = '';
        view.displayTodos();
    },
    toggleAll: function () {
        todoList.toggleAll();
        view.displayTodos();
    }
};

var view = {
    displayTodos: function () {
        var todosUl = document.querySelector('ul');
        todosUl.innerHTML = '';
        todoList.todos.forEach (function (todo, position) {
            var todosLi = document.createElement('li');
                var todoTextWithCompletion = '';
    
                if (todo.completed === true) {
                    todoTextWithCompletion = '(X) ' + todo.todoText;
                } else {
                    todoTextWithCompletion = '( ) ' + todo.todoText;
                }
                todosLi.id = position;
                todosLi.textContent = todoTextWithCompletion;
                todosLi.appendChild(this.createDeleteButton());
                todosUl.appendChild(todosLi); 
        }, this);
    },
    createDeleteButton: function () {
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'deleteButton';
        return deleteButton;
    },
    setUpEventListener: function () {
        var todosUl = document.querySelector('ul');

        todosUl.addEventListener('click', function (event) {

            elementClicked = event.target;
            if (elementClicked.className = 'deleteButton') {
                handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
            }
        });
    }
};

view.setUpEventListener();
