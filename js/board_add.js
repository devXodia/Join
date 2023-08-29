function openAddTask(column) {
    localStorage.setItem('column', column);
    let parentElement = document.getElementById('addTaskBoardContainer').parentNode;
    let board = document.getElementById('board');
    if (isMobileDevice()) {
        window.location.href = "add_task.html";
    } else {
        document.getElementById('addTaskBoard').classList.remove('d-none');
        initTask();
        document.getElementById('addTaskBoardContainer').classList.add('slideIn');
        parentElement.addEventListener("click", function() {
            closeAddTask()
          });
        board.style.overflow = "hidden";
    }
}

function closeAddTask() {
    let board = document.getElementById('board');
    let parentElement = document.getElementById('addTaskBoardContainer').parentNode;
    document.getElementById('addTaskBoard').classList.add('d-none');
    document.getElementById('addTaskBoardContainer').classList.remove('slideOut');
    board.style.overflow = "";
    parentElement.removeEventListener("click", function() {
        closeAddTask()
      });
}
