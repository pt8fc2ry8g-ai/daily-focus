const timerDisplay = document.querySelector("#timer");
const startButton = document.querySelector("#start-btn");
const pauseButton = document.querySelector("#pause-btn");
const resetButton = document.querySelector("#reset-btn");
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const progress = document.querySelector("#progress");

const focusMinutes = 25;
let remainingSeconds = focusMinutes * 60;
let timerId = null;

let todos = JSON.parse(localStorage.getItem("daily-focus-todos")) || [
  { text: "打开 GitHub 仓库", done: false },
  { text: "完成一次 commit", done: false },
  { text: "练习创建 Pull Request", done: false }
];

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderTimer() {
  timerDisplay.textContent = formatTime(remainingSeconds);
}

function saveTodos() {
  localStorage.setItem("daily-focus-todos", JSON.stringify(todos));
}

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.done ? " done" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todos[index].done = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    const text = document.createElement("span");
    text.textContent = todo.text;

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "remove";
    remove.textContent = "删除";
    remove.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    });

    item.append(checkbox, text, remove);
    todoList.append(item);
  });

  const doneCount = todos.filter((todo) => todo.done).length;
  progress.textContent = `${doneCount}/${todos.length}`;
}

function startTimer() {
  if (timerId) return;

  timerId = window.setInterval(() => {
    remainingSeconds -= 1;
    renderTimer();

    if (remainingSeconds <= 0) {
      window.clearInterval(timerId);
      timerId = null;
      remainingSeconds = 0;
      renderTimer();
    }
  }, 1000);
}

function pauseTimer() {
  window.clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = focusMinutes * 60;
  renderTimer();
}

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const text = todoInput.value.trim();
  if (!text) return;

  todos.push({ text, done: false });
  todoInput.value = "";
  saveTodos();
  renderTodos();
});

startButton.addEventListener("click", startTimer);
pauseButton.addEventListener("click", pauseTimer);
resetButton.addEventListener("click", resetTimer);

renderTimer();
renderTodos();
