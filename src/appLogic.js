import { debounce } from "lodash";
import { format } from 'date-fns';


let toDoTasksArray = []; //store All Tasks here.

//To Do Task Factory 
const toDoFactory = (title, description, dueDate, priority, checked) => {
    return { title, description, dueDate, priority, checked};
  };
//Sample Tasks Below
const sampleDescription = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel dui sed turpis ornare suscipit vitae sit amet arcu. Cras ut convallis metus. Vivamus aliquet, est eu efficitur cursus, mi odio viverra odio, eget laoreet purus augue vel felis. Nam sed sem venenatis, tincidunt nibh ut, fringilla lorem. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Praesent sit amet efficitur leo, in luctus purus. Vestibulum eget ipsum id ex faucibus finibus. Nunc ullamcorper ligula vel maximus pellentesque Suspendisse vitae ex at lectus ullamcorper sodales condimentum vel est. Nulla facilisi. Ut vitae aliquam dui. Integer blandit ultricies lacus. Pellentesque laoreet ipsum tortor, vel pulvinar lectus dapibus rutrum. Pellentesque vel justo magna. Praesent lacus massa, lacinia condimentum viverra sed, tempor vel leo. Integer id neque vel tellus porta tempus quis eu urna. Nam rhoncus bibendum mi eget tincidunt. Quisque iaculis non purus ac sodales. Integer auctor non massa at cursus. Proin sit amet quam congue, suscipit tortor posuere, iaculis ex. Maecenas mattis augue vel ipsum hendrerit ultrices. Cras massa dui, porttitor a dictum id, volutpat ac ipsum. Pellentesque pellentesque ultricies purus, eu pulvinar justo sollicitudin sit amet."
const exampleTask1 = toDoFactory("Example JS 1", "Example Description 1 " +sampleDescription, new Date('2023-03-21'), "highPriority", false);
const exampleTask2 = toDoFactory("Example JS 2", "Example Description 2 " +sampleDescription, new Date('2023-01-24'), "mediumPriority", false);
const exampleTask3 = toDoFactory("Example JS 3", "Example Description 3 " +sampleDescription, new Date('2023-06-21'), "lowPriority", false);
const exampleTask4 = toDoFactory("Example JS 4", "Example Description 4 " +sampleDescription, new Date('2023-11-11'), "mediumPriority", false);
const exampleTask5 = toDoFactory("Example JS 5", "Example Description 5 " +sampleDescription, new Date('2023-10-31'), "mediumPriority", false);
const exampleTask6 = toDoFactory("Example JS 6", "Example Description 6 " +sampleDescription, new Date('2023-01-26'), "highPriority", false);
toDoTasksArray.push(exampleTask1, exampleTask2, exampleTask3, exampleTask4, exampleTask5, exampleTask6);


const taskList = document.getElementById("taskList");
const taskInfoPopUp = document.getElementById("taskInfoPopUp");
const taskInfoPopUpHeaderTitle = document.getElementById("taskInfoPopUpHeaderTitle");
const taskInfoPopUpInfoDescription = document.getElementById("taskInfoPopUpInfoDescription");
const taskInfoPopUpInfoDate = document.getElementById("taskInfoPopUpInfoDate");
const taskInfoPopUpInfoPriority = document.getElementById("taskInfoPopUpInfoPriority");
const taskEditPopUp = document.getElementById("taskEditPopUp");
const exitEditTask = document.getElementById("exitEditTask");
const taskName_EditForm = document.getElementById("taskName_EditForm");
const info_EditForm = document.getElementById("info_EditForm");
const date_EditForm = document.getElementById("date_EditForm");
const lowPriorityBtn_EditForm = document.getElementById("lowPriorityBtn_EditForm");
const mediumPriorityBtn_EditForm = document.getElementById("mediumPriorityBtn_EditForm");
const highPriorityBtn_EditForm = document.getElementById("highPriorityBtn_EditForm");
const taskEditPopUpFooter = document.getElementById("taskEditPopUpFooter");

const allFilter = document.getElementById("allFilter");
const todayFilter = document.getElementById("todayFilter");
const weekFilter = document.getElementById("weekFilter");
const importantFilter = document.getElementById("importantFilter");
const completedFilter = document.getElementById("completedFilter");


const sidebarFilters = ()=>{
    let freshStart = true;

    if(freshStart){
        displayAllTasks(); 
        freshStart=false;
    }

    allFilter.addEventListener("click", displayAllTasks);
    todayFilter.addEventListener("click", displayTodayTasks);
    weekFilter.addEventListener("click", displayWeekTasks);
    importantFilter.addEventListener("click", displayImportantTasks);
    completedFilter.addEventListener("click", displayCompletedTasks);
}


const displayCompletedTasks = () =>{console.log("Completed Filter Clicked")}
const displayTodayTasks = () =>{console.log("Today Filter Clicked")}
const displayWeekTasks = () =>{console.log("Week Filter Clicked")}
const displayImportantTasks =()=>{console.log("Important Filter Clicked")}
    // document.querySelectorAll(".task").forEach(element =>{element.remove()});
    // toDoTasksArray.forEach(element, ()=>{});

//🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨 DISPLAY TO DO TASKS ARRAY 🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const displayAllTasks = () =>{

    //delete task list in order to reset.
    document.querySelectorAll(".task").forEach(element =>{element.remove()})

    //display task list. 🚨🚨🚨this is probably would be dom stuff
    toDoTasksArray.forEach((element,index) =>{
        const taskDiv = document.createElement("div");
        taskList.appendChild(taskDiv);
        taskDiv.classList.add("task");
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
        const date= element.dueDate;
        const dateFormatted = format(date, "MM-dd-yy"); 
        dateDisplay.innerHTML = dateFormatted; //date
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
            taskInfoPopUpInfoDate.innerHTML = dateFormatted;
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
                    const dateUpdated = element.dueDate;
                    const dateUpdatedFormatted= format(dateUpdated, "MM/dd/yy");
                    dateDisplay.innerHTML = dateUpdatedFormatted;
                    taskDiv.classList.remove( element.priority);
                    taskDiv.classList.add( priorityOfTask2);

                    // These three change the task Object
                    element.title=  taskName_EditForm.value;
                    element.description = info_EditForm.value;
                    element.dueDate = new Date(((date_EditForm.value).toString()));
                    element.priority= priorityOfTask2;

                    //hides the form popup when comfirm edit is clicked.
                    taskEditPopUp.classList.replace("visible", "hidden");
                    blurBackground.classList.replace("visible", "hidden");
                    
                    confirmEditBtn.remove();
            });

        
        });
        //🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        
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
                toDoTasksArray.splice(element, 1);
                taskDiv.remove();
                taskDeletePopUp.classList.replace("visible", "hidden");
                blurBackground.classList.replace("visible", "hidden");
                setTimeout(()=>{confirmDeletion.remove()}, 1000);
            })
        });
        

    });

};
//🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨 End Of Important Function 🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩

const addCircle = document.getElementById("addCircle");
const mainAddTaskForm = document.getElementById("mainAddTask");
const blurBackground = document.getElementById("blurBackground");
const exitAddTask = document.getElementById("exitAddTask");
const taskInfoPopUpExit = document.getElementById("taskInfoPopUpExit");
const taskDeletePopUpExit = document.getElementById("taskDeletePopUpExit");
const taskDeletePopUp = document.getElementById("taskDeletePopUp");
const cancelDeletion =document.getElementById("cancelDeletion");
const taskDeletePopUpConfirm = document.getElementById("taskDeletePopUpConfirm");

// const addEffectOnClick=(element) =>{
//     element.addEventListener("click",()=>{
//         element.classList.add("clickedEffect");
//         setTimeout(()=>{element.classList.remove("clickedEffect")},3000);
//     })
    
// }

const toggle_Add_Info_Edit_PopUp = () =>{
        

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
        taskInfoPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden")
        taskEditPopUp.classList.replace("visible", "hidden");
        taskDeletePopUp.classList.replace("visible", "hidden");
    });
    taskInfoPopUpExit.addEventListener("click", ()=>{
        taskInfoPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    exitEditTask.addEventListener("click", () => {
        taskEditPopUp.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });
    taskDeletePopUpExit.addEventListener("click", () => {
        taskDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    cancelDeletion.addEventListener("click", ()=>{
        taskDeletePopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    })

};

const addTaskFormButton = document.getElementById("addTaskForm");
const taskName = document.getElementById("taskName");
const info = document.getElementById("info");
const date = document.getElementById("date");
const lowBtn = document.getElementById("lowPriorityBtn");
const mediumBtn = document.getElementById("mediumPriorityBtn");
const highBtn = document.getElementById("highPriorityBtn");

//🚨🚨🚨🟩 Collects Info From Form to Add 🟩🚨🚨🚨
//🚨🚨🚨🟩 Task And Diplay it on task List🟩🚨🚨🚨
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

  //🚨🚨🚨add feature so you when you exit add task form it clears everything
    addTaskFormButton.addEventListener("click", ()=>{
        if(taskName.value !=="" &&  info.value !=="" && priorityOfTask !=="" && date.value !==0){

            console.log("taskName: " + taskName.value + ", info: " + info.value + ", date: " +date.value +", priority: "+ priorityOfTask);
            const newTask = toDoFactory( taskName.value, info.value, new Date((date.value)) , priorityOfTask, false);
            toDoTasksArray.unshift(newTask);
    
            mainAddTaskForm.classList.replace("visible", "hidden")
            blurBackground.classList.replace("visible", "hidden")
    
            displayAllTasks();
    
            //clears all form and unclicks priority.
            taskName.value = "";
            info.value="";
            date.value= "yyyy-MM-dd";
            priorityOfTask="";
            lowBtn.classList.replace("clicked-lowPriorityBtn", "lowClass");
            mediumBtn.classList.replace("clicked-mediumPriorityBtn", "mediumClass");
            highBtn.classList.replace("clicked-highPriorityBtn", "highClass");

        };

    });

};












export {toggle_Add_Info_Edit_PopUp, displayAllTasks, addTask,sidebarFilters};