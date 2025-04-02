// Local storage is a web storage feature of JavaScript that lets you persist data by storing the data as a key:value pair.

// *1*
// Begin by accessing the several elements by ID and save them in a variable
const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");

const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");

const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");

const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

// *2*
// Next, create a taskData constant and set it into an empty array;
// this will store each task with their title, due date, and description
// this storage will enable you to keep track of tasks, display them, and save them in local storage
const taskData = [];

// *3*
// because the state can change when editing or discarding tasks, create a let currentTask variable
// set it to an empty object; this variable will be used to track the state of each task
let currentTask = {};

// *4*
// let's open and close the form modal
// to add/remove classes from an element, you can use classList.add() or classList.remove() methods
// another property is classList.toggle() which adds a class if it doesn't exist and removes it if it does
// this is useful for toggling classes on and off
// example: element.classList.toggle("class-to-toggle");
// add an event listener to the openTaskFormBtn and pass in a "click" event for the first argument
// then, an anonymous callback function as the second argument
openTaskFormBtn.addEventListener("click", () => {
  // inside the callback function, use classList.toggle() method to toggle the "hidden" class on the taskForm element
  taskForm.classList.toggle("hidden");
  console.log(openTaskFormBtn, "is clicked");
});

// *5*
// the HTML dialog element has a showModal() method that can be used to display a doal dialog box
// example: dialogElement.showModal();
// add an event listener to the closeTaskFormBtn and pass in a "click" event for the first argument
// then, an anonymous callback function as the second argument
closeTaskFormBtn.addEventListener("click", () => {
  // inside the callback function, call the showModal() method on confirmCloseDialog element
  confirmCloseDialog.showModal();
  console.log(closeTaskFormBtn, "is clicked");
  // create a formInputsContainValues variable to check if there is a value in each input field
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;
  // now create a condition to check if formInputsContainValues is true;
  // if true, use the showModal() method on confirmCloseDialog;
  if (formInputsContainValues) {
    confirmCloseDialog.showModal();
  } else {
    clearInputFields();
  }
});

// *6*
// if the user clicks 'Cancel' on the confirmCloseDialog modal, close the modal
// the dialog element has a close() method that can be used to close a modal dialog box
// example: dialogElement.close();
// add an event listener to the cancelBtn and pass in a "click" event for the first argument
// then, an anonymous callback function as the second argument
cancelBtn.addEventListener("click", () => {
  // inside the callback function, call the close() method on confirmCloseDialog element
  confirmCloseDialog.close();
  console.log(cancelBtn, "is clicked");
});

// *7*
// if the user clicks 'Discard' on the confirmCloseDialog modal, close the modal, then hide the form modal
// add an event listener to discardBtn and pass in a "click" event for the first argument
// then, add a callback function
discardBtn.addEventListener("click", () => {
  // inside the callback function, use the close() method on the confirmCloseDialog variable to close the modal
  confirmCloseDialog.close();
  // then, use classList to toggle the class "hidden" on taskForm so the form modal will close
  // delete line 77 because this line of code is moved to the clearInputFields function
  // taskForm.classList.toggle("hidden");
  // instead call the clearInputFields function to clear the input fields and toggle the "hidden" class to close the form modal
  clearInputFields();
  console.log(discardBtn, "is clicked");
});

// *8*
// now, let's get the values from the input fields and save them into the taskData array
// add a 'submit' event listener to the taskForm element and pass in 'e' as the parameter in the callback function
taskForm.addEventListener("submit", (e) => {
  // inside the callback function, use the preventDefault() method on 'e' to stop the browswer from refreshing the page after the form is submitted
  e.preventDefault();

  // *9*
  // next, determine whether the task being added to the taskData array exists or not
  // if the task exists, add it to the array
  // else, update the task
  // the findIndex() method finds and returns the index of the first element in an array that meets the criteria specified in a testing callback function
  // if no element is found, it returns -1
  // the callback function should return a truthy value to indicate a matching element has been found, and a falsy value otherwise
  // example: const numbers = [1, 2, 3, 4, 5];
  // const firstNumberLargerThanThree = numbers.findIndex((number) => number > 3);
  // console.log(firstNumberLargerThanThree); // prints index 3

  // declare a variable called dataArrIndex and assign it the value of taskData.findIndex()
  // for findIndex() method, pass in an arrow function with 'item' as the parameter
  // const dataArrIndex = taskData.findIndex(
  //   (item) =>
  //     // strictly check if id poperty of 'item' === it property of currentTask
  //     item.id === currentTask.id
  // ); // ** MOVED TO addOrUpdateTask function **

  // *10*
  // when a user creates a task, it should be saved in an object
  // create a const variable called taskObj and assign it the value of an empty object
  // const taskObj = {
  //   // the value for the id property should be lower case; use the toLowerCase() method
  //   // the final result for the id property should be a hyphenated string
  //   // chain the toLowerCase() method with the splity() method to split the string into an array of words
  //   // then, use the join() method to join the array of words with a hyphen
  //   // next, place the value inside an embedded expression
  //   // lastly, add a unique id to each task by adding another hypen and use the Date.now() method which returns the number of milliseconds since January 1, 1970
  //   id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
  //   title: titleInput.value,
  //   date: dateInput.value,
  //   description: descriptionInput.value,
  // };
  // console.log("task object: ", taskObj); // ** MOVED TO addOrUpdateTask function **
  // *11*
  // if there is a new task, push the taskObj into the taskData array to keep track of each task
  // create a condition to check if dataArrIndex === -1
  // if (dataArrIndex === -1) {
  //   // if true, use the unshift method to add the taskObj to the beginning of the taskData array
  //   // unshift() is an array method that is used to add 1+ elements to the beginning of an array
  //   // example: const arr = [1, 2, 3];
  //   // arr.unshift(0); // arr is now [0, 1, 2, 3]
  //   // console.log(arr); // prints [0, 1, 2, 3]
  //   taskData.unshift(taskObj);
  // } ** MOVED TO addOrUpdateTask function **

  // *12*
  // now that the task is saved in the taskData array, let's display the task on the page
  // loop through the taskData array using the forEach() method
  // then, destructure each property from the taskData object as the parameters
  // taskData.forEach(({ id, title, date, description }) => {
  //   // create a template literal with the task data to display the task
  //   tasksContainer.innerHTML += `
  //   <div class="task" id="${id}"></div>
  //   <p><strong>Title: </strong>${title}</p>
  //   <p><strong>Date: </strong>${date}</p>
  //   <p><strong>Description: </strong>${description}</p>
  //   <button type="button" class="btn">Edit</button>
  //   <button type="button" class="btn">Delete</button>
  //   `;
  // }); // ** MOVED TO updateTaskContainer function **
  // *13*
  // after adding the task to the page, close the form modal
  // utilize the classList.toggle() method to toggle the "hidden" class on taskForm element
  // because this line of code is moved to the clearInputFields function, delete line 153
  // taskForm.classList.toggle("hidden");
  // call the clearInputFields function to clear the input fields and toggle the "hidden" class to close the form modal
  addOrUpdateTask();
});

// *14*
// when adding another task, the input fields retain their values;
// instead of clearing fields one-by-one, create a function that clears all the input fields\
// you can then call the function whenever you need to clear the input fields
const clearInputFields = () => {
  // set each input field to an empty string
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";

  // use the classList.toggle() method to toggle the "hidden" class on taskForm element
  // this will close the form modal;
  taskForm.classList.toggle("hidden");

  // then, set the currentTask variable to an empty object
  currentTask = {};
};

// *15*
// let's refactor the code for readability
// refactor the submit event listener into two functions
// the first function will add the input values to the taskData array;
// the second function will add the tasks to the DOM
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };
  console.log("task object: ", taskObj);

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }

  updateTaskContainer();
  clearInputFields();
};

const updateTaskContainer = () => {
  // to clear our existing tasks, set the innerHTML of tasksContainer to an empty string
  tasksContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button type="button" class="btn">Edit</button>
          <button type="button" class="btn">Delete</button>
        </div>
      `;
  });
};
