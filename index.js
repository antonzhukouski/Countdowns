const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
const dataName = "ZHUKOUSKI_CALIBRATION_TIMER";
let timersData;
let newPassword;
let device;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  device = "mobile";
} else {
  device = "desktop";
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

class Countdown {
  constructor(measure, num, duType, momental, total, timeEnd) {
    this.measure = measure;
    this.num = num;
    this.duType = duType;
    this.momental = momental;
    this.total = total;
    this.timeEnd = timeEnd;
  }

  createTimerBlock() {
    const newTimer = document.getElementById('timers').appendChild(document.createElement("div"));
    newTimer.id = this.num;
    newTimer.className = "timers__block";

    const infoBlock = newTimer.appendChild(document.createElement('div'));
    infoBlock.className = "timers__block__info"
    
    const blockName = infoBlock.appendChild(document.createElement("div"));
    const blockNameStrong = blockName.appendChild(document.createElement("strong"));
    blockNameStrong.textContent = "DU ID:";
    const blockNameContent = blockName.appendChild(document.createElement("span"));
    blockNameContent.textContent = this.num.slice(2);
    
    const duType = infoBlock.appendChild(document.createElement("div"));
    const duTypeStrong = duType.appendChild(document.createElement("strong"));
    duTypeStrong.textContent = "DU Type:";
    const duTypeContent = duType.appendChild(document.createElement("span"));
    duTypeContent.textContent = this.duType;
    
    const momental = infoBlock.appendChild(document.createElement("div"));
    const momentalStrong = momental.appendChild(document.createElement("strong"));
    const momentalContent = momental.appendChild(document.createElement("span"));
    const total = infoBlock.appendChild(document.createElement("div"));
    const totalStrong = total.appendChild(document.createElement("strong"));
    const totalContent = total.appendChild(document.createElement("span"));
    const editMomental = momental.appendChild(document.createElement("input"));
    const editTotal = total.appendChild(document.createElement("input"));

    totalStrong.textContent = "Total:";
    if (this.measure === "counts") {
      momental.id = this.num + "CountRate";
      momentalStrong.textContent = "Count Rate:";
      momentalContent.textContent = this.momental + " cps";
      total.id = this.num + "TotalCounts";
      totalContent.textContent = this.total + " counts";
      editMomental.placeholder = "Enter CPS";
      editTotal.placeholder = "Enter counts";
    } else if (this.measure === "dose") {
      momental.id = this.num + "DoseRate";
      momentalStrong.textContent = "Dose Rate";
      momentalContent.textContent = this.momental + "mSv/h";
      total.id = "TotalDose";
      totalContent.textContent = this.total + " mSv";
      editMomental.placeholder = "Enter dose rate";
      editTotal.placeholder = "Enter dose";
    }

    const timeLeft = infoBlock.appendChild(document.createElement("div"));
    timeLeft.id = this.num + "TimeLeft";
    const timeLeftStrong = timeLeft.appendChild(document.createElement("strong"));
    timeLeftStrong.textContent = "Left:";
    const timeLeftContent = timeLeft.appendChild(document.createElement("span"));
    timeLeftContent.id = this.num + "Left"
    // timeLeftContent.id = "TimeLeft" + this.num;
    timeLeftContent.textContent = Math.round((this.timeEnd - Date.now())/1000);

    const header3 = infoBlock.appendChild(document.createElement("h3"))
    header3.textContent = "Time is Over!";

    const newStart = newTimer.appendChild(document.createElement("a"));
    newStart.className = "timers__block_edit";
    const newStartImage = newStart.appendChild(document.createElement("img"));
    newStartImage.setAttribute("src", "./Edit.svg");
    newStartImage.id = this.num + "EditButton";
    newStart.setAttribute("onclick", "EditMeasurementLock(this.parentElement)");

    const del = newTimer.appendChild(document.createElement("a"));
    del.className = "timers__block_delete";
    const delImage = del.appendChild(document.createElement("img"));
    delImage.setAttribute("src", "./Delete.svg");
    delImage.id = this.num + "DeleteButton";
    del.setAttribute("onclick", "DeleteTimerLock(this.parentElement)");
    
    const save = newTimer.appendChild(document.createElement("a"));
    save.className = "timers__block_save";
    const saveImage = save.appendChild(document.createElement("img"));
    saveImage.setAttribute("src", "./Save.svg");
    saveImage.id = this.num + "SaveButton";
    // save.setAttribute("onclick", "EditMeasurementUpdate(this.parentElement);event.stopPropagation()");

    const cancel = newTimer.appendChild(document.createElement("a"));
    cancel.className = "timers__block_cancel";
    const cancelImage = cancel.appendChild(document.createElement("img"));
    cancelImage.setAttribute("src", "./Cancel.svg");
    cancelImage.setAttribute("id", `${this.num}CancelButton`)
    cancel.setAttribute("onclick", "CancelEdit(this.parentElement)");

    const radiationImage = newTimer.appendChild(document.createElement("img"));
    radiationImage.setAttribute("src", "./Radiation.svg");
    radiationImage.className = "radiation-image";
    let rotateAngle = 0;

    setInterval(function() {
      rotateAngle += 15;
      radiationImage.style.transform = `rotate(${rotateAngle}deg)`;
      return rotateAngle
    }, 50);
    
    if (timeLeftContent.textContent <= 0) {
      header3.style.display = 'block';
      timeLeft.style.display = 'none';
      
      let newOpacity = 0.5;
      let delta = 0.05;
      setInterval(function () {
        newOpacity += delta;
        if (newOpacity > 0.5) {
          delta *= -1;
        } else if (newOpacity <= 0) {
          delta *= -1;
        }
        radiationImage.style.opacity = newOpacity
      }, 50)
    }
    // @keyframes radiation-image {
    //   0% {
    //     transform: rotate(0deg);
    //   }
    //   100% {
    //     transform: rotate(360deg);
    //   }
    // }

      // svgArrowH.setAttribute('transform', `rotate(${angleH} ${side/2} ${side/2})`);
    }

    // cancel.classList = "timers__block_cancel";
    // cancel.textContent = "Cancel";
    // cancel.setAttribute("onclick", "CancelEdit(this.num)");
  

  tick() {
    const el = document.getElementById(this.num + "Left");
    el.textContent = Math.round((this.timeEnd - Date.now())/1000);
    if (el.textContent < 2) {
      if (device === "desktop") {
        PlayStopAudio();
      } else if (device === "mobile") {
        window.navigator.vibrate(1000);
      }
    }
    if (el.textContent <= 0) {
      el.textContent = 0;
      document.location.href = './index.html';
    };
  };
}

function UpdateIndexPage() {
  $.ajax( {
    url : ajaxHandlerScript,
    type : 'POST', dataType:'json',
    data : { f : 'UPDATE', n : dataName,
        v : JSON.stringify(timersData), p: newPassword},
    cache : false,
    success: document.location.href = './index.html',
    error : errorHandler
  }
  );   
}

function PlayStartAudio(){
  const myAudio = new Audio;
  myAudio.src = "./start.mp3";
  myAudio.autoplay = true;
}

function PlayStopAudio(){
  const myAudio = new Audio;
  myAudio.src = "./finish.mp3";
  myAudio.autoplay = true;
}

function CheckValue(newData) {
  // debugger
  if (!parseFloat(newData.value)) {
    newData.value = "";
    newData.placeholder = "Enter valid value";
    newData.className = "input-error";
    return true;
  } else {
    return false 
  }
}

// function ChangeOpacity(opac, d) {
//   console.log(opac)
//   opac += d;
//   if (opac >= 1) {
//     d *= -1;
//   } else if (opac <= 0) {
//     d*= -1;
//   }
//   return opac
// }

function EditMeasurementLock(editingId) {
  newPassword = Math.random();
  $.ajax( {
    url : ajaxHandlerScript, 
    type : 'POST',
    dataType:'json',
    data : { f : 'LOCKGET', n : dataName, p : newPassword},
    cache : false,
    success : EditMeasurement(editingId),
    error : errorHandler
  }
  );
}

function EditMeasurement(editingId) {
  const el = timersData.dataValue[editingId.id];
  let buttonEdit = document.getElementById(`${editingId.id}EditButton`);
  let buttonSave = document.getElementById(`${editingId.id}SaveButton`);
  let buttonCancel = document.getElementById(`${editingId.id}CancelButton`);
  buttonEdit.parentElement.style.display = 'none'
  buttonSave.parentElement.style.display = 'block';
  buttonCancel.parentElement.style.display = 'block';
  const spans = editingId.getElementsByTagName("span");
  spans[2].style.display = "none";
  spans[3].style.display = "none";
  let inputs = editingId.getElementsByTagName("input");
  Array.from(inputs).forEach(element => {
    element.style.display = "block";
  });
  buttonSave.setAttribute("onclick", "EditMeasurementUpdate(this.parentElement)");
}

function EditMeasurementUpdate(editingId) {
  // debugger
  const newData = Array.from(editingId.parentElement.getElementsByTagName("input"));
  const elem = timersData.dataValue[editingId.parentElement.id];
  elem.momental = CheckValue(newData[0]);
  elem.total = CheckValue(newData[1]);
  let checkCounter = 0;
  checkCounter += elem.momental;
  checkCounter += elem.total;
  if (!checkCounter) {
    PlayStartAudio()
    console.log(timersData)
    elem.momental = parseFloat(newData[0].value);
    elem.total = parseFloat(newData[1].value);
    elem.timeEnd = Date.now() + (elem.total/elem.momental)*1000;
    console.log(timersData)
    setTimeout(() => {
      $.ajax( {
        url : ajaxHandlerScript,
        type : 'POST', dataType:'json',
        data : { f : 'UPDATE', n : dataName,
            v : JSON.stringify(timersData), p: newPassword},
        cache : false,
        success: document.location.href = './index.html',
        // success: UpdateNewStart(editingId.parentElement),
        error : errorHandler
      }
      );
    }, 500);
  }
}

function UpdateNewStart(el) {
  // debugger
  let inputs = Array.from(el.getElementsByTagName("input"));
  let spans = Array.from(el.getElementsByTagName("span"));
  inputs.forEach(elem => elem.style.display = "none");
  spans.forEach(elem => elem.style.display = "block")
  let timeLeft = document.getElementById(`${el.id}TimeLeft`);
  timeLeft.style.display = "flex";
  el.getElementsByTagName('h3')[0].style.display = "none";
  let left = document.getElementById(`${el.id}Left`);
  left.textContent = timersData.dataValue[el.id].timeEnd - Date.now()
}


function DeleteTimerLock(deletedId) {
  delete timersData.dataValue[`${deletedId.id}`];
  let deletedInd = timersData.keysValue.indexOf(deletedId.id)
  timersData.keysValue.splice(deletedInd, 1);
  newPassword = Math.random();  
  $.ajax( {
    url : ajaxHandlerScript, 
    type : 'POST',
    dataType:'json',
    data : { f : 'LOCKGET', n : dataName, p : newPassword},
    cache : false,
    success : UpdateIndexPage,
    error : errorHandler
  }
  );
}

function UpdateStepDeleting() {
  $.ajax( {
    url : ajaxHandlerScript,
    type : 'POST', dataType:'json',
    data : { f : 'UPDATE', n : dataName,
        v : JSON.stringify(timersData), p: newPassword},
    cache : false,
    success: document.location.href = './index.html',
    error : errorHandler
  }
  );
}

function CancelEdit(editingId) {
  const el = timersData.dataValue[editingId.id];
  let buttonEdit = document.getElementById(`${editingId.id}EditButton`);
  let buttonSave = document.getElementById(`${editingId.id}SaveButton`);
  let buttonCancel = document.getElementById(`${editingId.id}CancelButton`);
  buttonEdit.parentElement.style.display = 'block'
  buttonSave.parentElement.style.display = 'none';
  buttonCancel.parentElement.style.display = 'none';
}

function GetTimersInfo() {
  $.ajax( {
    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
    data : { f : 'READ', n : dataName },
    success : CreateTimers,
    error : errorHandler
  }
  );
}

function CreateTimers (readResult) {
  timersData = JSON.parse(readResult.result)
  if (!timersData.keysValue.length) {
    return;
  }
  var timers = document.getElementById("timers");
  while (timers.childElementCount > 2) {
    timers.removeChild(timers.lastChild);
  }
  for (let i = 0; i < timersData.keysValue.length; i++) {
    const id = timersData.keysValue[i];
    let timersCount = new Countdown(
      timersData.dataValue[id].measure,
      id,
      timersData.dataValue[id].duType,
      timersData.dataValue[id].momental,
      timersData.dataValue[id].total,
      timersData.dataValue[id].timeEnd
    );
    timersCount.createTimerBlock();
    if (id && timersData.dataValue[id].timeEnd >  Date.now()) {
      setInterval(function(){timersCount.tick()}, 1000);
    }
  }
}

GetTimersInfo();
