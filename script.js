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
})