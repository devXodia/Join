function htmlEditOverview(id, colorCode, prio){
    return /*html*/`
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
`;
}

function editModeTemplate(id, task){
    return /*html*/`
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
}