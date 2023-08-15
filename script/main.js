let inputTask = document.querySelector("#taskInput");
let inputDate = document.querySelector("#inputDate");
let addTaskBtn =  document.querySelector("#addTaskBtn");
let toDoList = document.querySelector("#toDolist");

let doList = JSON.parse(localStorage.getItem("entries")) || []; // if there is no data on local storage -- initialized an empty array
let nextId = doList.length > 0 ? doList[doList.length - 1].id + 1 : 1;

let list = "";

if (doList.length === 0) {
    list = `<p id="noDo">Please Take your Rest.</p>`;
} else {
    doList.forEach((x) => {
        list += `<tr><td>${x.myList}</td><td>${x.myDAte}</td><td><button onclick="delet(${x.id})">Delete</button></td></tr>`;
    });
}

toDoList.innerHTML = list;

let addToDo = () => {
    let myDoList = {
        id: nextId,
        myList: inputTask.value,
        myDAte: inputDate.value
    };

    doList.push(myDoList);
    nextId++;

    localStorage.setItem("entries", JSON.stringify(doList));

    let item = document.createElement("tr");
    item.innerHTML = `<td>${myDoList.myList}</td><td>${myDoList.myDAte}</td><td><button onclick="delet(${myDoList.id})">Delete</button></td>`;

    toDoList.appendChild(item);

    let noDo = document.querySelector("#noDo");
    noDo.style.display = "none";
};

function delet(id) {
    doList = doList.filter(task => task.id !== id); // filter method for ID

    localStorage.setItem("entries", JSON.stringify(doList));
    document.location.reload(); // Reload the page to reflect the updated list
}

addTaskBtn.addEventListener("click", addToDo);