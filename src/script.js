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
    todoAlert.style.color = color; // Change la couleur du message (par défaut rouge)
}

function createItem() {
    todoAlert.innerText = ""; // Réinitialise le message d'alerte

    if (todoValue.value === "") {
        setAlertMessage("Please Enter A ToDo text !"); // Message d'erreur en rouge
        todoValue.focus();
    } else {
        let isPresent = false;

        // Vérifier si l'élément existe déjà dans la liste
        todo.forEach(element => {
            if (element.item == todoValue.value) {
                isPresent = true;
            }
        });

        if (isPresent) {
            setAlertMessage("This Item Is Already Exists in the list");
            return;
        }

        let li = document.createElement("li");
        const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)"> ${todoValue.value}</div><div>
                            <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="../images/pencil.png" />
                            <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="../images/delete.png" /></div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);

        // Alerte de succès et changement de couleur en vert
        setAlertMessage("Item added successfully!", "green");

        let itemList = { item: todoValue.value, status: false };
        todo.push(itemList);
        setLocalStorage();
    }
}

function readTodoItems() {
    todo.forEach((element) => {
        let li = document.getElementById("li");
        let style ="";
        if ( element.status) {
            style="style='text-decorations: line-through'";
        }
        const todoItems = `<div ${style} title="Hit Double Click and Complete" ondbclick="CompletedToDoItems(this)"> ${element.item} 
            ${
                style === ""
                ? ' <img class="edit todo-controls" onclick="UpdateToDoItems(this) src="//images/pencil.png" />'
                : ""
                }
                <img class="edit todo-controls" onclick="DeleteToDoItems(this) src="//images/delete.png" /> </div> </div>`;
        li.innerHTML = todoItems;
        listItems.appendChild(li);
    });
}
readTodoItems();

function UpdateToDoItems(e) {
    if (
        e.parentElement.parentElement.querySelector("div").style.textDecoration === ""
    ) {
        todoValue.value = 
        e.parentElement.parentElement.querySelector("div").innerText;
        updateText = e.parentElement.parentElement.querySelector("div");
        addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
        addUpdate.setAttribute("src", "//images/refresh.png");
        todoValue.focus() ;
    }
}

function UpdateOnSelectionItems() {
    let isPresent = false;
    todo.forEach((element) => {
        if (element.item === todoValue.value) {
            isPresent = true;
        }

    });

    if(isPresent) {
        setAlertMessage("This item is already exists");
        return;
    }

    todo.forEach((element) => {
        if (element.item == updateText.innerText.trim()) {
            element.item = todoValue.value;
        }
    });
    setLocalStorage();
    updateText.innerText = todoValue.value;
    addUpdate.setAttribute("onclick", "CreateItem()");
    addUpdate.setAttribute("src", "//images/add.png");
    todoValue.value = "";
    setAlertMessage("ToDo item updated successfully","blue");

}