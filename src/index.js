const addCircle = document.getElementById("addCircle");
const mainAddTaskForm = document.getElementById("mainAddTask");
const blurBackground = document.getElementById("blurBackground");
const exitAddTask = document.getElementById("exitAddTask");

function activateAddTaskButton(){
    addCircle.addEventListener("click", () => {
        mainAddTaskForm.classList.toggle("hidden");
        mainAddTaskForm.classList.toggle("visible");
        blurBackground.classList.toggle("hidden");
        blurBackground.classList.toggle("visible");
    });
    exitAddTask.addEventListener("click", () => {
        mainAddTaskForm.classList.toggle("hidden");
        mainAddTaskForm.classList.toggle("visible");
        blurBackground.classList.toggle("hidden");
        blurBackground.classList.toggle("visible");
    });
}

activateAddTaskButton();