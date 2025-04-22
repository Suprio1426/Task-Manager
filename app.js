 // Retrieve tasks from local storage or initialize an empty array.......

 const tasks = JSON.parse(localStorage.getItem('tasks') ) || [];

 let indexToBeDeleted = null;

 const taskManagerContainer = document.querySelector(".taskManager");

 const confirmEl = document.querySelector(".confirm");

 const confirmedBtn = confirmEl.querySelector(".confirmed");

 const cancelBtn = confirmEl.querySelector(".cancel");

  //Add event listener to the form submit event....

 document.getElementById("taskForm").addEventListener("submit", handleFormSubmit);

  //renderTasks();

 //Create function that handles form submit event...
 
 function handleFormSubmit(event){
     event.preventDefault();
      const taskInput = document.getElementById("taskInput");
      const taskText = taskInput.value.trim();
      
      if(taskText !== ""){
        const newTask = {
            text : taskText,
            completed: false
          };

        tasks.push(newTask);
        saveTask();
        taskInput.value = "";
        renderTasks();
      }
 }
  // function for save the tasks To local storage....

  function saveTask(){
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Initial rendering of tasks.....
   renderTasks();

  //function to render the tasks...

  function renderTasks() {
    const taskContainer = document.getElementById("taskContainer");
    taskContainer.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskCard = document.createElement('div');
        taskCard.classList.add('taskCard');
         let classVal = "pending";
          let textVal = "PENDING";
          if(task.completed) {
            classVal = "completed";
             textVal = "COMPLETED";
           }
         taskCard.classList.add(classVal);

           const taskText = document.createElement('p');
           taskText.innerText = task.text;

           const taskStatus = document.createElement('p');
           taskStatus.classList.add('status');
           taskStatus.innerText = textVal;

         //add Mark as completed buttons....

          const toggleButton = document.createElement('button');
          toggleButton.classList.add("button-box");
          const btnContentEl =document.createElement("span");
          btnContentEl.classList.add("green");

          btnContentEl.innerText = task.completed ? 'Mark as Pending' : 'Mark as Completed';

          toggleButton.appendChild(btnContentEl);

          toggleButton.addEventListener('click', ()=> {
            
              tasks[index].completed = !tasks[index].completed;
              saveTask();
              renderTasks();

          });

          //add delete button....

          const deleteButton = document.createElement('button');
          deleteButton.classList.add("button-box");
          const delBtnContentEl =document.createElement("span");
          delBtnContentEl.classList.add("red");
          delBtnContentEl.innerText = 'Delete';
         
          deleteButton.appendChild(delBtnContentEl);

          deleteButton.addEventListener('click', ()=>{
                indexToBeDeleted = index
                confirmEl.style.display = "block";
                taskManagerContainer.classList.add("overlay");
          });   

          taskCard.appendChild(taskText);
          taskCard.appendChild(taskStatus);
          taskCard.appendChild(toggleButton);
          taskCard.appendChild(deleteButton);

          taskContainer.appendChild(taskCard);
    });
  }

  //function to delete the task....

  function deleteTask(index) {
    
    tasks.splice(index, 1);
    saveTask();
    renderTasks();
   
  }
  
  //for confirm button....

  confirmedBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
    deleteTask(indexToBeDeleted);

  });

  //for cancel button....

   cancelBtn.addEventListener("click", () => {
    confirmEl.style.display = "none";
    taskManagerContainer.classList.remove("overlay");
   
  });

  