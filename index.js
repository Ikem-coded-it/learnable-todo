class UIControls {
  showFormModal() {
    const formModal = document.querySelector(".form-modal");
    formModal.classList.add("show")
  }

  closeFormModal() {
    const formModal = document.querySelector(".form-modal");
    formModal.classList.remove("show")
  }

  createTodoTemplate(id, body, checked) {
    const template = document.createElement('div');
    template.classList.add("todo");
    template.setAttribute("data-id", `${id}`)
    template.innerHTML = `<div>
      <input type="checkbox"/>
      <p class="todo-text">${body}</p>
    </div>
  
    <div>
      <button data-id=${id} class="edit-btn">
        <i class="fa-regular fa-pen-to-square"></i>
      </button>
      <button data-id=${id} class="delete-btn">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>`

    return template
  }

  addNewTodoCard(todo) {
    const todoContainer = document.querySelector(".todos-container");
    const newTodoCard = this.createTodoTemplate(todo.id, todo.body, todo.checked);
    console.log(newTodoCard)
    todoContainer.appendChild(newTodoCard);
  }
}

class Todo {
  constructor(id, body) {
    this.id = id
    this.body = body
    this.checked = false
  }

  check() {
    this.check = true
  }

  unCheck() {
    this.check = false
  }
}

class Store {
  store = [];

  add(todo) {
    return this.store.push(todo)
  }

  edit(todoId, newBody) {
    this.store.map(todo => {
      if(todo.id === todoId) todo.body = newBody
    })
  }

  delete(todoId) {
    this.store.filter(todo => todo.id !== todoId)
  }
}

const ui = new UIControls();
const store = new Store();

const addTodoBtn = document.querySelector(".add-todo-btn");
const addTodoForm = document.querySelector(".todo-form");

function createTodo(e) {
  e.preventDefault()
  const body = e.target.body.value;
  const id = Math.floor(Math.random() * 1000000000);

  const todo = new Todo(id, body);
  store.add(todo);
  ui.addNewTodoCard(todo)

  e.target.body.value
  ui.closeFormModal()
}

addTodoBtn.addEventListener("click", () => ui.showFormModal())
addTodoForm.addEventListener("submit", (e) => createTodo(e))