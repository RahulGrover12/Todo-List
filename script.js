let text = document.querySelector("#input");
let list = document.querySelector(".task-list");

let todos = [];

text.addEventListener("keyup", addTodo);

function addTodo(e) {
  let val = e.target.value;

  if (e.keyCode === 13 && val !== "") {
    let todo = {
      name: val,
      isDone: false,
    };
    todos.push(todo);
    e.target.value = "";
    addingList();
  }
}

function addingList() {
  list.innerText = "";
  todos.forEach((item, index) => {
    let li = document.createElement("li");
    li.className = "flex space-between";
    let input = document.createElement("input");
    input.type = "checkbox";
    input.checked = item.isDone;
    input.name = "listItems";
    input.className = "w-5 h-3.5";
    let label = document.createElement("label");
    label.innerText = item.name;
    label.className = "-mt-1";
    let x = document.createElement("span");
    let pen = document.createElement("span");
    pen.className = "-mt-1 ml-25 cursor-pointer";
    x.className = "-mt-1 ml-5 text-xl text-red-700 font-bold cursor-pointer";
    x.classList.add("del");
    x.innerText = "X";
    pen.innerText = "✏️";
    li.append(input, label, pen, x);
    list.append(li);

    x.addEventListener("click", () => deleteItem(index));
    pen.addEventListener("click", () => editItem(index, pen, label));
  });
}
function deleteItem(index) {
  todos.splice(index, 1);
  addingList();
}

function editItem(index, pen, label) {
  pen.innerText = "📥";

  let input = document.createElement("input");
  input.type = "text";
  input.value = todos[index].name;
  label.innerText = "";
  label.append(input);
  input.placeholder = "Edit";
  input.focus();

  input.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      if (e.target.value != "") {
        let newText = input.value.trim();
        if (newText) {
          todos[index].name = newText;
        }
        addingList();
      } else {
        alert("Value can't be empty");
      }
    }
  });
}
