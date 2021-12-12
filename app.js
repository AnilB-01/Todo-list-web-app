// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");
const todos = document.getElementsByClassName("todo");

// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

// Functions

function here() {
  console.log(todoList);
}

//  Generating This Pattern

/* <div class="todo">
          <li class="todo-item"></li>
          <button class="complete-btn" >checked</button>
          <button class="trash-btn" >delete</button>
        </div>
  */

function addTodo(event) {
  // Prevent form from submitting
  event.preventDefault();
  // Todo DIV

  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // create LI
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  // ADD TODO TO localStorage
  saveLocalTodos(todoInput.value);
  //  CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //  CHECK TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  // APPEND TO LIST
  todoList.appendChild(todoDiv);

  // Clear Todo INPUT VALUE
  todoInput.value = "";
  completedOrNOt();
  //     along with the todo div creation, keep adding true, false in boolean array
  //       as per they contains "completed" class or not
}

function deleteCheck(e) {
  const item = e.target;

  // CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    completedOrNOt();
    //  modifying the boolean array at real time as they get checked as 'completed'
  }

  // It's just for debug purpose

  // console.log("you have clicked on: ");
  // console.log(item);
  // console.log("and its text value is:");
  // // console.log(item.innerText);   // works in case of li only , To generalise this--
  // console.log(item.parentElement.childNodes[0].innerText);
  // console.log("it's parent is:");
  // console.log(item.parentElement);

  // DELETE TODO
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // funcion calling to remove todo from localStorage
    // console.log("Calling deletion:");
    removeLocalTodos(todo);

    todo.addEventListener("transitionend", completedOrNOt);
    // falling Animation & removal of item
    todo.classList.add("fall");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
}

// Filtering Based on all, completed and uncompleted

function filterTodo(e) {
  for (let todo of todos) {
    // console.log(todo);
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  }
}

// Saving my todos in Local Storage

function saveLocalTodos(todo) {
  // CHECK --- HEY Do I already have things in there ?
  let Todos;
  if (localStorage.getItem("Todos") === null) {
    Todos = [];
  } else {
    Todos = JSON.parse(localStorage.getItem("Todos"));
  }
  // Just adding new String to String Array
  Todos.push(todo);

  localStorage.setItem("Todos", JSON.stringify(Todos));
}

// Getting back todos from localStorage to UI

function getTodos() {
  // CHECK --- HEY Do I already have things in there ?

  let Todos;
  let index = 0;

  // isCompleted is boolean array for which tells the completion of any todo as true, false
  isCompleted = JSON.parse(localStorage.getItem("boolArray"));

  // let isCompleted;
  if (localStorage.getItem("Todos") === null) {
    Todos = [];
  } else {
    Todos = JSON.parse(localStorage.getItem("Todos"));
  }

  Todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // while creating new todo we also checking kya usme pahle completed class tha ya nahi
    if (isCompleted[index++]) {
      todoDiv.classList.add("completed");
    }

    // create LI
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //  CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //  CHECK TRASH BUTTON
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // APPEND TO LIST
    todoList.appendChild(todoDiv);
  });
}

// Removing todos from the localStorage when they get deleted

function removeLocalTodos(todo) {
  // here todo is a todo div is a div
  // find the string to be removed
  let toBeRemoved = todo.childNodes[0].innerText;
  let index;

  let Todos;
  if (localStorage.getItem("Todos") === null) {
    Todos = [];
  } else {
    Todos = JSON.parse(localStorage.getItem("Todos"));
    index = Todos.indexOf(toBeRemoved);
  }

  var removedString = Todos.splice(index, 1);
  console.log("Removed String is " + removedString);
  localStorage.setItem("Todos", JSON.stringify(Todos));
}

/*  *-*-*-*-*-* Managing the completion of todos in local Storage     *-*-*-*-*-*-*         */

function completedOrNOt() {
  let isCompleted;
  if (localStorage.getItem("boolArray") === null) {
    isCompleted = [];
  } else {
    isCompleted = JSON.parse(localStorage.getItem("boolArray"));
  }
  /* very important concept applied here
  --->  just get from localstorage and clear it,
        so that we will have latest record at every deletion of todo              */

  isCompleted.splice(0); // clearing the boolean Arrya

  for (let todo of todos) {
    isCompleted.push(todo.classList.contains("completed"));
  }

  localStorage.setItem("boolArray", JSON.stringify(isCompleted));

  // console.log(isCompleted);
}
