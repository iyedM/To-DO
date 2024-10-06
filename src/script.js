let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

const todoValue = document.getElementById("todotext");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("addClick");
const deadlineInput = document.getElementById("deadline");

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message, color = "red") {
    todoAlert.removeAttribute("class");
    todoAlert.innerText = message; 
    todoAlert.style.color = color; 
    setTimeout(() => {
        todoAlert.classList.add("toggleMe");
      }, 1000);
}

function createItem() {
    todoAlert.innerText = "";

    if (todoValue.value === "" || deadlineInput.value === "") {
        setAlertMessage("Please enter a ToDo text and deadline!");
        todoValue.focus();
    } else {
        let isPresent = false;

        todo.forEach(element => {
            if (element.item === todoValue.value) {
                isPresent = true;
            }
        });

        if (isPresent) {
            setAlertMessage("This item already exists in the list");
            return;
        }

        let li = document.createElement("li");
        const todoItems = `
            <div title="Double Click to Complete" ondblclick="CompletedToDoItems(this)">
                ${todoValue.value}
                <span class="deadline-time" style="color: red;">${getRemainingTime(deadlineInput.value)}</span>
            </div>
            <div>
                <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="../images/pencil.png" />
                <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="../images/delete.png" />
            </div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        setAlertMessage("Item added successfully!", "green");

        let itemList = { item: todoValue.value, deadline: deadlineInput.value, status: false };
        todo.push(itemList);
        setLocalStorage();
    }
}

function readTodoItems() {
    todo.forEach((element) => {
        let li = document.createElement("li");
        let style = element.status ? "style='text-decoration: line-through'" : "";
        const todoItems = `
            <div ${style} title="Double Click to Complete" ondblclick="CompletedToDoItems(this)">
                ${element.item}
                <span class="deadline-time" style="color: red;">${getRemainingTime(element.deadline)}</span>
            </div>
            <div>
                ${!element.status ? '<img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="../images/pencil.png" />' : ""}
                <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="../images/delete.png" />
            </div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}

readTodoItems();

function getRemainingTime(deadline) {
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const remainingTime = deadlineDate - now;

    if (remainingTime <= 0) {
        return "Deadline passed!";
    } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

        return `   Time remaining:  ${days}d ${hours}h ${minutes}m left`;
    }
}

function UpdateToDoItems(e) {
    if (e.parentElement.parentElement.querySelector("div").style.textDecoration === "") {
        todoValue.value = e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdate.setAttribute("src", "//images/refresh.png");
        todoValue.focus();
    }
}

function UpdateOnSelectionItems() {
    let isPresent = false;
    todo.forEach((element) => {
        if (element.item === todoValue.value) {
            isPresent = true;
        }
    });

    if (isPresent) {
        setAlertMessage("This item already exists");
        return;
    }

    todo.forEach((element) => {
        if (element.item === updateText.innerText.trim()) {
            element.item = todoValue.value;
        }
    });

    updateText.innerText = todoValue.value;
    setLocalStorage();
    todoValue.value = "";
    addUpdate.setAttribute("onclick", "createItem()");
    addUpdate.setAttribute("src", "../images/add.png");
}

function DeleteToDoItems(e) {
    let listItem = e.parentElement.parentElement.querySelector("div").innerText.trim();
    todo = todo.filter(item => item.item !== listItem);
    e.parentElement.parentElement.classList.add("deleted-item");

    setTimeout(() => {
        e.parentElement.parentElement.remove();
        setAlertMessage("Deleted successfully!", "green");
        setLocalStorage();
    }, 1000);
}

function CompletedToDoItems(e) {
    e.style.textDecoration = "line-through";
    todo.forEach((element) => {
        if (element.item === e.innerText.trim()) {
            element.status = true;
        }
    });
    setLocalStorage();
}
