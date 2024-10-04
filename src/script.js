let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

const todoValue = document.getElementById("todotext");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("addClick");

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
