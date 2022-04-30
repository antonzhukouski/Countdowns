const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
const dataName = "ZHUKOUSKI_CALIBRATION_TIMER";
let newPassword;
let timersData;
let device;
let typeId;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  device = "mobile";
} else {
  device = "desktop";
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

function GetTimersInfo() {
  newPassword = Math.random();
  $.ajax( {
    url : ajaxHandlerScript, 
    type : 'POST',
    dataType:'json',
    data : { f : 'LOCKGET', n : dataName, p : newPassword},
    cache : false,
    success : CheckTimersInfo,
    error : errorHandler
  }
  );
}

function GetMouseOver(el, color) {
  let paths = Array.from(el.getElementsByTagName("path"));
  paths.forEach(elem => {
    elem.style.fill = color;
  })
}

const closeA = document.getElementById("closeSvg");
const closeSvg = closeA.appendChild(document.createElement("img"));
closeSvg.setAttribute("src", "./Cancel.svg");
const addCountsTimer = document.getElementById("addCountsTimer");
const saveImageCounts = addCountsTimer.appendChild(document.createElement("img"));
saveImageCounts.setAttribute("src", "./Save.svg")
const addDoseTimer = document.getElementById("addDoseTimer");
const saveImageDose = addDoseTimer.appendChild(document.createElement("img"));
saveImageDose.setAttribute("src", "./Save.svg")

function CheckTimersInfo(dataContent) {
  if (dataContent.error) {
    alert('Попробуйте обновить страницу через 1 минуту!')
  } else if (dataContent.result) {
    timersData = JSON.parse(dataContent.result);
  } 
}

document.getElementById('addCountsTimer').onclick = function(event) {
  let target = event.target.parentElement;
  if ((target.id === 'timerTypeCounts' || target.id === 'timerTypeDose') && target.tagName === 'INPUT') {
    ShowNewTimerSettings()
  } else if (target.id === 'addCountsTimer') {
    const measurementType = "counts";
    const duId = document.getElementById('duIdCounts');
    const duType = document.getElementById('duTypeCounts');
    const cps = document.getElementById('cps');
    const counts = document.getElementById('counts');
    AddNewTimer(measurementType, duId, duType, cps, counts);
  } else if (target.id === 'addDoseTimer') {
    const measurementType = "dose";
    const duId = document.getElementById('duIdDose');
    const duType = document.getElementById('duTypeDose');
    const doseRate = document.getElementById('doseRate');
    const dose = document.getElementById('dose');
    AddNewTimer(measurementType, duId, duType, doseRate, dose);
  }
}

function ShowNewTimerSettings() {
  let timerTypeRadio = document.getElementsByName('timerType');
  for (let i = 0; i < timerTypeRadio.length; i++) {
    if (timerTypeRadio[i].checked === true) {
      typeId = "addCountsTimer";
      document.getElementById(`${timerTypeRadio[i].id}Settings`).style.display = 'block';
    } else {
      document.getElementById(`${timerTypeRadio[i].id}Settings`).style.display = 'none';
    }
  }
}

function StartAudio(){
  const myAudio = new Audio;
  myAudio.src = "./start.mp3";
  myAudio.autoplay = true;
}

function CheckValue(elem) {
  if (!elem.value) {
    elem.placeholder = "Enter a valid value!";
    elem.className = "input-error";
    return true;
  } else {
    if (elem.className = "input-error") {
      elem.className = "";
      return false;
    }
  }
}

function AddNewTimer (measurementType, id, duType, momental, total) {
  const idValue = parseInt(id.value);
  const momentalValue = parseFloat(momental.value);
  const totalValue = parseFloat(total.value);
  const duTypeValue = duType.value;

  let errorsCounter = 0;
  errorsCounter += CheckValue(id);
  errorsCounter += CheckValue(duType);
  errorsCounter += CheckValue(momental);
  errorsCounter += CheckValue(total);

  id.addEventListener("blur", () => {CheckValue(id)});
  duType.addEventListener("blur", () => {CheckValue(duType)});
  momental.addEventListener("blur", () => {CheckValue(momental)});
  total.addEventListener("blur", () => {CheckValue(total)});

  if (!errorsCounter) {
    if (device === "desktop") {
      StartAudio();
    } else if (device === "mobile") {
      window.navigator.vibrate(400);
    }
    let time = Date.now() + (totalValue/momentalValue)*1000;
    timersData.dataValue["id"+idValue] = {
      measure: measurementType,
      momental: momentalValue,
      duType: duTypeValue,
      total: totalValue,
      timeEnd: time,
    };
    
    if (timersData.keysValue.indexOf("id" + idValue) < 0) {
      timersData.keysValue.push("id" + idValue)
    }
    setTimeout (() => {
      $.ajax( {
        url : ajaxHandlerScript,
        type : 'POST', dataType:'json',
        data : { f : 'UPDATE', n : dataName,
          v : JSON.stringify(timersData),
          p : newPassword },
        cache : false,
        success : document.location.href = './index.html',
        error : errorHandler
      }
      );
    }, 500);
  };
}

document.getElementById("newTimer").addEventListener("touchstart", HandleTouchStart, false);
document.getElementById("newTimer").addEventListener("touchend", HandleTouchEnd, false)
document.getElementById("newTimer").addEventListener("touchmove", HandleTouchMove, false)

let xDown = null;
let yDown = null;
let xDiff = null;
let yDiff = null;

function HandleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function getTouches(evt) {
  return evt.touches ||
  evt.originalEvent.touches;
}

function HandleTouchMove(evt) {
  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;
  xDiff = xDown - xUp;
  yDiff = yDown - yUp;
}

function HandleTouchEnd(evt) {
  if (yDiff > 100 && yDiff > xDiff) {
    if (typeId === "addCountsTimer") {
      const measurementType = "counts";
      const duId = document.getElementById('duIdCounts');
      const duType = document.getElementById('duTypeCounts');
      const cps = document.getElementById('cps');
      const counts = document.getElementById('counts');
      AddNewTimer(measurementType, duId, duType, cps, counts);
    } else if (typeId = "addDoseTimer") {
      const measurementType = "dose";
      const duId = document.getElementById('duIdDose');
      const duType = document.getElementById('duTypeDose');
      const doseRate = document.getElementById('doseRate');
      const dose = document.getElementById('dose');
      AddNewTimer(measurementType, duId, duType, doseRate, dose);
    }
  }
}

ShowNewTimerSettings();
GetTimersInfo();
