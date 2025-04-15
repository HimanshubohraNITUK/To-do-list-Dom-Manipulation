function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
    return todos;
}

function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    saveTodos(todos);
}

function deleteTodoFromLocalStorage(todoText) {
    let todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo !== todoText);
    saveTodos(todos);
}

function editTodoInLocalStorage(oldText, newText) {
    let todos = loadTodos();
    const index = todos.todoList.indexOf(oldText);
    if (index !== -1) {
        todos.todoList[index] = newText;
        saveTodos(todos);
    }
}

function appendTodoInHtml(todoText, isCompleted = false) {
    const todoList = document.getElementById("todoList");

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = todoText;
    span.className = "todo-text";
    if (isCompleted) {
        span.classList.add("completed");
    }

    // Complete button
    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Complete";
    completeBtn.className = "complete-btn";
    completeBtn.addEventListener("click", () => {
        span.classList.toggle("completed");
    });

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.className = "edit-btn";
    editBtn.addEventListener("click", () => {
        const newText = prompt("Edit your todo", span.textContent);
        if (newText !== null && newText.trim() !== "") {
            editTodoInLocalStorage(span.textContent, newText.trim());
            span.textContent = newText.trim();
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        deleteTodoFromLocalStorage(span.textContent);
    });

    li.appendChild(span);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
}


document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");

    submitButton.addEventListener("click", () => {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert("Please write something for the todo");
        } else {
            addTodoToLocalStorage(todoText);
            appendTodoInHtml(todoText);
            todoInput.value = '';
        }
    });

    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
});  


//  filter functionalities 

function setActiveFilter(btnId) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(btnId).classList.add('active');
}

document.getElementById("filterAll").addEventListener("click", () => {
    setActiveFilter("filterAll");
    document.querySelectorAll("#todoList li").forEach(li => {
        li.style.display = "flex";
    });
});

document.getElementById("filterCompleted").addEventListener("click", () => {
    setActiveFilter("filterCompleted");
    document.querySelectorAll("#todoList li").forEach(li => {
        const isCompleted = li.querySelector(".todo-text").classList.contains("completed");
        li.style.display = isCompleted ? "flex" : "none";
    });
});

document.getElementById("filterPending").addEventListener("click", () => {
    setActiveFilter("filterPending");
    document.querySelectorAll("#todoList li").forEach(li => {
        const isCompleted = li.querySelector(".todo-text").classList.contains("completed");
        li.style.display = !isCompleted ? "flex" : "none";
    });
});

