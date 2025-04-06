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
// const taskData = [];

// if you add, update, or remove a task, it should reflect in the UI
// to do this, you need to modify the initial taskData to an empty array
// make sure to parse the data coming in from local storage
const taskData = localStorage.getItem(JSON.stringify("data"));

// *3*
// because the state can change when editing or discarding tasks, create a let currentTask variable
// set it to an empty object; this variable will be used to track the state of each task
let currentTask = {};

// if there is a task with special characters, the app breaks;
// to fix this, create a function called removeSpecialChars that takes a string and removes any special characters
const removeSpecialChars = (str) => {
  return str.replace(/['"_]/g, "");
};

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
  // confirmCloseDialog.showModal();
  // console.log(closeTaskFormBtn, "is clicked");
  // create a formInputsContainValues variable to check if there is a value in each input field
  const formInputsContainValues =
    titleInput.value || dateInput.value || descriptionInput.value;

  // if the user attempts to edit a task but decides not make changes before closing the form, there is no need to display the modal with the buttons
  // create formInputValuesUpdated variable to check if the user made changes while editing a task
  const formInputValuesUpdated =
    titleInput.value !== currentTask.title ||
    dateInput.value !== currentTask.date ||
    descriptionInput.value !== currentTask.description;
  // now create a condition to check if formInputsContainValues is true;
  // if true, use the showModal() method on confirmCloseDialog;
  if (formInputsContainValues && formInputValuesUpdated) {
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
addOrUpdateTaskBtn.innerText = "Add Task";
  // set each input field to an empty string
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";

  // use the classList.toggle() method to toggle the "hidden" class on taskForm element
  // this will close the form modal;
  taskForm.classList.toggle("hidden");

  // then, set the currentTask variable to an empty object
  currentTask = {};

  // when retreiving tasks, they should be displayed in the UI
  // check if there is a task inside taskData array using the length of the array
  // 0 is a falsy value, so all you need for the condition is the array length
  // example: if (array.length) { ... }
if (taskData.length) {
  updateTaskContainer();
}
};

// *15*
// let's refactor the code for readability
// refactor the submit event listener into two functions
// the first function will add the input values to the taskData array;
// the second function will add the tasks to the DOM
const addOrUpdateTask = () => {
  // prohibit a task to be created if the title input field is empty
  if (!titleInput.value.trim()) {
    alert("Please provide a title");
    return;
  }

  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);

  const taskObj = {
    id: `${removeSpecialChars(titleInput.value).toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: removeSpecialChars(titleInput.value),
    date: dateInput.value,
    description: removeSpecialChars(descriptionInput.value),
  };
  console.table(taskObj);

  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  }
  // editing a task won't reflect when you submit the task; to make it functional,
  // create an else block and set taskData[dataArrIndex] to taskObj
  else {
    taskData[dataArrIndex] = taskObj;
  }
  // save the tasks to local storage
  localStorage.setItem("data", JSON.stringify(taskData));

  updateTaskContainer();
  clearInputFields();
};

const updateTaskContainer = () => {
  // to clear our existing tasks, set the innerHTML of tasksContainer to an empty string
  tasksContainer.innerHTML = "";

  taskData.forEach(({ id, title, date, description }) => {
    // add a click event listener to both buttons
    // 'this' refers to the current context, in this case, the 'this' points to the button that was clicked
    tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button>
        </div>
      `;
  });
};

// *16*
// create a function to delete tasks;
// find the index of the task you want to delete first
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // remove the task from the DOM using remove() method and from the taskData array using slice()
  // splice() is an array method that modifies arrays by removing/replacing/adding elements at a specific index,
  // while also returning the removed elements; can take up to three arguments
  // (index to start removing, number of elements to remove, and optional replacement element)
  // example: const fruits = ["apple", "banana", "cherry"];
  // const removedFruits = fruits.splice(1, 2);
  // console.log(fruits); // prints ["apple"]
  // console.log(removedFruits); // prints ["banana", "cherry"]
  // use the remove() method to remove the parentElement of buttonEl from the DOM;
  buttonEl.parentElement.remove();
  // use the splice() method to remove the task from the taskData array
  taskData.splice(dataArrIndex, 1);

  // you want a deleted task to be removed from local storage;
  // save tasKData to local storage, use setItem() method to save the taskData array and pass in the key "data"
  // ensure to stringify the taskData array using JSON.stringify() method
  localStorage.setItem("data", JSON.stringify(taskData));
};

// *17*
// create an arrow function to edit tasks; pass in 'buttonEl' as the parameter
const editTask = (buttonEl) => {
  // find the index of the task you want to edit
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  // use square brackets to retrieve the task to be edited from taskData array using dataArrIndex
  currentTask = taskData[dataArrIndex];

  // the task to be edited is now stored in the currentTask object;
  // stage it for editing insdie the input fields by setting the value of each input field,
  // to currentTask's object properties
  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  // set the innerText of the addOrUpdateTaskBtn to "Update Task"
  addOrUpdateTaskBtn.innerText = "Update Task";

  // finally, display the form modal with the values of the input fields by using classList.toggle() method to toggle the "hidden" class on taskForm element
  taskForm.classList.toggle("hidden");
};

// *18*
// localStorage offers methods for saving, retrieving, and deleting data
// setItem() method is used to saave an item
// getItem() method retrieves an item
// removeItem() method deletes an item
// clear() method deletes all items
// example: locatStorage.setItem("key", value); // value can be any data type

// myTaskArr array haas been provided
// const myTaskArr = [
//   { task: "Walk the Dog", date: "22-04-2022" },
//   { task: "Read some books", date: "02-11-2023" },
//   { task: "Watch football", date: "10-08-2021" },
// ];

// use setItem() method to save it with a key of 'data'
//in devtools, go to Application tab and click on Local Storage
// notice a series of [objeect Object]; everything in local storage needs to be a string
// to resolve, wrap the data in JSON.stringify() method; pass in you in the myTaskArr variable
// this will convert the data into a string
// example: localStorage.setItem("key", JSON.stringify(value));
// localStorage.setItem("data", JSON.stringify(myTaskArr));

// to retrieve the data, use getItem() method and pass in the key
// example: const data = JSON.parse(localStorage.getItem("key"));
// const getTaskArr = localStorage.getItem("data");
// console.log(getTaskArr);

// to view the data in its original form or more readable format, use JSON.parse() method
// const getTaskArrObj = JSON.parse(localStorage.getItem('data'));
// console.log(getTaskArrObj);

// you can use localStorage.removeItem() method to remove a specific item
// you can use localStorage.clear() method to remove all items from local storage
// example: localStorage.clear();
// remove the 'data' item from local storage
// localStorage.removeItem('data');
// console.log(getTaskArrObj);

// remove all items from local storage
// localStorage.clear();
// console.log(getTaskArrObj);

