import { debounce } from "lodash";
import { format, addDays } from 'date-fns';


let allTasksArray = []; //store All Tasks here.
let projectsArray = []; //store All Project Names here
const toDoFactory = (title, description, dueDate, priority, checked, project) => {
    return { title, description, dueDate, priority, checked, project};
};
//Sample Tasks Below
const sampleDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dui sed turpis ornare suscipit vitae sit amet arcu. Cras ut convallis metus. Vivamus aliquet, est eu efficitur cursus, mi odio viverra odio, eget laoreet purus augue vel felis. Nam sed sem venenatis, tincidunt nibh ut, fringilla lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent sit amet efficitur leo, in luctus purus. Vestibulum eget ipsum id ex faucibus finibus. Nunc ullamcorper ligula vel maximus pellentesque Suspendisse vitae ex at lectus ullamcorper sodales condimentum vel est. Nulla facilisi. Ut vitae aliquam dui. Integer blandit ultricies lacus. Pellentesque laoreet ipsum tortor, vel pulvinar lectus dapibus rutrum. Pellentesque vel justo magna. Praesent lacus massa, lacinia condimentum viverra sed, tempor vel leo. Integer id neque vel tellus porta tempus quis eu urna. Nam rhoncus bibendum mi eget tincidunt. Quisque iaculis non purus ac sodales. Integer auctor non massa at cursus. Proin sit amet quam congue, suscipit tortor posuere, iaculis ex. Maecenas mattis augue vel ipsum hendrerit ultrices. Cras massa dui, porttitor a dictum id, volutpat ac ipsum. Pellentesque pellentesque ultricies purus, eu pulvinar justo sollicitudin sit amet."
const exampleTask1 = toDoFactory("EX1 P1 I1", "Example Important 1 " +sampleDescription, new Date('2023-03-21'), "highPriority", false, "Project 1");
const exampleTask2 = toDoFactory("EX2 P2 T1", "Example Today 2 " +sampleDescription,format((new Date()), "MM-dd-yy"), "mediumPriority", false, "Project 2");
const exampleTask3 = toDoFactory("EX3 N1 C1.", "Example Description 3 " +sampleDescription, new Date('2023-06-21'), "lowPriority", true, "none");
const exampleTask4 = toDoFactory("EX4 P2 WK1", "Example Description 4 " +sampleDescription,  format(addDays((new Date()), 3), "MM-dd-yy"), "mediumPriority", false, "Project 2");
const exampleTask5 = toDoFactory("EX5 N2 ", "Example Description 5 " +sampleDescription, new Date('2023-10-31'), "mediumPriority", false, "none");
const exampleTask6 = toDoFactory("EX6 P2 T1 I2", "Example Important 2 " +sampleDescription, format((new Date()), "MM-dd-yy"), "highPriority", false, "Project 2");
const exampleTask7 = toDoFactory("EX7 P1 I3", "Example Important 3 " +sampleDescription, new Date('2023-03-21'), "highPriority", false, "Project 1");
const exampleTask8 = toDoFactory("EX8 P1 C2", "Example Description 2 " +sampleDescription, new Date('2023-05-30'), "mediumPriority", true, "Project 1");
const exampleTask9 = toDoFactory("EX9 P2 T3", "Example Description 3 " +sampleDescription, format((new Date()), "MM-dd-yy"), "lowPriority", false, "Project 2");
const exampleTask10 = toDoFactory("EX10 P1 Wk2", "Example Description 4 " +sampleDescription, format(addDays((new Date()), 6), "MM-dd-yy"), "mediumPriority", false, "Project 1");
const exampleTask11= toDoFactory("EX11 P2 C3", "Example Description 5 " +sampleDescription, new Date('2023-10-31'), "mediumPriority", true, "Project 2");
const exampleTask12= toDoFactory("EX12 P1 WK3 I4", "Example Important 4 " +sampleDescription, format(addDays((new Date()), 2), "MM-dd-yy"), "highPriority", false, "Project 1");
allTasksArray.push(exampleTask1, exampleTask2, exampleTask3, exampleTask4, exampleTask5, exampleTask6);
allTasksArray.push(exampleTask7, exampleTask8, exampleTask9, exampleTask10, exampleTask11, exampleTask12);

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
//To Do Task Factory 
let activeFilter = "";

const sidebarFilters = ()=>{
    let freshStart = true;
    if(freshStart){displayAllTasks(); freshStart=false;};

    allFilter.addEventListener("click", displayAllTasks);
    todayFilter.addEventListener("click", displayTodayTasks);
    weekFilter.addEventListener("click", displayWeekTasks);
    importantFilter.addEventListener("click", displayImportantTasks);
    completedFilter.addEventListener("click", displayCompletedTasks);
};
const displayAllTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})
    allTasksArray.forEach((element) =>{ createTask(element)});
    mainTasksTitleText.innerHTML="All";
    mainTaskTitleIcon.classList.remove("today","week", "important","done");
    mainTaskTitleIcon.classList.add("inbox");
    activeFilter = "all"
};
const displayCompletedTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})
    allTasksArray.forEach((element)=>{if(element.checked){createTask(element);};})
    mainTasksTitleText.innerHTML="Completed";
    mainTaskTitleIcon.classList.remove("inbox","week", "today","important");
    mainTaskTitleIcon.classList.add("done");
    activeFilter="done"
};
const displayImportantTasks = () =>{
    document.querySelectorAll(".task").forEach(element =>{element.remove()})
    allTasksArray.forEach((element)=>{if(element.priority == "highPriority"){createTask(element);};})
    mainTasksTitleText.innerHTML="Important";
    mainTaskTitleIcon.classList.remove("inbox","week", "today","done");
    mainTaskTitleIcon.classList.add("important");
    activeFilter="important"
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
        } else if(checkBox.classList.contains("selectedCheckBox")){
            checkBox.classList.replace("selectedCheckBox","unselectedCheckBox");
            taskDiv.classList.remove("taskWhenChecked");
            element.checked = false;
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

        //🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
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

            //format(addDays((new Date(date_EditForm.value)),0),  "MM-dd-yy")

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
        };
    },500)
}
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
const confirmEditProject = document.getElementById("confirmEditProject") ;
const projectDeletePopUp =document.getElementById("projectDeletePopUp");
const cancelDeletionEdit = document.getElementById("cancelDeletionEdit")
const projectDeletePopUpExit = document.getElementById("projectDeletePopUpExit");
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
    cancelEditProject.addEventListener("click", ()=>{
        editProjectPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    })

    addProjectExitIcon.addEventListener("click", ()=>{
        addProjectPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    editProjectExitIcon.addEventListener("click", ()=>{
        editProjectPopUp.classList.replace("visible", "hidden");
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
const projectList = document.getElementById("projectList")
const editProjectPopUp = document.getElementById("editProjectPopUp");
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
            document.querySelectorAll(".task").forEach(element =>{element.remove()})
            allTasksArray.forEach(element=>{
                if (element.project == projectTitle.innerHTML){
                    createTask(element)
                };
                mainTasksTitleText.innerHTML=projectTitle.innerHTML;
                mainTaskTitleIcon.classList.remove("today","week", "important","done","inbox");
                activeFilter = projectTitle.innerHTML;
            })
    })
    editProject.addEventListener("click",()=>{
        editProjectPopUp.classList.replace("hidden", "visible");
        blurBackground.classList.replace("hidden", "visible")
        projectNameInputForEdit.value = projectName;

        if(projectNameInputForEdit.value !== ""){
            confirmEditProject.addEventListener("click",()=>{
                editProjectPopUp.classList.replace("visible", "hidden");
                blurBackground.classList.replace("visible", "hidden");
                projectTitle.innerHTML=projectNameInputForEdit.value;
                projectAsOption.innerHTML = projectNameInputForEdit.value;
                editDropdownOption.innerHTML = projectNameInputForEdit.value;
                projectsArray.splice((projectsArray.indexOf(projectName)), 1, projectNameInputForEdit.value);
                allTasksArray.forEach(element=>{ if(element.project==projectName){element.project = projectNameInputForEdit.value;}})
            });
        };
    })
//🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨
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


        });
    });     
//🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨🚨



        




};
const projectDeletePopUpConfirmation= document.getElementById("projectDeletePopUpConfirmation");
createProject("Project 1");
createProject("Project 2");
const projectToggle = document.getElementById("projectToggle");

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

    addTaskFormButton.addEventListener("click", ()=>{
        if(taskName.value !=="" &&  info.value !=="" && priorityOfTask !=="" && date.value !==0){

            const newTask = toDoFactory( taskName.value, info.value, new Date((date.value)) , priorityOfTask, false, projectsDropdown.value);
            allTasksArray.unshift(newTask);
    
            mainAddTaskForm.classList.replace("visible", "hidden")
            blurBackground.classList.replace("visible", "hidden")
    
            displayAllTasks();
    
            //clears all form and unclicks priority.
            taskName.value = "";
            info.value="";
            date.value= "yyyy-MM-dd";
            // priorityOfTask="none";
            // projectsDropdown.value = "none";
            lowBtn.classList.replace("clicked-lowPriorityBtn", "lowClass");
            mediumBtn.classList.replace("clicked-mediumPriorityBtn", "mediumClass");
            highBtn.classList.replace("clicked-highPriorityBtn", "highClass");

        };

    });

};



//🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 
//add project tags onto tasks? This would Be kinda easy, I can also add ability to change project.
// add little icons with numbers to show how many tasks per filter/project.
// add extra add taks sbutton inside the TaskList. WOuld have to write Html code for it and then just 
//easiily add it to the toggling of Add pop up from addCircle.

//🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩 
//Gotta go back and simplify all code

export {toggle_Add_Info_Edit_Project_PopUp, displayAllTasks, addTask,sidebarFilters};