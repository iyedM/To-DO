let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

const todoValue = document.getElementById("todotext");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("addClick");

function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message, color = "red") {
    todoAlert.innerText = message; 
    todoAlert.style.color = color; 
}

function createItem() {
    todoAlert.innerText = "";

    if (todoValue.value === "") {
        setAlertMessage("Please Enter A ToDo text !");
        todoValue.focus();
    } else {
        let isPresent = false;

        todo.forEach(element => {
            if (element.item === todoValue.value) {
                isPresent = true;
            }
        });

        if (isPresent) {
            setAlertMessage("This Item Already Exists in the list");
            return;
        }

        let li = document.createElement("li");
        const todoItems = `
            <div title="Double Click to Complete" ondblclick="CompletedToDoItems(this)">
                ${todoValue.value}
            </div>
            <div>
                <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="../images/pencil.png" />
                <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="../images/delete.png" />
            </div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        setAlertMessage("Item added successfully!", "green");

        let itemList = { item: todoValue.value, status: false };
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
    setLocalStorage();
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "createItem()");
    addUpdate.setAttribute("src", "//images/add.png");
    todoValue.value = "";
    setAlertMessage("ToDo item updated successfully", "blue");
}

function DeleteToDoItems(e) {
    let deleteValue = e.parentElement.parentElement.querySelector("div").innerText;
    if (confirm(`Are you sure you want to delete this ${deleteValue}?`)) {
        e.parentElement.parentElement.setAttribute("class", "deleted-item");
        todoValue.focus();

        todo = todo.filter((element) => element.item.trim() !== deleteValue.trim());

        setTimeout(() => {
            e.parentElement.parentElement.remove();
        }, 1000);
        setLocalStorage();
    }
}

function CompletedToDoItems(e) {
    if (e.parentElement.querySelector("div").style.textDecoration==="") {
        const img = document.createElement("img");
        img.src="//images/check.png";
        img.className= "todo-controls";
        e.parentElement.querySelector("div").style.textDecoration= "line-through";
        e.parentElement.querySelector("div").appendChild(img);
        e.parentElement.querySelector("img.edit").remove();

        todo.forEach((element) => {
            if (
                element.parentElement.querySelector("div").innerText.trim() == element.item
            ) {
                element.status= true;
            }
        });
        setLocalStorage();
        setAlertMessage("ToDo Item Completed Successfuly");
    }
}
