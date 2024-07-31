// var state = {
//   taskList: [
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//     {
//       imageUrl: "",
//       taskTitle: "",
//       taskType: "",
//       taskDescription: "",
//     },
//   ],
// };

// backup storage
const state = {
    taskList: [],
  };
  
  // DOM Operations
  const taskModal = document.querySelector(".task__modal__body");
  const taskContents = document.querySelector(".task__contents");
  
  // console.log(taskContents);
  // console.log(taskModal);
  
  // Template for the card on screen
  // elem identifier key=${id} is been misssing on line 50th
  const htmlTaskContent = ({ id, title, description, type, url }) => `
    <div class="col-md-6 col-lg-4 mt-3" id=${id} key=${id}>
      <div class='card shadow-sm task__card'>
      
        <div class='card-header d-flex justify-content-end task__card__header'>
            <button type='button' class='btn btn-outline-primary mr-2' name=${id} onclick="editTask.apply(this, arguments)">
                <i class='fas fa-pencil-alt name=${id}'></i>
            </button>
             <button type='button' class='btn btn-outline-danger mr-2' name=${id} onclick="deleteTask.apply(this, arguments)">
                <i class='fas fa-trash-alt name=${id}' ></i>
            </button>
        </div>
        <div class='card-body'>
            ${
              // url &&
              // `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
              url
                ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
                : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
            }
            <h4 class='card-title task__card__title'>${title}</h4>
            <p class='description trim-3-lines text-muted'>${description}</p>
            <div class='tags text-white d-flex flex-wrap'>
              <span class='badge bg-primary m-1'>${type}</span>
            </div>
        </div>
        <div class='card-footer'>
            <button type='button' class='btn btn-outline-primary float-right' data-bs-toggle="modal" data-bs-target="#showTask" onclick='openTask.apply(this, arguments)' id=${id}>Open Task</button>
        </div>
      </div>
    </div>
  `;
  
  // Modal Body on >> Clk of Open Task
  const htmlModalContent = ({ id, title, description, url }) => {
    const date = new Date(parseInt(id));
    return `
    <div id=${id}>
       ${
         //  url &&
         //  //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
         //  `<img width='100%' src=${url} alt='Card Image' class='img-fluid place__holder__image mb-3' />`
         url
           ? `<img width='100%' src=${url} alt='Card Image' class='card-img-top md-3 rounded-lg' />`
           : `<img width='100%' src="https://tse1.mm.bing.net/th?id=OIP.F00dCf4bXxX0J-qEEf4qIQHaD6&pid=Api&rs=1&c=1&qlt=95&w=223&h=117" alt='Card Image' class='card-img-top md-3 rounded-lg' />`
       }
       <strong class='text-muted text-sm'>Created on: ${date.toDateString()}</strong>
       <h2 class='my-3'>${title}</h2>
       <p class='text-muted'>${description}</p>
    </div>
    `;
  };
  
  // where we convert json > str (i.e., for local storage)
  const updateLocalStorage = () => {
    localStorage.setItem(
      "task",
      JSON.stringify({
        tasks: state.taskList,
      })
    );
  };
  
  // where we convert str > json (i.e., for rendering the cards on the screen)
  // const loadInitialData = () => {
  //   const localStorageCopy = JSON.parse(localStorage.task);
  
  //   if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
  //   state.taskList.map((cardDate) => {
  //     // taskContents.innerAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  //     taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
  //   });
  // };
  
  const loadInitialData = () => {
    const localStorageCopy = JSON.parse(localStorage.task);
  
    if (localStorageCopy) state.taskList = localStorageCopy.tasks;
  
    state.taskList.map((cardDate) => {
      taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardDate));
    });
  };
  
  // Spread Operator
  /**
   const obj = {
      name: "rohan",
      age: 2
  }
  
  
  console.log(obj);
   {name: 'rohan', age: 2}
  
  console.log({obj});
   {obj: {…}}obj: {name: 'rohan', age: 2}[[Prototype]]: Object
  
  console.log({...obj});
   {name: 'rohan', age: 2}
  
  //  appending or adding a new key into obj:
  console.log({...obj, designation: "mentor"});
  {name: 'rohan', age: 2, designation: 'mentor'}
   */
  
  /**
   * 
  //  updating key value using spread operator
  const obj={
      name: "rohan"
  }
  
  console.log(obj)
   {name: 'rohan'}
  
  
  console.log({...obj, age : 2});
   {name: 'rohan', age: 2}
  
  console.log({...obj, age :4});
  {name: 'rohan', age: 4}
   */
  
  /* 
  var date = new Date();
  console.log(Date.now());
  
  1677511569666
  */
  
  // when we update or when we edit ..we need to save
  const handleSubmit = (event) => {
    // console.log("event triggerd");
    const id = `${Date.now()}`;
    const input = {
      url: document.getElementById("imageUrl").value,
      title: document.getElementById("taskTitle").value,
      type: document.getElementById("tags").value,
      description: document.getElementById("taskDescription").value,
    };
    if (input.title === "" || input.type === "" || input.description === "") {
      return alert("Please fill all the necessary fiels :-)");
    }
  
    // taskContents.innerAdjacentHTML(
    taskContents.insertAdjacentHTML(
      "beforeend",
      htmlTaskContent({ ...input, id })
    );
    state.taskList.push({ ...input, id });
  
    updateLocalStorage();
  };
  
  //open task
  const openTask = (e) => {
    if (!e) e = window.event;
  
    const getTask = state.taskList.find(({ id }) => id === e.target.id);
    taskModal.innerHTML = htmlModalContent(getTask);
  };
  
  // delete task
  const deleteTask = (e) => {
    if (!e) e = window.event;
  
    const targetId = e.target.getAttribute("name");
    // console.log(targetId);
    const type = e.target.tagName;
    // console.log(type);
    const removeTask = state.taskList.filter(({ id }) => id !== targetId);
    // console.log(removeTask);
    updateLocalStorage();
  
    if (type === "BUTTON") {
      // console.log(e.target.parentNode.parentNode.parentNode.parentNode);
      return e.target.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode
      );
    } else if (type === "I") {
      return e.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(
        e.target.parentNode.parentNode.parentNode.parentNode
      );
    }
  };
  
  // edit task
  const editTask = (e) => {
    if (!e) e = window.event;
  
    const targetId = e.target.id;
    const type = e.target.tagName;
  
    let parentNode;
    let taskTitle;
    let taskDescription;
    let taskType;
    let submitButton;
  
    if (type === "BUTTON") {
      parentNode = e.target.parentNode.parentNode;
    } else {
      parentNode = e.target.parentNode.parentNode.parentNode;
    }
  
    // taskTitle = parentNode.childNodes[3].childNodes[7].childNodes;
    // console.log(taskTitle);
  
    taskTitle = parentNode.childNodes[3].childNodes[3];
    taskDescription = parentNode.childNodes[3].childNodes[5];
    taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    submitButton = parentNode.childNodes[5].childNodes[1];
  
    // console.log(taskTitle, taskDescription, taskType, submitButton);
  
    taskTitle.setAttribute("contenteditable", "true");
    taskDescription.setAttribute("contenteditable", "true");
    taskType.setAttribute("contenteditable", "true");
  
    submitButton.setAttribute("onclick", "saveEdit.apply(this, arguments)");
    submitButton.removeAttribute("data-bs-toggle");
    submitButton.removeAttribute("data-bs-target");
    submitButton.innerHTML = "Save Changes";
  };
  
  // save edit
  const saveEdit = (e) => {
    if (!e) e = window.event;
  
    const targetId = e.target.id;
    const parentNode = e.target.parentNode.parentNode;
    // console.log(parentNode.childNodes)
  
    const taskTitle = parentNode.childNodes[3].childNodes[3];
    const taskDescription = parentNode.childNodes[3].childNodes[5];
    const taskType = parentNode.childNodes[3].childNodes[7].childNodes[1];
    const submitButton = parentNode.childNodes[5].childNodes[1];
  
    const updateData = {
      taskTitle: taskTitle.innerHTML,
      taskDescription: taskDescription.innerHTML,
      taskType: taskType.innerHTML,
    };
    let stateCopy = state.taskList;
  
    stateCopy = stateCopy.map((task) =>
      task.id === targetId
        ? {
            id: task.id,
            title: updateData.taskTitle,
            description: updateData.taskDescription,
            type: updateData.taskType,
            url: task.url,
          }
        : task
    );
    state.taskList = stateCopy;
    updateLocalStorage();
  
    taskTitle.setAttribute("contenteditable", "false");
    taskDescription.setAttribute("contenteditable", "false");
    taskType.setAttribute("contenteditable", "false");
  
    submitButton.setAttribute("onclick", "openTask.apply(this, arguments)");
    submitButton.setAttribute("data-bs-toggle", "modal");
    submitButton.setAttribute("data-bs-target", "#showTask");
    submitButton.innerHTML = "Open Task";
  };
  
  // search
  const searchTask = (e) => {
    if (!e) e = window.event;
  
    while (taskContents.firstChild) {
      taskContents.removeChild(taskContents.firstChild);
    }
    const resultData = state.taskList.filter(({ title }) =>
      title.toLowerCase().includes(e.target.value.toLowerCase())
    );
  
    // console.log(resultData);
    resultData.map(
      (cardData) =>
        taskContents.insertAdjacentHTML("beforeend", htmlTaskContent(cardData))
      // taskContents.insertAdjacentHTML("beforeend", htmlModalContent(cardData))
    );
  };