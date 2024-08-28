import { v4 as uuidv4 } from 'https://jspm.dev/uuid';
import { initialTodos, validationConfig } from "../utils/constants.js";
import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from '../components/Section.js';
import PopupWithForm from '../components/PopusWithForm.js';
import TodoCounter from '../components/TodoCounter.js';

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();
    const values = { name, date, id };
    const todo = generateTodo(values);
    section.addItem(todo);
    todoCounter.updateTotal(true);
    addTodoPopup.close();
    addTodoForm.reset();
  }
});

addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos, 
  renderer: (item) => {
    const todo = generateTodo(item); 
    section.addItem(todo);
  },
  containerSelector: ".todos__list",
});

section.renderItems();

function handleCheck(todoData) {
  todoCounter.updateCompleted(todoData.completed);
}

function handleDelete(todoData) {
  if (todoData.completed) {
    todoCounter.updateCompleted(false);
  }
  todoCounter.updateTotal(false);
}

function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

const todoNewValidator = new FormValidator(validationConfig, addTodoForm);
todoNewValidator.enableValidation();