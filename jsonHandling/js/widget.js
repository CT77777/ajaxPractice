// Request employee status
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    var employees = JSON.parse(xhr.responseText);
    let employeeList = `<ul class="bulleted">`;
    for (employee of employees) {
      if (employee.inoffice === true) {
        employeeList += `<li class="in">${employee.name}</li>`;
      } else {
        employeeList += `<li class="out">${employee.name}</li>`;
      }
    }
    employeeList += `</ul>`;
    document.querySelector("#employeeList").innerHTML = employeeList;
  }
};
xhr.open("GET", "data/employees.json");
xhr.send();

// Request room status
var getRoomStatus = new XMLHttpRequest();
getRoomStatus.onreadystatechange = () => {
  if (getRoomStatus.readyState === 4) {
    if (getRoomStatus.status === 200) {
      const roomData = JSON.parse(getRoomStatus.responseText);
      let roomStatus = `<ul class="rooms">`;

      for (room of roomData) {
        if (room.available === true) {
          roomStatus += `<li class="empty">${room.room}</li>`;
        } else {
          roomStatus += `<li class="full">${room.room}</li>`;
        }
      }
      roomStatus += `</ul>`;
      document.querySelector("#roomList").innerHTML = roomStatus;
    }
  }
};
getRoomStatus.open("GET", "data/rooms.json");
getRoomStatus.send();
