import { debounce } from "lodash";
import { format, addDays } from 'date-fns';


const addProject = document.getElementById("addProject");
const addProjectPopUp = document.getElementById("addProjectPopUp");
const addProjectExitIcon = document.getElementById("addProjectExitIcon");
const editProjectExitIcon = document.getElementById("editProjectExitIcon");
const cancelNewProject = document.getElementById("cancelNewProject");
const confirmNewProject = document.getElementById("confirmNewProject");
const projectNameInput = document.getElementById("projectNameInput");
const projectsDropdown = document.getElementById("projectsDropdown");
const projectsDropdown_edit = document.getElementById("projectsDropdown_edit");
const projectNameInputForEdit = document.getElementById("projectNameInputForEdit")
const cancelEditProject = document.getElementById("cancelEditProject");
const projectDeletePopUp =document.getElementById("projectDeletePopUp");
const cancelDeletionEdit = document.getElementById("cancelDeletionEdit")
const projectDeletePopUpExit = document.getElementById("projectDeletePopUpExit");
const projectList = document.getElementById("projectList")
const editProjectPopUp = document.getElementById("editProjectPopUp");
const projectToggle = document.getElementById("projectToggle");
const projectDeletePopUpConfirmation= document.getElementById("projectDeletePopUpConfirmation");
const editProjectConfirmationEdit = document.getElementById("editProjectConfirmationEdit");
const taskList = document.getElementById("taskList");
const taskInfoPopUp = document.getElementById("taskInfoPopUp");
const taskInfoPopUpHeaderTitle = document.getElementById("taskInfoPopUpHeaderTitle");
const taskInfoPopUpInfoDescription = document.getElementById("taskInfoPopUpInfoDescription");
const taskInfoPopUpInfoDate = document.getElementById("taskInfoPopUpInfoDate");
const taskInfoPopUpInfoPriority = document.getElementById("taskInfoPopUpInfoPriority");
const taskInfoPopUpFooterProject = document.getElementById("taskInfoPopUpFooterProject");
const taskEditPopUp = document.getElementById("taskEditPopUp");
const exitEditTask = document.getElementById("exitEditTask");
const taskName_EditForm = document.getElementById("taskName_EditForm");
const info_EditForm = document.getElementById("info_EditForm");
const date_EditForm = document.getElementById("date_EditForm");
const lowPriorityBtn_EditForm = document.getElementById("lowPriorityBtn_EditForm");
const mediumPriorityBtn_EditForm = document.getElementById("mediumPriorityBtn_EditForm");
const highPriorityBtn_EditForm = document.getElementById("highPriorityBtn_EditForm");
const taskEditPopUpFooter = document.getElementById("taskEditPopUpFooter");
const mainTasksTitle = document.getElementById("mainTasksTitle");
const mainTasksTitleText = document.getElementById("mainTasksTitleText");
const mainTaskTitleIcon = document.getElementById("mainTaskTitleIcon");
const addTaskFormButton = document.getElementById("addTaskForm");
const taskName = document.getElementById("taskName");
const info = document.getElementById("info");
const date = document.getElementById("date");
const lowBtn = document.getElementById("lowPriorityBtn");
const mediumBtn = document.getElementById("mediumPriorityBtn");
const highBtn = document.getElementById("highPriorityBtn");
const allFilter = document.getElementById("allFilter");
const todayFilter = document.getElementById("todayFilter");
const weekFilter = document.getElementById("weekFilter");
const importantFilter = document.getElementById("importantFilter");
const completedFilter = document.getElementById("completedFilter");
const addCircle = document.getElementById("addCircle");
const mainAddTaskForm = document.getElementById("mainAddTask");
const blurBackground = document.getElementById("blurBackground");
const exitAddTask = document.getElementById("exitAddTask");
const taskInfoPopUpExit = document.getElementById("taskInfoPopUpExit");
const taskDeletePopUpExit = document.getElementById("taskDeletePopUpExit");
const taskDeletePopUp = document.getElementById("taskDeletePopUp");
const cancelDeletion =document.getElementById("cancelDeletion");
const taskDeletePopUpConfirm = document.getElementById("taskDeletePopUpConfirm");
let activeFilter = "";
let allTasksArray = []; //store All Tasks here.
let projectsArray = []; //store All Project Names here
const toDoFactory = (title, description, dueDate, priority, checked, project) => {
    return { title, description, dueDate, priority, checked, project};
};
const exampleTask1 = toDoFactory("Soccer Practice", "Pajaro Park with Uli for 1-2 hrs, then a 4 mile jog.", new Date('2023-02-06'), "mediumPriority", false, "Training");
const exampleTask2 = toDoFactory("Code", "Follow the Odin Project" ,format((new Date()), "MM-dd-yy"), "mediumPriority", false, "Coding");
const exampleTask3 = toDoFactory("Moms Birthday", "Shes turning 52", new Date('2023-7-08'), "highPriority", false, "none");
const exampleTask4 = toDoFactory("Soccer Indoor Game", "Indoor Game 3rd Divion with Gio",  format(addDays((new Date()), 3), "MM-dd-yy"), "highPriority", false, "Training");
const exampleTask5 = toDoFactory("Finish To-Do Project", "Powerhouse gym with Josie", new Date('2023-10-31'), "mediumPriority", true, "Coding");
const exampleTask6 = toDoFactory("Gym Session", "Powerhouse gym with Josie", format((new Date()), "MM-dd-yy"), "lowPriority", false, "Training");
const exampleTask7 = toDoFactory("Gym Session", "Powerhouse gym with Josie ", new Date('2023-03-21'), "mediumPriority", false, "Training");
const exampleTask8 = toDoFactory("Soccer Practice", "Focus on finishing, shot accuracy and strength ", new Date('2023-05-30'), "mediumPriority", true, "Training");
const exampleTask9 = toDoFactory("Pick Up Soccer", "Focus on your vision and patience" , format((new Date()), "MM-dd-yy"), "lowPriority", false, "Training");
const exampleTask10 = toDoFactory("Bartend at Jaliscos", "Take stuff to play soccer after", format(addDays((new Date()), 6), "MM-dd-yy"), "mediumPriority", false, "none");
const exampleTask11= toDoFactory("Haircut", "Go with your barber kevin", new Date('2023-10-31'), "mediumPriority", true, "none");
const exampleTask12= toDoFactory("Sunday League Soccer Game", "Playing at Watsonville High", format(addDays((new Date()), 2), "MM-dd-yy"), "highPriority", false, "Training");
allTasksArray.push(exampleTask1, exampleTask2, exampleTask3, exampleTask4, exampleTask5, exampleTask6);
allTasksArray.push(exampleTask7, exampleTask8, exampleTask9, exampleTask10, exampleTask11, exampleTask12);

const storage = () =>{
    localStorage.setItem("allTasksArray",JSON.stringify(allTasksArray));
    localStorage.setItem("projectsArray",JSON.stringify(projectsArray));
}
const sidebarFilters = ()=>{
    if ((JSON.parse(localStorage.getItem("allTasksArray")))){allTasksArray = JSON.parse(localStorage.getItem("allTasksArray"))} 
    if ((JSON.parse(localStorage.getItem("projectsArray")))){projectsArray = JSON.parse(localStorage.getItem("projectsArray"))}

    displayAllTasks();

    allFilter.addEventListener("click", displayAllTasks);
    todayFilter.addEventListener("click", displayTodayTasks);
    weekFilter.addEventListener("click", displayWeekTasks);
    importantFilter.addEventListener("click", displayImportantTasks);
    completedFilter.addEventListener("click", displayCompletedTasks);
}; 
//All of this stays in logic. Maybe I can put the "document.getElementById"
//pass all the variables to appLogic?


const taskListAddTask = ()=>{
    //This is all dom
    const addTaskBar = document.createElement("div");
    addTaskBar.classList.add("task");
    addTaskBar.classList.add("addTaskBar")
    addTaskBar.classList.add("hidden")
    const addTaskBarChild = document.createElement("div");
    addTaskBarChild.classList.add("addTaskTask");
    const addTaskBarTitle = document.createElement("p");
    addTaskBarTitle.classList.add("taskTitle")
    addTaskBarTitle.innerHTML = "Add Task";
    addTaskBar.append(addTaskBarChild, addTaskBarTitle)
    taskList.appendChild(addTaskBar);
    //this is logic?
    setTimeout( ()=>{
        addTaskBar.classList.add("new-task");
        addTaskBar.classList.replace("hidden","visible");
    }, allTasksArray.length*50)
    addTaskBar.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("hidden", "visible")
        blurBackground.classList.replace("hidden", "visible")
    });
    addTask();
}
const displayAllTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()});

    allTasksArray.forEach((element) =>{createTask(element)});

    mainTasksTitleText.innerHTML="All";
    mainTaskTitleIcon.classList.remove("today","week", "important","done");
    mainTaskTitleIcon.classList.add("inbox");
    activeFilter = "all"
    taskListAddTask();
};
const displayCompletedTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})
    allTasksArray.forEach((element)=>{if(element.checked){createTask(element);};})
    mainTasksTitleText.innerHTML="Completed";
    mainTaskTitleIcon.classList.remove("inbox","week", "today","important");
    mainTaskTitleIcon.classList.add("done");
    activeFilter="done"
    taskListAddTask();

};
const displayImportantTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})
    allTasksArray.forEach((element)=>{if(element.priority == "highPriority"){createTask(element);};})
    mainTasksTitleText.innerHTML="Important";
    mainTaskTitleIcon.classList.remove("inbox","week", "today","done");
    mainTaskTitleIcon.classList.add("important");
    activeFilter="important"
    taskListAddTask();

};
const displayTodayTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})

    // const todaysDate= format(  addDays((new Date()), 1)    , "MM-dd-yy"); 
    const today= format((new Date()), "MM-dd-yy");

    allTasksArray.forEach((element) =>{ 
        const dueDate = format(addDays((new Date(element.dueDate)),0),  "MM-dd-yy");
        if(dueDate == today ){  createTask(element) };
    });


    mainTasksTitleText.innerHTML="Today";
    mainTaskTitleIcon.classList.remove("inbox","week", "important","done");
    mainTaskTitleIcon.classList.add("today");
    activeFilter="today"
    taskListAddTask();

}
const displayWeekTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})

    mainTasksTitleText.innerHTML="Week";
    mainTaskTitleIcon.classList.remove("inbox","important", "today","done");
    mainTaskTitleIcon.classList.add("week");

    const dateFrom = format((new Date()), "MM-dd-yy");
    const dateTo = format(addDays((new Date(dateFrom)),7),  "MM-dd-yy")

    allTasksArray.forEach((element)=>{
        const dueDate = format(addDays((new Date(element.dueDate)),0),  "MM-dd-yy")
        if(dueDate >= dateFrom && dueDate <= dateTo ){createTask(element)};
    });
    activeFilter="week"
    taskListAddTask();

};
const createTask = (element) =>{
    const taskDiv = document.createElement("div");
    taskList.appendChild(taskDiv);
    taskDiv.classList.add("task")
    taskDiv.classList.add("hidden");
    taskDiv.classList.add(element.priority);
    const pForTitle = document.createElement("p");
    pForTitle.classList.add("taskTitle");
    pForTitle.innerHTML = element.title; //title
    const taskIconsDiv = document.createElement("div")
    taskIconsDiv.classList.add("taskIconsDiv");
    const dateDisplay = document.createElement("div");
    const infoIcon = document.createElement("div");
    const editIcon = document.createElement("div");
    const deleteIcon = document.createElement("div");
    dateDisplay.classList.add("date");
    const dueDate = format(addDays((new Date(element.dueDate)),0),  "MM-dd-yy")
    dateDisplay.innerHTML = dueDate; //date
    infoIcon.classList.add("taskIcon", "infoTaskIcon");
    editIcon.classList.add("taskIcon", "editTaskIcon");
    deleteIcon.classList.add("taskIcon", "deleteTaskIcon");
    taskIconsDiv.append(dateDisplay, infoIcon, editIcon, deleteIcon)
    
    //Code for Check & Uncheck Feature
    const checkBox = document.createElement("div");
    if(element.checked==true){
        checkBox.classList.add("taskCheckBox","selectedCheckBox");   
        taskDiv.classList.add("taskWhenChecked");   
    } else{
        checkBox.classList.add("taskCheckBox","unselectedCheckBox");
        taskDiv.classList.remove("taskWhenChecked");
    };

    checkBox.addEventListener("click", ()=>{
        if(checkBox.classList.contains("unselectedCheckBox")){
            checkBox.classList.replace("unselectedCheckBox","selectedCheckBox");
            taskDiv.classList.add("taskWhenChecked");
            element.checked = true;
            storage();

        } else if(checkBox.classList.contains("selectedCheckBox")){
            checkBox.classList.replace("selectedCheckBox","unselectedCheckBox");
            taskDiv.classList.remove("taskWhenChecked");
            element.checked = false;
            storage();

        };
    });

    taskDiv.append(checkBox, pForTitle, taskIconsDiv);

    //This is eventlistener for Info Icon
    infoIcon.addEventListener("click", ()=>{

        taskInfoPopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible");
        taskInfoPopUpHeaderTitle.innerHTML= element.title;
        taskInfoPopUpHeaderTitle.style.marginLeft = "20px";
        taskInfoPopUpInfoDescription.innerHTML = element.description;
        taskInfoPopUpInfoDate.innerHTML = format(addDays((new Date(element.dueDate)),0),  "MM-dd-yy");


        taskInfoPopUpFooterProject.innerHTML =" " + element.project
        if(element.priority == "highPriority"){
            taskInfoPopUpInfoPriority.innerHTML="High Priority";
            taskInfoPopUpInfoPriority.classList.remove("taskInfoPopUpInfoPriority-mediumPriority","taskInfoPopUpInfoPriority-lowPriority");
            taskInfoPopUpInfoPriority.classList.add("taskInfoPopUpInfoPriority-highPriority");
        } else if(element.priority == "mediumPriority"){
            taskInfoPopUpInfoPriority.innerHTML="Medium Priority";
            taskInfoPopUpInfoPriority.classList.remove("taskInfoPopUpInfoPriority-highPriority","taskInfoPopUpInfoPriority-lowPriority");
            taskInfoPopUpInfoPriority.classList.add("taskInfoPopUpInfoPriority-mediumPriority");
        } else{
            taskInfoPopUpInfoPriority.innerHTML="Low Priority";
            taskInfoPopUpInfoPriority.classList.remove("taskInfoPopUpInfoPriority-highPriority","taskInfoPopUpInfoPriority-mediumPriority");
            taskInfoPopUpInfoPriority.classList.add("taskInfoPopUpInfoPriority-lowPriority");
        }
    });
    //This is eventlistener for Edit Icon
    editIcon.addEventListener("click", ()=>{
        //checks if a confirm button is already there.
        if(document.getElementById("confirmEditBtn")){
            document.getElementById("confirmEditBtn").remove();
        }
        //lets put this in a function
        projectsDropdown_edit.value = element.project;

        const confirmEditBtn = document.createElement("button")
        confirmEditBtn.setAttribute("id","confirmEditBtn");
        confirmEditBtn.innerHTML = "Confirm Edit";
        taskEditPopUpFooter.appendChild(confirmEditBtn);
            
        // Show Edit Task Pop Up...
        taskEditPopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible");

        // Edit Task Form is Preloaded with current data from this element...
        taskName_EditForm.value = element.title;
        info_EditForm.value = element.description;
        date_EditForm.value = (format(((new Date(element.dueDate))),"yyyy-MM-dd"));
        
        // Prioriity is preloaded with current priority from this element...
        if(element.priority == "highPriority"){
            highPriorityBtn_EditForm.classList.replace("highClass_EditForm","clicked-highPriorityBtn");
            mediumPriorityBtn_EditForm.classList.replace("clicked-mediumPriorityBtn", "mediumClass_EditForm");
            lowPriorityBtn_EditForm.classList.replace("clicked-lowPriorityBtn", "lowClass_EditForm");
            
        } else if(element.priority == "mediumPriority"){
            mediumPriorityBtn_EditForm.classList.replace("mediumClass_EditForm","clicked-mediumPriorityBtn");
            highPriorityBtn_EditForm.classList.replace("clicked-highPriorityBtn", "highClass_EditForm");
            lowPriorityBtn_EditForm.classList.replace("clicked-lowPriorityBtn", "lowClass_EditForm");
        } else{
            lowPriorityBtn_EditForm.classList.replace( "lowClass_EditForm","clicked-lowPriorityBtn");
            highPriorityBtn_EditForm.classList.replace("clicked-highPriorityBtn", "highClass_EditForm");
            mediumPriorityBtn_EditForm.classList.replace("clicked-mediumPriorityBtn", "mediumClass_EditForm");
        };

        //these event listeners switch the priority toggle.
        let priorityOfTask2 = "";
        //Checks and Switches priority to temporary variable if priority is changed... 
        lowPriorityBtn_EditForm.addEventListener("click", ()=>{
            lowPriorityBtn_EditForm.classList.replace( "lowClass_EditForm","clicked-lowPriorityBtn");
            highPriorityBtn_EditForm.classList.replace("clicked-highPriorityBtn", "highClass_EditForm");
            mediumPriorityBtn_EditForm.classList.replace("clicked-mediumPriorityBtn", "mediumClass_EditForm");
            priorityOfTask2 = "lowPriority";

        });
        //Checks and Switches priority to temporary variable if priority is changed... 

        mediumPriorityBtn_EditForm.addEventListener("click", ()=>{
            mediumPriorityBtn_EditForm.classList.replace("mediumClass_EditForm","clicked-mediumPriorityBtn");
            highPriorityBtn_EditForm.classList.replace("clicked-highPriorityBtn", "highClass_EditForm");
            lowPriorityBtn_EditForm.classList.replace("clicked-lowPriorityBtn", "lowClass_EditForm");
            priorityOfTask2= "mediumPriority";

        });
        //Checks and Switches priority to temporary variable if priority is changed... 

        highPriorityBtn_EditForm.addEventListener("click", ()=>{
            highPriorityBtn_EditForm.classList.replace("highClass_EditForm","clicked-highPriorityBtn");
            mediumPriorityBtn_EditForm.classList.replace("clicked-mediumPriorityBtn", "mediumClass_EditForm");
            lowPriorityBtn_EditForm.classList.replace("clicked-lowPriorityBtn", "lowClass_EditForm");
            priorityOfTask2= "highPriority";
        });
        //when Confirm edit Button is pressed...
        confirmEditBtn.addEventListener("click", ()=>{
                if(priorityOfTask2 == ""){priorityOfTask2=element.priority};
                //these 4 change the  task Div                
                pForTitle.innerHTML = taskName_EditForm.value;
                taskDiv.classList.remove(element.priority);
                taskDiv.classList.add(priorityOfTask2);

                // These three change the task Object
                element.title=  taskName_EditForm.value;
                element.description = info_EditForm.value;
                element.dueDate = format(addDays((new Date(date_EditForm.value)),1),  "MM-dd-yy")
                element.priority= priorityOfTask2;
                element.project= projectsDropdown_edit.value;

                

                dateDisplay.innerHTML = format(addDays((new Date(date_EditForm.value)),1),  "MM-dd-yy")
                
                //tasks stays on wrong display, id like to refresh it, i need to create task again tho.
                if(!taskDiv.classList.contains("new-task")){filterResetFunction();}
                //hides the form popup when comfirm edit is clicked.
                taskEditPopUp.classList.replace("visible", "hidden");
                blurBackground.classList.replace("visible", "hidden");
                storage();
                confirmEditBtn.remove();
        });

    
    });
    
    //This is eventlistener for Delete Icon
    deleteIcon.addEventListener("click", ()=>{

        if(document.getElementById("confirmDeletion")){
            document.getElementById("confirmDeletion").remove();
        }

        const confirmDeletion = document.createElement("button");
        confirmDeletion.setAttribute("id", "confirmDeletion");
        confirmDeletion.classList.add("deletePopUpConfirmButtons")
        confirmDeletion.innerHTML="Delete";
        taskDeletePopUpConfirm.append(confirmDeletion);
        

        taskDeletePopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible");

        confirmDeletion.addEventListener("click", ()=>{
            allTasksArray.splice(allTasksArray.indexOf(element), 1);
            if(!taskDiv.classList.contains("new-task")){filterResetFunction();}
            taskDiv.remove();
            taskDeletePopUp.classList.replace("visible", "hidden");
            blurBackground.classList.replace("visible", "hidden");
            setTimeout(()=>{confirmDeletion.remove()}, 1000);
            storage();

        })
    });
    

    //delay for loading taks onto page
    const tasksToAnimate = document.querySelectorAll(".task");
    for (let i = 0; i < tasksToAnimate.length; i++) {
        if(!tasksToAnimate[i].classList.contains("new-task")){
            setTimeout(() => {
                tasksToAnimate[i].classList.add("new-task");
                tasksToAnimate[i].classList.replace("hidden","visible");
                }, (i * 50));
        } else{
            tasksToAnimate[i].classList.replace("hidden","visible");
        }
        
    };


}
const filterResetFunction = ()=>{
    setTimeout(()=>{
        document.querySelectorAll(".task").forEach(element =>{element.remove()});
        if(activeFilter=="all"){
            displayAllTasks();
        } else if(activeFilter=="done"){
            displayCompletedTasks();
        } else if(activeFilter=="important"){
            displayImportantTasks();
        } else if(activeFilter=="today"){
            displayTodayTasks();
        }else if(activeFilter=="week"){
            displayWeekTasks();
        }else{
            allTasksArray.forEach((element) =>{ createTask(element)});
            mainTasksTitleText.innerHTML="All";
            mainTaskTitleIcon.classList.remove("today","week", "important","done");
            mainTaskTitleIcon.classList.add("inbox");
            activeFilter = "all"
        }
    },500)
}
const toggle_Add_Info_Edit_Project_PopUp = () =>{
    addCircle.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("hidden", "visible")
        blurBackground.classList.replace("hidden", "visible")
    });
   
    addProject.addEventListener("click",()=>{
        blurBackground.classList.replace("hidden", "visible")
        addProjectPopUp.classList.replace("hidden", "visible");
        projectNameInput.setAttribute("placeholder","Enter Project Name");
        projectNameInput.value ="";
    })
    exitAddTask.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
    blurBackground.addEventListener("click", () => {
        mainAddTaskForm.classList.replace("visible", "hidden")
        taskInfoPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden")
        taskEditPopUp.classList.replace("visible", "hidden");
        taskDeletePopUp.classList.replace("visible", "hidden");
        addProjectPopUp.classList.replace("visible", "hidden");
        editProjectPopUp.classList.replace("visible", "hidden");
    });
    taskInfoPopUpExit.addEventListener("click", ()=>{
        taskInfoPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    exitEditTask.addEventListener("click", () => {
        taskEditPopUp.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
    projectDeletePopUpExit.addEventListener("click", () => {
        projectDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    taskDeletePopUpExit.addEventListener("click", () => {
        taskDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    cancelDeletion.addEventListener("click", ()=>{
        taskDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    })
    cancelDeletionEdit.addEventListener("click", ()=>{
        projectDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    })
    

    addProjectExitIcon.addEventListener("click", ()=>{
        addProjectPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    
    cancelNewProject.addEventListener("click", () => {
        addProjectPopUp.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
    confirmNewProject.addEventListener("click", () => {
        if(projectNameInput.value !== ""){
            addProjectPopUp.classList.replace("visible", "hidden")
            blurBackground.classList.replace("visible", "hidden")
            createProject(projectNameInput.value);

        }else{
            projectNameInput.setAttribute("placeholder","Enter Name To Continue");
        }
    });
};
const addTask = () =>{
    let priorityOfTask = "";
    
    lowBtn.addEventListener("click", ()=>{
        if(lowBtn.classList.contains("lowClass")){
            lowBtn.classList.replace("lowClass", "clicked-lowPriorityBtn");

            highBtn.removeAttribute('class');
            highBtn.classList.add("priorityLvl");
            highBtn.classList.add("highClass");

            mediumBtn.removeAttribute('class');
            mediumBtn.classList.add("priorityLvl");
            mediumBtn.classList.add("mediumClass");

            priorityOfTask = "lowPriority"
        }
    })
    mediumBtn.addEventListener("click", ()=>{
        if(mediumBtn.classList.contains("mediumClass")){
            mediumBtn.classList.replace("mediumClass", "clicked-mediumPriorityBtn");

            highBtn.removeAttribute('class');
            highBtn.classList.add("priorityLvl");
            highBtn.classList.add("highClass");

            lowBtn.removeAttribute('class');
            lowBtn.classList.add("priorityLvl");
            lowBtn.classList.add("lowClass");

            priorityOfTask = "mediumPriority";
        }
    })
    highBtn.addEventListener("click", ()=>{
        if(highBtn.classList.contains("highClass")){
            highBtn.classList.replace("highClass", "clicked-highPriorityBtn");

            mediumBtn.removeAttribute('class');
            mediumBtn.classList.add("priorityLvl");
            mediumBtn.classList.add("mediumClass");

            lowBtn.removeAttribute('class');
            lowBtn.classList.add("priorityLvl");
            lowBtn.classList.add("lowClass");

            priorityOfTask = "highPriority";

        }
    })
    date.value=format((new Date()), "MM-dd-yy");
    addTaskFormButton.addEventListener("click", ()=>{
        if(taskName.value !=="" &&  info.value !=="" && priorityOfTask !=="" && date.value !==0){
            const newTask = toDoFactory( taskName.value, info.value, new Date((date.value)) , priorityOfTask, false, projectsDropdown.value);
            allTasksArray.unshift(newTask);
            mainAddTaskForm.classList.replace("visible", "hidden")
            blurBackground.classList.replace("visible", "hidden")
            filterResetFunction();
            taskName.value = "";
            info.value="";
            date.value= "yyyy-MM-dd";
            lowBtn.classList.replace("clicked-lowPriorityBtn", "lowClass");
            mediumBtn.classList.replace("clicked-mediumPriorityBtn", "mediumClass");
            highBtn.classList.replace("clicked-highPriorityBtn", "highClass");
        };
        storage();

    });

};
const createProject = (projectName) =>{
    
    projectsArray.push(projectName);
    const projectItem = document.createElement("div");
    const projectTitle = document.createElement("p");
    projectTitle.innerHTML=projectName;
    projectItem.classList.add("projectItem");
    const projectIcons = document.createElement("div");
    projectIcons.classList.add("projectIcons");
    const editProject = document.createElement("div");
    const deleteProject = document.createElement("div");
    editProject.classList.add("editProject");
    editProject.classList.add("projectEditDelete");
    deleteProject.classList.add("deleteProject");
    deleteProject.classList.add("projectEditDelete");
    projectIcons.append(editProject, deleteProject)
    projectItem.append(projectTitle,projectIcons);
    projectList.appendChild(projectItem);

    const projectAsOption = document.createElement("option");
    projectAsOption.setAttribute("selected", "unselected");
    projectAsOption.innerHTML=projectName;
    const editDropdownOption = document.createElement("option");
    editDropdownOption.setAttribute("selected", "unselected");
    editDropdownOption.innerHTML=projectName;

    projectsDropdown.appendChild(projectAsOption);
    projectsDropdown_edit.appendChild(editDropdownOption);

    projectItem.addEventListener("click",()=>{
            if(activeFilter !== projectName){
                document.querySelectorAll(".task").forEach(element =>{element.remove()})
                allTasksArray.forEach(element=>{
                    if (element.project == projectName){ createTask(element)};
                    mainTasksTitleText.innerHTML=projectName;
                    mainTaskTitleIcon.classList.remove("today","week", "important","done","inbox");
                    activeFilter = projectName;
                })
                taskListAddTask();

            };
            
    })

    editProject.addEventListener("click",()=>{

        const confirmEditProject = document.createElement("button");
        confirmEditProject.classList.add("deletePopUpConfirmButtons")
        confirmEditProject.setAttribute("id","confirmEditProject");
        confirmEditProject.innerHTML="Edit"
        editProjectConfirmationEdit.appendChild(confirmEditProject)
        

        editProjectPopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible");

        projectNameInputForEdit.value = projectName;
        
        confirmEditProject.addEventListener("click",()=>{

            if(projectsArray.includes(projectNameInputForEdit.value) && projectsArray.indexOf(projectNameInputForEdit.value) !== projectsArray.indexOf(projectName) ){
                alert("Cannot Name Project as another Project");
            }else if(projectNameInputForEdit.value !== ""&& projectNameInputForEdit.value!== "none"){
                editProjectPopUp.classList.replace("visible", "hidden");
                blurBackground.classList.replace("visible", "hidden");
                projectTitle.innerHTML=projectNameInputForEdit.value;
                projectAsOption.innerHTML = projectNameInputForEdit.value;
                editDropdownOption.innerHTML = projectNameInputForEdit.value;
                projectsArray.splice(projectsArray.indexOf(projectName), 1, projectNameInputForEdit.value);
                allTasksArray.forEach(element=>{ if(element.project==projectName){element.project = projectNameInputForEdit.value;}})
                projectName = projectNameInputForEdit.value;
                setTimeout(()=>{confirmEditProject.remove()}, 800);

                if(activeFilter !== projectName){
                    document.querySelectorAll(".task").forEach(element =>{element.remove()})
                    allTasksArray.forEach(element=>{
                        if (element.project == projectName){ createTask(element)};
                        mainTasksTitleText.innerHTML=projectName;
                        mainTaskTitleIcon.classList.remove("today","week", "important","done","inbox");
                        activeFilter = projectName;
                    })
                };
            } else if (projectNameInputForEdit.value == ""){
                alert("Cannot leave Name Empty");
            }
            storage();
        });


        cancelEditProject.addEventListener("click", ()=>{
            editProjectPopUp.classList.replace("visible", "hidden");
            blurBackground.classList.replace("visible", "hidden");
            setTimeout(()=>{confirmEditProject.remove()}, 800);

        });
        editProjectExitIcon.addEventListener("click", ()=>{
            editProjectPopUp.classList.replace("visible", "hidden");
            blurBackground.classList.replace("visible", "hidden");
            setTimeout(()=>{confirmEditProject.remove()}, 800);

        });


    })


    deleteProject.addEventListener("click",()=>{
        //cretate deletion button
        if(document.getElementById("confirmDeletionEdit")){document.getElementById("confirmDeletionEdit").remove()}

        projectDeletePopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible");
        const confirmProjectDeletion = document.createElement("button"); //main delete Button
        confirmProjectDeletion.classList.add("deletePopUpConfirmButtons");
        confirmProjectDeletion.setAttribute("id", "confirmDeletionEdit");
        confirmProjectDeletion.innerHTML="Delete"
        projectDeletePopUpConfirmation.appendChild(confirmProjectDeletion);

        confirmProjectDeletion.addEventListener("click",()=>{

            projectDeletePopUp.classList.replace("visible", "hidden");
            blurBackground.classList.replace("visible", "hidden");

            if( projectToggle.checked){

                let placeholderArr = [];
                allTasksArray.forEach((element)=>{
                    if(element.project !== projectTitle.innerHTML){ placeholderArr.push(element)};
                });
                allTasksArray=placeholderArr;
            }else if(!projectToggle.checked){
                allTasksArray.forEach((element)=>{
                    if(element.project == projectTitle.innerHTML){element.project = "none"};  
                });
            }
            projectsArray.splice((projectsArray.indexOf(projectTitle.innerHTML)), 1); //delete From Projects Array 
            projectAsOption.remove(); //delete from add task dropdown
            editDropdownOption.remove(); //delete from edit task dropdown
            projectItem.remove() //delete From Projects Display

            storage();

        });
    });    
};
createProject("Training");
createProject("Coding");

export {toggle_Add_Info_Edit_Project_PopUp, displayAllTasks, addTask,sidebarFilters, storage};