//🚨🚨🚨 = come back to code below fix it or add to it.
const addCircle = document.getElementById("addCircle");
const mainAddTaskForm = document.getElementById("mainAddTask");
const blurBackground = document.getElementById("blurBackground");
const exitAddTask = document.getElementById("exitAddTask");
// Function Below toggles add task form and blurs backgroudn accordingly.
// 🚨🚨🚨should add a reset everytime form is hidden so when it opens its not filled w/ thext
const activateAddTaskButton =() =>{
    addCircle.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("hidden", "visible")
        blurBackground.classList.replace("hidden", "visible")
    });
    exitAddTask.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
    blurBackground.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
};

let toDoTasksArray = [];

const toDoFactory = (title, description, dueDate, priority) => {
    const sayHello = () => console.log('hello!');
    return { sayHello , title, description, dueDate, priority};
  };
  //🚨🚨🚨these sample dates are not working, need to look into the API
const exampleTask1 = toDoFactory("Example JS 1", "example Description", (new Date()).toLocaleDateString(), "highPriority");
const exampleTask2 = toDoFactory("Example JS 2", "example Description", (new Date()).toLocaleDateString(), "mediumPriority");
const exampleTask3 = toDoFactory("Example JS 3", "example Description", (new Date()).toLocaleDateString(), "lowPriority");

toDoTasksArray.push(exampleTask1, exampleTask2, exampleTask3);

const logs = () =>{
    console.log(exampleTask2.priority);
}
const taskList = document.getElementById("taskList");
const taskInfoPopUp = document.getElementById("taskInfoPopUp");
const displayToDoTasksArray = () =>{
    toDoTasksArray.forEach((element, index) =>{
        //🚨🚨🚨this is probably would be dom stuff
        const taskDiv = document.createElement("div");
        taskList.appendChild(taskDiv);
        taskDiv.classList.add("task");

        taskDiv.classList.add( element.priority);

        const taskDivChild = document.createElement("div");
        taskDivChild.classList.add("taskCheckBox","unselectedCheckBox");
        taskDiv.appendChild(taskDivChild);
        const pForTitle = document.createElement("p");
        pForTitle.classList.add("taskTitle");
        pForTitle.innerHTML = element.title;
        taskDiv.appendChild(pForTitle);
        const task2ndDivChild = document.createElement("div")
        task2ndDivChild.classList.add("taskIconsDiv");
        
        const childDivDate = document.createElement("div");
        const childDivInfo = document.createElement("div");
        const childDivEdit = document.createElement("div");
        const childDivDelete = document.createElement("div");
        childDivDate.classList.add("date");
        //🚨🚨🚨these dates are not working, need to look into the API
        childDivDate.innerHTML = (new Date()).toLocaleDateString();
        childDivInfo.classList.add("taskIcon", "infoTaskIcon");
        childDivEdit.classList.add("taskIcon", "editTaskIcon");
        childDivDelete.classList.add("taskIcon", "deleteTaskIcon");
        task2ndDivChild.appendChild(childDivDate);
        task2ndDivChild.appendChild(childDivInfo);
        task2ndDivChild.appendChild(childDivEdit);
        task2ndDivChild.appendChild(childDivDelete);
        taskDiv.appendChild(task2ndDivChild);

    });
    activateDetailsButton();
};
const infoTaskIconArray = document.querySelectorAll(".infoTaskIcon")
//🚨🚨🚨this function only works for the icon thats in html
const activateDetailsButton = ()=>{
    infoTaskIconArray.forEach(element =>{
        element.addEventListener("click", ()=>{
            taskInfoPopUp.classList.replace("hidden", "visible");
            blurBackground.classList.replace("hidden", "visible")
        });
    });
};





export {activateAddTaskButton, logs, displayToDoTasksArray, activateDetailsButton};