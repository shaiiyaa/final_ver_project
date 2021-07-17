function taskToStorage() {// save new task
    const newTaskInfo = document.getElementById("taskDetails");// mission description
    const newTaskDl = document.getElementsByTagName("input");//mission timeline
    const newData = {
        task: newTaskInfo.value,
        date: newTaskDl[0].value,
        time: newTaskDl[1].value,
    }
    
    if (localStorage.getItem("taskData") === null) {
        localStorage.setItem("taskData", "[]");
    }
    
    // validation
    if(newTaskInfo.value === "") {
        alert("Insert task details please!");
        newTaskInfo.style.backgroundColor = "red";
        newTaskInfo.style.opacity = "0.3";
        event.preventDefault();
        taskDetails.focus();
        return;
    }

    const oldData = JSON.parse(localStorage.getItem("taskData"));
    oldData.push(newData);
    localStorage.setItem("taskData", JSON.stringify(oldData));
}


function loadTasks(Anim) {//Anim = cancel animation
    const localData = JSON.parse(localStorage.getItem("taskData"));             
    if (localData === null) {  //memory check for load notes
        return
    }

    document.getElementById("classDiv").innerHTML = "";// clear all

    let btnIndex = 0;// index for note
    for (objects of localData) {
        const element = document.createElement("div");// create privat div for note
        let clearGlyph = `<button onClick="clearBtn(${btnIndex})" class="glyphicon glyphicon-remove-sign"></button>`;
        let note = "";
        for (dataObj in objects) {
            note += "<p>" + objects[dataObj]+ "</p>";
        }
        element.innerHTML = note + clearGlyph;// one note with close button
        element.style.animationDuration = Anim; //no animation when closing
        document.getElementById("classDiv").appendChild(element);
        btnIndex++;
    }
    currentDate();// update general date and time
}


function clearBtn(index) { // clear single note function    // index = note ID
    let oldData = JSON.parse(localStorage.getItem("taskData"));
    oldData.splice(index, 1); // delete specific note/mission 
    localStorage.setItem("taskData", JSON.stringify(oldData));
    
    const noAnim = "0.0s";// cancel fadein 
    loadTasks(noAnim);
}


function clearMemory() { // clear all notes
    localStorage.clear("taskData");
    document.getElementById("classDiv").innerHTML = JSON.parse(localStorage.getItem("taskData"));
}


function currentDate() {
    const today = new Date;

    let month = today.getMonth(); // add "0" before if singel number
    month = month + 1;
    let day= today.getDate();
    if (month < 10) {month = "0" + month}
    if (day < 10) {day = "0" + day}
    
    let hour= today.getHours() // // add "0" before if singel number
    let minute= today.getMinutes()
    if (hour < 10) {hour = "0" + hour}
    if (minute < 10) {minute = "0" + minute}
    
    const date = today.getFullYear() + "-" + month + "-" + day;
    const time = hour + ":" + minute;
    document.getElementById("dlDate").value = date;
    document.getElementById("dlTime").value = time;
    return date;
}

function onTyping() {         // clear red error background when typing
    const textBox = document.getElementById("taskDetails");
    textBox.style.backgroundColor = "transparent";
    textBox.style.opacity = "1";
}