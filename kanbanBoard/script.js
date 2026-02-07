let taskId = 0;

function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value;

  if (taskText === "") return;

  const task = document.createElement("div");
  task.className = "task";
  task.draggable = true;
  task.id = "task-" + taskId++;
  task.textContent = taskText;

  task.ondragstart = drag;

  document.getElementById("todo").appendChild(task);
  input.value = "";

  saveData();
}
function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function allowDrop(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  const taskId = event.dataTransfer.getData("text");
  const task = document.getElementById(taskId);
  event.target.appendChild(task);

  saveData();
}
function saveData() {
  const columns = ["todo", "doing", "done"];
  let data = {};

  columns.forEach(col => {
    const tasks = document.getElementById(col).querySelectorAll(".task");
    data[col] = [];
    tasks.forEach(task => data[col].push(task.textContent));
  });

  localStorage.setItem("kanbanData", JSON.stringify(data));
}
function loadData() {
  const data = JSON.parse(localStorage.getItem("kanbanData"));
  if (!data) return;

  Object.keys(data).forEach(col => {
    data[col].forEach(text => {
      const task = document.createElement("div");
      task.className = "task";
      task.textContent = text;
      task.draggable = true;
      task.id = "task-" + taskId++;
      task.ondragstart = drag;
      document.getElementById(col).appendChild(task);
    });
  });
}

loadData();
