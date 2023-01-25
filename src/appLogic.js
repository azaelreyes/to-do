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
const confirmEditBtn = document.getElementById("confirmEditBtn");

//🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨 DISPLAY TO DO TASKS ARRAY 🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
//🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨 Very Important Function   🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
const displayToDoTasksArray = () =>{
    //delete task list.
    let domTaskList = document.querySelectorAll(".task");
    for (let index = 0; index < domTaskList.length; index++) {domTaskList[index].remove();}
    //display task list.
    toDoTasksArray.forEach((element) =>{
        //🚨🚨🚨this is probably would be dom stuff
        const taskDiv = document.createElement("div");
        taskList.appendChild(taskDiv);
        taskDiv.classList.add("task");
        taskDiv.classList.add( element.priority);
        const taskDivChild = document.createElement("div");
        //makes tasks checked or unchecked depending on if checked or not.
        if(element.checked==true){
            taskDivChild.classList.add("taskCheckBox","selectedCheckBox");   
            taskDiv.classList.add("taskWhenChecked");   
        } else{
            taskDivChild.classList.add("taskCheckBox","unselectedCheckBox");
            taskDiv.classList.remove("taskWhenChecked");
        }
        //event listener to check or uncheck checkbox
        taskDivChild.addEventListener("click", ()=>{

            if(taskDivChild.classList.contains("unselectedCheckBox")){
                taskDivChild.classList.replace("unselectedCheckBox","selectedCheckBox");
                taskDiv.classList.add("taskWhenChecked");
                element.checked = true;
            } else if(taskDivChild.classList.contains("selectedCheckBox")){
                taskDivChild.classList.replace("selectedCheckBox","unselectedCheckBox");
                taskDiv.classList.remove("taskWhenChecked");
                element.checked = false;
            };
        });
        
        taskDiv.appendChild(taskDivChild);
        const pForTitle = document.createElement("p");
        pForTitle.classList.add("taskTitle");
        pForTitle.innerHTML = element.title; //title
        taskDiv.appendChild(pForTitle);
        const task2ndDivChild = document.createElement("div")
        task2ndDivChild.classList.add("taskIconsDiv");
        
        const childDivDate = document.createElement("div");
        const childDivInfo = document.createElement("div");
        const childDivEdit = document.createElement("div");
        const childDivDelete = document.createElement("div");

        childDivDate.classList.add("date");
        const date= element.dueDate;
        const dateFormatted = format(date, "MM-dd-yy"); //Used DATE-FNS API HERE
        childDivDate.innerHTML = dateFormatted; //date

        //These are my Info/Edit/Delete Icons
        childDivInfo.classList.add("taskIcon", "infoTaskIcon");
        childDivEdit.classList.add("taskIcon", "editTaskIcon");
        childDivDelete.classList.add("taskIcon", "deleteTaskIcon");

        task2ndDivChild.appendChild(childDivDate);
        task2ndDivChild.appendChild(childDivInfo);
        task2ndDivChild.appendChild(childDivEdit);
        task2ndDivChild.appendChild(childDivDelete);

        taskDiv.appendChild(task2ndDivChild);

        //This is eventlistener for Info Icon
        console.log("element" + element.title)
        childDivInfo.addEventListener("click", ()=>{
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


        //🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🚨🚨🚨🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩
        //This is eventlistener for Edit Icon
        //When Task Edit Button Is Pressed...
        childDivEdit.addEventListener("click", ()=>{
            
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
                console.log("Element That is Being changed: "+ element.title);
                
                if(priorityOfTask2 == ""){
                    priorityOfTask2 = element.priority;
                };

                if(date_EditForm.value == 0){ console.log("no date selected.")};

    //these 4 change the  task Div                
                    // make the Task div title equal to the new title
                    pForTitle.innerHTML =taskName_EditForm.value;
                    //uptdate Task div date
                    const dateUpdated = element.dueDate;
                    const dateUpdatedFormatted= format(dateUpdated, "MM/dd/yy");
                    childDivDate.innerHTML = dateUpdatedFormatted;
                    // update priority color of Task Div
                    taskDiv.classList.remove( element.priority);
                    taskDiv.classList.add( priorityOfTask2);
    
    // These three change the task Object
                    //make the Task Object Title equal to the new changed title
                    element.title=  taskName_EditForm.value;
                    //make the Task object Descritpion equal to the new description
                    element.description = info_EditForm.value;
                    //make the Task Object date equal to the new date
                    element.dueDate = new Date(((date_EditForm.value).toString()));
                    // update the Task Object Prioority 
                    element.priority= priorityOfTask2;
    
                    //It might have something to do with the Factory Function.
                    console.log("Changed Element: "+ element.title);
    
                    //hides the form popup when comfirm edit is clicked.
                    taskEditPopUp.classList.replace("visible", "hidden");
                    blurBackground.classList.replace("visible", "hidden");
              
                

            
            });
        });
        
         

        //This is eventlistener for Delete Icon
        childDivDelete.addEventListener("click", ()=>{
            console.log(element.title+ " Delete Clicked");
        });
        

    });

};

const addCircle = document.getElementById("addCircle");
const mainAddTaskForm = document.getElementById("mainAddTask");
const blurBackground = document.getElementById("blurBackground");
const exitAddTask = document.getElementById("exitAddTask");
const taskInfoPopUpExit = document.getElementById("taskInfoPopUpExit");

//🚨🚨🚨🟩 Toggles Add Task Form Pop Up 🟩🚨🚨🚨
//🚨🚨🚨🟩 Toggles Task Info Pop Up     🟩🚨🚨🚨 //
// 🚨🚨🚨should add a reset everytime form is hidden so when it opens its not filled w/ thext
const toggle_Add_Info_Edit_PopUp =() =>{
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
    });
    taskInfoPopUpExit.addEventListener("click", ()=>{
        taskInfoPopUp.classList.replace("visible", "hidden");
        blurBackground.classList.replace("visible", "hidden");
    });
    exitEditTask.addEventListener("click", () => {
        taskEditPopUp.classList.replace("visible", "hidden")
        blurBackground.classList.replace("visible", "hidden")
    });

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
    
            displayToDoTasksArray();
    
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

// const editPriority = () =>{};
// const confirmEdit = (element) =>{ };
















export {toggle_Add_Info_Edit_PopUp, displayToDoTasksArray, addTask};