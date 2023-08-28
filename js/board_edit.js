let prioToEdit;

/**
 * opens a card, which shows the detailed task
 * @param {*} id index of task which was clicked
 * @param {*} category category of the clicked task
 */
function openTaskOverview(id, category) {
    let task = tasks[id];
    column = task.column;
    assignedCategory = category;
    subTasksArray = task['subtasks'];
    let colorCode = determineColorCategory(task['category']);
    renderEditOverviewTemplate(colorCode, task['prio'], id);
    let taskOverview = document.getElementById('editTask');
    taskOverview.classList.remove('d-none');
    renderTaskOverview(task, id);
    renderAssignementsInTaskOverview(task, "editTaskContainerAssignedNames");
    renderSubtasksInTaskOverview(id);
}

/**
 * render values in Overview Container
 * @param {*} task which is opened
 * @param {*} id task id
 */
function renderTaskOverview(task, id) {
    document.getElementById('editTaskContainerCategory').innerHTML = `${task['category']}`;
    document.getElementById('editTaskContainerTitle').innerHTML = `${task['title']}`;
    document.getElementById('editTaskContainerDescription').innerHTML = `${task['description']}`;
    document.getElementById('editTaskContainerDueDateDate').innerHTML = `${task['dueDate']}`;
    document.getElementById('editTaskContainerDelete').innerHTML = `<img src="/assets/img/Icon_delete.png" onclick="askBeforeDelete(${id})">`;
    document.getElementById('editTaskContainerPrioPrio').innerHTML = `${task['prio']} <img src="../assets/img/${task['prio']}_white.png"/>`;
}

/**
 * template of the card
 * @param {*} colorCode colorCode of the category
 * @param {*} prio prio of the task
 * @param {*} id index of the task
 */
function renderEditOverviewTemplate(colorCode, prio, id) {
    document.getElementById('editTask').innerHTML = /*html*/`
        <div id="confirmDeleteTask" class="d-none">
        </div>
        <div id="editTaskContainer" >
            <div id="editTaskContainerClose" onclick="saveBoard(${id})"><img src="/assets/img/Icon_close.png" alt="">
            </div>
            <div id="editTaskContainerEditDelete">
                <div id="editTaskContainerDelete"></div>
                <div id="editTaskContainerEdit" onclick="openEditMode(${id})"><img src="/assets/img/Icon_edit.png"></div>
            </div>
            <div id="editTaskContainerInner">
                <div id="editTaskContainerCategory" style="background-color: ${colorCode}"></div>
                <div id="editTaskContainerTitle"></div>
                <div id="editTaskContainerDescription"></div>
                <div id="editTaskContainerDueDate">
                    <div id="editTaskContainerDueDateText">Due Date:</div>
                    <div id="editTaskContainerDueDateDate"></div>
                </div>
                <div id="editTaskContainerPrio">
                    <div id="editTaskContainerPrioText">Priority:</div>
                    <div id="editTaskContainerPrioPrio"class="prio_${prio}"></div>
                </div>
                <div id="editTaskContainerAssigned">
                    <div id="editTaskContainerAssignedText">Assigned to:</div>
                    <div id="editTaskContainerAssignedNames"></div>
                </div>
                <div id=editTaskContainerSubtasks>
                <div id=editTaskContainerSubtasksText>Subtasks</div>
                <div id=editTaskContainerSubtasksTasks></div>
                </div>
            </div>
        </div>
    `
    disableBackgroundScroll();
}

/**
 * 
 * @param {*} task 
 * @param {*} idContainer container to render in
 */
function renderAssignementsInTaskOverview(task, idContainer) {
    let assignedUsers = task['assignedContacts'];
    document.getElementById(`${idContainer}`).innerHTML = "";
    for (let i = 0; i < assignedUsers.length; i++) {
        const assignedUser = assignedUsers[i];

        for (let k = 0; k < contacts.length; k++) {
            const contact = contacts[k];
            renderAssignmentIconsInCard(assignedUser, contact, idContainer);
        }
    }
}

/**
 * compares if assignedUser is an User in contact List --> creates and IconCircle
 * @param {*} assignedUser 
 * @param {*} contact 
 * @param {*} idContainer 
 */
function renderAssignmentIconsInCard(assignedUser, contact, idContainer) {
    if (assignedUser.user_name === contact.user_name) {

        let newContainer = document.createElement('div');
        newContainer.classList.add('editTaskUsername');
        let newCircle = document.createElement('div');
        newCircle.classList.add('editTaskUsernameCircle');
        newCircle.style.backgroundColor = getColor(assignedUser.user_name);
        let newName = document.createElement('div');
        newName.classList.add('editTaskUsernameName');

        let un = document.getElementById(idContainer);

        newContainer.appendChild(newCircle);
        newContainer.appendChild(newName);
        newCircle.innerHTML = assignedUser.acronym;

        newName.innerHTML = assignedUser.user_name;
        un.appendChild(newContainer);
    }
}

/**
 * renders Subtasks in Overview
 * @param {*} id index of task which was clicked
 */
async function renderSubtasksInTaskOverview(id) {
    document.getElementById('editTaskContainerSubtasksTasks').innerHTML = "";

    for (let s = 0; s < subTasksArray.length; s++) {
        if (subTasksArray[s].subTaskDone == 0) {
            renderSubtasksWithoutHook(s, id);
        } else {
            renderSubtasksWithHook(s, id);
        }
    }
    //renderAddSubtasksInOverview(id);
}

/**
 * Subtask Input and Add Button in Overview
 * @param {*} id index of task which was clicked
 */
function renderAddSubtasksInOverview(id) {
    document.getElementById('editTaskContainerSubtasksTasks').innerHTML += /*html*/`
        <div class="subtaskEdit">
            <input id="inputSubtaskEdit" class="inputSubtask" placeholder="Add new subtask" />
            <div class="buttonAddSubTask hover" onclick="addSubTask(${id}, 'Edit')">
                <img src="assets/img/plus.png" />
            </div>
        </div>
    `
}

/**
 * render checkbox without hook
 * @param {*} index 
 * @param {*} id index of task which was clicked
 */
function renderSubtasksWithoutHook(index, id) {
    document.getElementById('editTaskContainerSubtasksTasks').innerHTML += /*html*/`
            <div class="subtaskInOverview">
                <div id="checkBoxEdit${id}${index}" class="checkBox hover" onclick="addCheck(${index}, ${id},'Edit')"></div>
                <div>${subTasksArray[index].subTaskName}</div>
            </div>
        `
}

/**
 * render checkbox with hook
 * @param {*} index 
 * @param {*} id index of task which was clicked
 */
function renderSubtasksWithHook(index, id) {
    document.getElementById('editTaskContainerSubtasksTasks').innerHTML += /*html*/`
            <div class="subtaskInOverview">
                <div id="checkBoxEdit${id}${index}" class="checkBox hover" onclick="addCheck(${index},${id},'Edit')"><img src="assets/img/done-30.png"></div>
                <div>${subTasksArray[index].subTaskName}</div>
            </div>
        `
}


/**
 * this function renders the field for adding subtasks
 * @param {*} id index of task which was clicked
 */
async function addSubTaskEdit(id) {
    let subTaskName = document.getElementById("inputSubtaskEdit").value;
    let subTaskDone = 0;
    let subTask = {
        'subTaskName': subTaskName,
        'subTaskDone': subTaskDone
    }
    subTasksArray.push(subTask);
    renderSubtasksInTaskOverview(id);
    await saveTask();
    renderBoard();
    document.getElementById("inputSubtaskEdit").value = "";
}



/**
 * confirm Container if task should be deleted
 * @param {*} a 
 */
function askBeforeDelete(id) {
    let confirmDelete = document.getElementById('confirmDeleteTask');
    confirmDelete.classList.remove('d-none');
    confirmDelete.innerHTML += /*html*/`
        <div id="confirmDeleteTaskQuestion">Delete Task?</div>
        <div id="confirmDeleteTaskAnswers">
                <div id="confirmDeleteTaskAnswersYes" onclick="deleteTaskFinally(${id})">Delete</div>
                <div id="confirmDeleteTaskAnswersNo" onclick="closeDeleteRequest()">Back</div>
        </div>
    `
}

/**
 * look at className 
 * @param {*} a 
 */
async function deleteTaskFinally(id) {
    closeDeleteRequest();
    await deleteTask(id);
    renderBoardCards();
    closeEditTask();
    flushSubtasks();
    
}



function closeDeleteRequest() {
    document.getElementById('confirmDeleteTask').innerHTML = "";
    document.getElementById('confirmDeleteTask').classList.add('d-none');
}


function closeEditTask() {
    enableBackgroundScroll();
    document.getElementById('editTask').classList.add('d-none');
    flushSubtasks();

}


function openEditMode(id) {
    let task = tasks[id];
    prioToEdit = task['prio'];
    renderEditModeTemplates(task, id);
}

/**
 * render Edit Container 
 * @param {*} task 
 * @param {*} id 
 */
function renderEditModeTemplates(task, id) {
    let editTask = document.getElementById('editTask');
    editTask.innerHTML = "";
    editTask.innerHTML = /*html*/`
        <form id="editTaskContainer" onsubmit="saveEditedBoard(${id}); return false;">
            <div id="editTaskContainerClose" onclick="closeEditTask()"><img src="assets/img/Icon_close.png" alt="">
            </div>
            <button id="editTaskContainerSave" type="submit">
                <div id="editTaskContainerSaveText">Ok</div>
                <div id="editTaskContainerSaveIcon"><img src="assets/img/done-30.png"></div>
            </button>
            <div id="editTaskContainerInner" class="editContainerInner" onclick="closeOptionsOnClick(event, 'Edit')">
                <div id="editTaskTitle" class="editTaskTitleFixed editTasksWidth80">
                    <div id="editTaskTitleFixed">Title</div>
                    <input id="editTaskTitleChangable" required class="inputsAddTask" value="${task['title']}" maxlength="30">
                </div>
                <div id="editTaskDescription" class="editTaskTitleFixed editTasksWidth80">
                    <div id="editTaskDescriptionFixed">Description</div>
                    <textarea id="editTaskDescriptionChangable" class="inputsAddTask" required maxlength="100">${task['description']}</textarea>
                </div>
                <div id="editTaskDueDate" class="editTaskTitleFixed editTasksWidth80">
                    <div id="editTaskDueDateFixed">Due Date</div>
                        <input
                            id="dueDateEdit"
                            class="inputsAddTask height51 padding hover"
                            type="date"
                            required
                            value="${task['dueDate']}"       
                            />
                </div> 
                <div id="editTaskPrio" class="editTaskTitleFixed editTasksWidth80">
                    <div id="editTaskPrioFixed">Priority</div>
                    <div id="editTaskPrioChangable"> 
                        <button id="urgentEdit" type="button" onclick="editPrio('urgent', 'Edit', ${id})" class="prio height51 hover">
                        Urgent <img src="assets/img/urgent.png" />
                        </button>
                        <button id="mediumEdit" type="button" onclick="editPrio('medium', 'Edit', ${id})" class="prio height51 hover">
                            Medium <img src="assets/img/medium.png" />
                        </button>
                        <button id="lowEdit" type="button" onclick="editPrio('low', 'Edit', ${id})" class="prio height51 hover">
                            Low <img src="assets/img/low.png" />
                        </button>
                    </div>
                    <div id="prioAlertEdit" class="alert"></div>
                </div>
                <div id="editTaskAssigned" class="editTaskTitleFixed">
                    <div id="editTaskAssignedFix">Assigned to</div>
                    <div id="editContactContainer" class="inputsAddTask editAssignment"></div>
                    <div id="editContactAlert" class="alert"></div>
                    <div id="editTaskAssignedChangable"></div>
                </div>
            </div>
</form>
    `
    let assignedCard = task['assignedContacts'];
    renderContacts('editContactContainer', 'Edit');
    renderDueDate('Edit');
    renderContactsAssignContacts(assignedCard);
    createAssignmentIcons(assignedCard, "editTaskAssignedChangable");
    renderAssignedPrio(task["prio"], 'Edit');
}

/**
 * this function assigns the clicked-on priority to the global variable assignedPrio or unassigns it at the 2nd click
 * @param {string} chosenPrio - id of clicked-on priority
 */
function editPrio(chosenPrio, modus, id) {
    document.getElementById(`prioAlert${modus}`).innerHTML = '';
    if (prioToEdit === chosenPrio) {
        prioToEdit = '';
    } else {
        prioToEdit = chosenPrio;
    }
    renderAssignedPrio(chosenPrio, modus);
  }

/**
 * 
 * @param {*} assContacts 
 */
function renderContactsAssignContacts(assContacts) {
    let searchArea = document.getElementsByClassName("contactList");
    for (let c = 0; c < assContacts.length; c++) {
        const assContact = assContacts[c];
        for (let d = 0; d < searchArea.length; d++) {
            const searchElement = searchArea[d];
            searchValue = searchElement.textContent || searchElement.innerText;

            if (searchValue.indexOf(assContact.user_name) > -1) {
                classContainer = d;
                assignContact(d, 'Edit')
            }
        }
    }
    updateAssignedContacts(); //Array with assignedContacts loaded and avoid alert 
}


/**
 * save edited Task, close EditMode and render board
 * @param {*} id 
 */
async function saveEditedBoard(id) {
    let prioFilled = checkEditedPrio();
    let correctContact = checkCorrectContact();
    if (prioFilled == true && correctContact == true) {
        let title = document.getElementById("editTaskTitleChangable").value;
        let description = document.getElementById("editTaskDescriptionChangable").value;
        let dueDate = document.getElementById("dueDateEdit").value;
        let task = {
            'title': title,
            'description': description,
            'category': assignedCategory,
            'assignedContacts': assignedContacts,
            'dueDate': dueDate,
            'prio': prioToEdit,
            'column': column,
            'subtasks': subTasksArray,
        }
        tasks[id] = task;
        await saveTask();
        closeEditTask();
        await renderBoardCards();
        flushSubtasks();
    }
}

async function saveBoard(id) {
        tasks[id]['subtasks'] = subTasksArray;
        console.log(tasks[id]);
        await saveTask();
        closeEditTask();
        await renderBoardCards();
        flushSubtasks();
}

/**
  * this function checks if a priority is assigned to task and writes an alert otherwise
  * @param - no param
*/
function checkEditedPrio() {
    if (typeof prioToEdit !== 'undefined' && prioToEdit !== null && prioToEdit !== '') {
      return true;
    } else {
     document.getElementById(`prioAlertEdit`).innerHTML ='Please select a priority!';
    }
  }

function preventBackgroundScroll() {
        document.getElementById('board').style.overflow = 'hidden'; 
}


function enableBackgroundScroll() {
    document.getElementById('board').style.overflow = ''; 
}


function disableBackgroundScroll() {
        preventBackgroundScroll();
}


