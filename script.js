const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list");
const totalCount = document.getElementById("total-count");
const completedCount = document.getElementById("completed-count");

function addTask() {
    if (inputBox.value === "") {
        alert("You must write a task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);

        // Add Edit Button
        let editButton = document.createElement("button");
        editButton.innerHTML = "Edit";
        editButton.classList.add("edit-btn");
        li.appendChild(editButton);

        // Add Delete Button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // delete icon
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    updateCounters();
}

// Event listener 
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
        updateCounters();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
        updateCounters();
    } else if (e.target.classList.contains("edit-btn")) {
        let li = e.target.parentElement;
        let newTaskDescription = prompt("Edit your task:", li.firstChild.textContent);
        if (newTaskDescription && newTaskDescription.trim() !== "") {
            li.firstChild.textContent = newTaskDescription;
            saveData();
        }
    }
}, false);

// Function to update counters
function updateCounters() {
    const totalTodos = listContainer.getElementsByTagName("li").length;
    const completedTodos = listContainer.getElementsByClassName("checked").length;
    totalCount.textContent = totalTodos;
    completedCount.textContent = completedTodos;
}

// Local storage handling
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
    const savedTasks = localStorage.getItem("data");
    if (savedTasks) {
        listContainer.innerHTML = savedTasks;
    }
    updateCounters();
}

// Initialize tasks when page loads
showTask();
