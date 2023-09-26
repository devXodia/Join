function openAddTask(column) {
  localStorage.setItem("column", column);
  let parentElement = document.getElementById(
    "addTaskBoardContainer"
  ).parentNode;
  let board = document.getElementById("board");
  if (isMobileDevice()) {
    window.location.href = "add_task.html";
  } else {
    document.getElementById("addTaskBoard").classList.remove("d-none");
    initTask();
    document.getElementById("addTaskBoardContainer").classList.add("slideIn");

    board.style.overflow = "hidden";
    addListener();
  }
}

function addListener() {
  container = document.getElementById("addTaskBoard");
  wrapper = document.getElementById("wrapper_for_close_task");
  window.onclick = function (event) {
    if (event.target == container && event.target != wrapper) {
      closeAddTask();
    }
    if (event.target == wrapper) {
      event.stopPropagation();
      const optionsDiv = document.getElementById('categoryOptions');
      const contactDiv = document.getElementById('contactsOptionsAdd')
      optionsDiv.classList.add("hidden");
      contactDiv.classList.add("hidden");
    }
  };
}

function closeAddTask() {
  let board = document.getElementById("board");
  let parentElement = document.getElementById(
    "addTaskBoardContainer"
  ).parentNode;
  document.getElementById("addTaskBoard").classList.add("d-none");
  document.getElementById("addTaskBoardContainer").classList.remove("slideOut");
  board.style.overflow = "";
  parentElement.removeEventListener("click", function () {
    closeAddTask();
  });
}
