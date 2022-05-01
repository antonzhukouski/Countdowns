const ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
const dataName = "ZHUKOUSKI_CALIBRATION_TIMER";
let timersData;
let newPassword;
let device;
let textChanged = false;
const editSvg = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#2D527C;" d="M342.12,495.498H44.573C19.996,495.498,0,475.504,0,450.927V61.072
c0-24.577,19.996-44.571,44.573-44.571H342.12c24.577,0,44.571,19.995,44.571,44.571V189.68c0,8.388-6.8,15.188-15.188,15.188
s-15.188-6.8-15.188-15.188V61.072c0-7.828-6.368-14.196-14.196-14.196H44.573c-7.828,0-14.197,6.368-14.197,14.196v389.853
c0,7.828,6.368,14.196,14.197,14.196H342.12c7.828,0,14.196-6.368,14.196-14.196v-50.639c0-8.388,6.8-15.188,15.188-15.188
s15.188,6.799,15.188,15.188v50.639C386.691,475.504,366.697,495.498,342.12,495.498z"/>
<rect x="107.536" y="98.554" style="fill:#CEE8FA;" width="171.62" height="61.764"/>
<g>
<path style="fill:#2D527C;" d="M279.155,175.505H107.536c-8.388,0-15.188-6.799-15.188-15.188V98.556
 c0-8.388,6.8-15.188,15.188-15.188h171.619c8.388,0,15.188,6.8,15.188,15.188v61.764
 C294.343,168.706,287.543,175.505,279.155,175.505z M122.724,145.13h141.244v-31.387H122.724V145.13z"/>
<path style="fill:#2D527C;" d="M496.812,175.704c-3.887,0-7.775-1.482-10.739-4.448l-39.295-39.295l-30.826,30.826
 c-5.929,5.931-15.546,5.932-21.478,0c-5.931-5.931-5.931-15.548,0-21.478l41.566-41.566c5.931-5.929,15.546-5.931,21.478,0
 l50.034,50.034c5.931,5.931,5.931,15.548,0,21.48C504.587,174.222,500.699,175.704,496.812,175.704z"/>
</g>
<polygon style="fill:#CEE8FA;" points="405.213,152.048 213.763,343.497 205.777,401.517 263.797,393.532 455.247,202.082 "/>
<g>
<path style="fill:#2D527C;" d="M205.777,416.705c-3.999,0-7.872-1.581-10.739-4.448c-3.361-3.361-4.954-8.101-4.306-12.811
 l7.986-58.02c0.451-3.282,1.964-6.327,4.306-8.669l191.449-191.449c2.848-2.848,6.711-4.448,10.739-4.448
 c4.028,0,7.892,1.601,10.739,4.448l50.034,50.034c5.931,5.931,5.931,15.548,0,21.478L274.537,404.272
 c-2.342,2.342-5.387,3.855-8.669,4.306l-58.018,7.986C207.157,416.658,206.465,416.705,205.777,416.705z M228.112,350.626
 l-4.558,33.114l33.112-4.558l177.1-177.1l-28.556-28.556L228.112,350.626z"/>
<path style="fill:#2D527C;" d="M205.777,416.705h-98.241c-8.388,0-15.188-6.799-15.188-15.188s6.8-15.188,15.188-15.188h98.241
 c8.388,0,15.188,6.799,15.188,15.188S214.166,416.705,205.777,416.705z"/>
</g>
</svg>`
const delSvg = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#2D527C;" d="M334.885,98.803c-1.182,0-2.381-0.142-3.579-0.439c-7.951-1.97-12.801-10.013-10.83-17.965
	l5.66-22.846l-99.892-24.752l-5.662,22.846c-1.97,7.951-10.021,12.801-17.965,10.83c-7.951-1.97-12.801-10.014-10.83-17.965
	l9.229-37.244c1.97-7.952,10.02-12.8,17.965-10.83L347.67,32.325c3.818,0.946,7.105,3.369,9.136,6.739
	c2.031,3.37,2.64,7.408,1.694,11.226l-9.229,37.245C347.597,94.288,341.542,98.803,334.885,98.803z"/>
<g>
	<polygon style="fill:#CEE8FA;" points="177.957,497.166 111.947,497.166 85.536,153.586 177.957,153.586 	"/>
	<polygon style="fill:#CEE8FA;" points="361.805,497.166 295.795,497.166 295.795,153.586 388.217,153.586 	"/>
</g>
<path style="fill:#2D527C;" d="M445.095,146.789L74.039,54.848c-7.945-1.971-15.995,2.876-17.965,10.83
	c-1.971,7.952,2.878,15.995,10.83,17.965l222.414,55.11h-111.36h-6.349H85.535c-4.131,0-8.075,1.724-10.883,4.754
	c-2.808,3.032-4.223,7.096-3.907,11.217l26.412,343.581c0.593,7.728,7.038,13.696,14.79,13.696h66.011h46.21
	c8.191,0,14.833-6.642,14.833-14.833c0-8.191-6.642-14.833-14.833-14.833h-31.377V168.419h88.169v328.747
	c0,8.191,6.642,14.833,14.833,14.833h66.01c7.752,0,14.196-5.967,14.79-13.696l25.491-331.609l35.874,8.89
	c1.199,0.297,2.397,0.439,3.579,0.439c6.657,0,12.712-4.515,14.385-11.269C457.897,156.802,453.048,148.759,445.095,146.789z
	 M101.552,168.419h61.573v313.914h-37.442L101.552,168.419z M348.068,482.333h-37.439V168.419H372.2L348.068,482.333z"/>
</svg>`
const saveSvg = `<?xml version="1.0" encoding="iso-8859-1"?>
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<g>
	<polygon style="fill:#CEE8FA;" points="431.485,15.058 431.485,260.04 80.515,260.04 80.515,15.058 26.959,15.058 26.959,496.942 
		80.515,496.942 80.515,379.968 431.485,379.968 431.485,496.942 485.04,496.942 485.04,15.058 	"/>
	<rect x="163.422" y="379.97" style="fill:#CEE8FA;" width="97.873" height="116.969"/>
</g>
<path style="fill:#2D527C;" d="M485.04,0h-53.555H195.688c-8.316,0-15.058,6.741-15.058,15.058s6.741,15.058,15.058,15.058h220.739
	v214.866H95.573V15.058C95.573,6.741,88.832,0,80.515,0H26.959c-8.316,0-15.058,6.741-15.058,15.058v481.884
	c0,8.316,6.741,15.058,15.058,15.058H80.5c0.005,0,0.009,0,0.015,0h82.907h97.873h92.942c8.316,0,15.058-6.741,15.058-15.058
	s-6.741-15.058-15.058-15.058h-77.884v-86.86h140.076v101.916c0,8.316,6.741,15.058,15.058,15.058h53.555
	c8.316,0,15.058-6.741,15.058-15.058V15.058C500.098,6.741,493.356,0,485.04,0z M95.573,481.884v-86.86h52.791v86.86H95.573z
	 M246.236,481.884h-67.757v-86.86h67.757V481.884z M469.982,481.884h-23.439V379.968c0-8.316-6.741-15.058-15.058-15.058H261.294
	h-97.873H80.515c-8.316,0-15.058,6.741-15.058,15.058v101.916H42.017V30.116h23.439V260.04c0,8.316,6.741,15.058,15.058,15.058
	h350.97c8.316,0,15.058-6.741,15.058-15.058V30.116h23.439v451.769H469.982z"/>
</svg>`
const cancelSvg = `<?xml version="1.0" encoding="iso-8859-1"?>
<!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
	 viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
<path style="fill:#2D527C;" d="M83.753,511.961c-21.451,0-42.904-8.167-59.236-24.497c-32.663-32.664-32.663-85.811,0-118.473
	l201.65-201.65c6.38-6.377,16.719-6.377,23.101,0c6.378,6.378,6.378,16.721,0,23.101l-201.65,201.65
	c-19.926,19.926-19.926,52.348,0,72.273c19.926,19.927,52.346,19.924,72.272,0l344.455-344.455
	c19.926-19.926,19.926-52.348,0-72.273c-19.927-19.929-52.348-19.926-72.272,0l-51.881,51.881c-6.38,6.377-16.719,6.377-23.101,0
	c-6.378-6.378-6.378-16.721,0-23.101l51.881-51.881c32.664-32.659,85.808-32.661,118.472,0c32.663,32.663,32.663,85.809,0,118.473
	L142.988,487.464C126.656,503.794,105.205,511.961,83.753,511.961z"/>
<path style="fill:#CEE8FA;" d="M475.894,475.914L475.894,475.914c-26.336,26.336-69.036,26.336-95.373,0L36.066,131.459
	c-26.336-26.336-26.336-69.036,0-95.373l0,0c26.336-26.336,69.036-26.336,95.373,0l344.455,344.455
	C502.231,406.878,502.231,449.577,475.894,475.914z"/>
<path style="fill:#2D527C;" d="M428.208,512c-22.377,0-43.413-8.714-59.237-24.535L24.517,143.01
	c-32.663-32.664-32.663-85.809,0-118.473C40.341,8.714,61.377,0,83.753,0c22.377,0,43.413,8.714,59.238,24.535L487.445,368.99
	c15.822,15.824,24.535,36.86,24.535,59.238c0,22.377-8.714,43.413-24.535,59.238C471.621,503.286,450.585,512,428.208,512z
	 M83.753,32.667c-13.648,0-26.483,5.315-36.135,14.968c-19.926,19.926-19.926,52.348,0,72.273l344.455,344.455
	c9.652,9.653,22.487,14.968,36.137,14.968c13.648,0,26.483-5.315,36.135-14.968c9.653-9.652,14.968-22.487,14.968-36.137
	c0-13.65-5.315-26.485-14.968-36.137L119.889,47.636C110.238,37.982,97.403,32.667,83.753,32.667z"/>
</svg>`


if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
  device = "mobile";
} else {
  device = "desktop";
}

function errorHandler(jqXHR,statusStr,errorStr) {
  alert(statusStr+' '+errorStr);
}

function txtChanged(EO) {
  EO=EO||window.event;
  textChanged=true;
}

window.onbeforeunload=befUnload;

function befUnload(EO) {
  EO=EO||window.event;
  if ( textChanged )
    EO.returnValue="На странице есть несохранённые изменения. Вы уверерены, что хотите покинуть страницу?";
};

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
      momentalStrong.textContent = "Dose Rate:";
      momentalContent.textContent = this.momental + " mSv/h";
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
    timeLeftContent.id = this.num + "Left";
    timeLeftContent.textContent = Math.round((this.timeEnd - Date.now())/1000) + " seconds";

    const header3 = infoBlock.appendChild(document.createElement("h3"))
    header3.textContent = "Time is Over!";

    const newStart = newTimer.appendChild(document.createElement("div"));
    newStart.className = "timers__block_edit";
    newStart.id = this.num + "EditButton";
    newStart.innerHTML = editSvg;
    newStart.addEventListener('mouseenter', e => {
      GetMouseOver(newStart, "red");
    });
    newStart.addEventListener('mouseleave', e => {
      GetMouseOver(newStart, "#2d527c");
    });
    newStart.setAttribute("onclick", "EditMeasurement(this.parentElement)");
      

    const del = newTimer.appendChild(document.createElement("a"));
    del.className = "timers__block_delete";
    del.id = this.num + "DeleteButton";
    del.innerHTML = delSvg;
    del.addEventListener('mouseenter', e => {
      GetMouseOver(del, "red");
    });
    del.addEventListener('mouseleave', e => {
      GetMouseOver(del, "#2d527c");
    });
    del.setAttribute("onclick", "DeleteTimerLock(this.parentElement)");
    
    const save = newTimer.appendChild(document.createElement("a"));
    save.className = "timers__block_save";
    save.id = this.num + "SaveButton";
    save.innerHTML = saveSvg;
    save.addEventListener('mouseenter', e => {
      GetMouseOver(save, "red");
    });
    save.addEventListener('mouseleave', e => {
      GetMouseOver(save, "#2d527c");
    });
    save.setAttribute("onclick", "EditMeasurementUpdate(this.parentElement);event.stopPropagation()");
    
    const cancel = newTimer.appendChild(document.createElement("a"));
    cancel.className = "timers__block_cancel";
    cancel.id = this.num + "CancelButton";
    cancel.innerHTML = cancelSvg;
    cancel.addEventListener('mouseenter', e => {
      GetMouseOver(cancel, "red");
    });
    cancel.addEventListener('mouseleave', e => {
      GetMouseOver(cancel, "#2d527c");
    });
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
    if (parseInt(timeLeftContent.textContent) <= 0) {
      header3.style.display = 'block';
      timeLeft.style.display = 'none';
      
      let newOpacity = 0.5;
      let delta = 0.03;
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
  }

  tick() {
    const el = document.getElementById(this.num + "Left");
    el.textContent = Math.round((this.timeEnd - Date.now())/1000);
    if (el.textContent < 2) AddDeviceEvent("stop")
    
    if (el.textContent <= 0) {
      el.textContent = 0;
      document.location.href = './index.html';
    };
  };
}

function GetMouseOver(el, color) {
  let paths = Array.from(el.getElementsByTagName("path"));
  paths.forEach(elem => {
    elem.style.fill = color;
  })
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

function AddDeviceEvent(evt) {
  if (device === "desktop") {
    if (evt === "start") {
      PlayStartAudio();
    } else PlayStopAudio();
  } else if (device === "mobile") {
    window.navigator.vibrate(400);
  }
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
  if (!parseFloat(newData.value)) {
    newData.value = "";
    newData.placeholder = "Enter valid value";
    newData.className = "input-error";
    return true;
  } else {
    return false 
  }
}

function EditMeasurement(editingId) {
  const el = timersData.dataValue[editingId.id];
  let buttonEdit = document.getElementById(`${editingId.id}EditButton`);
  let buttonSave = document.getElementById(`${editingId.id}SaveButton`);
  let buttonCancel = document.getElementById(`${editingId.id}CancelButton`);
  const spans = editingId.getElementsByTagName("span");
  let inputs = editingId.getElementsByTagName("input");
  buttonEdit.style.display = 'none'
  buttonSave.style.display = 'block';
  buttonCancel.style.display = 'block';
  spans[2].style.display = "none";
  spans[3].style.display = "none";
  spans[4].parentElement.style.display = "none";
  editingId.getElementsByTagName("h3")[0].style.display = "none";
  Array.from(inputs).forEach(element => {
    element.style.display = "block";
    element.onchange=txtChanged;
    element.onkeypress=txtChanged;
    element.onpaste=txtChanged;
    element.oncut=txtChanged;
  });
}

function EditMeasurementUpdate(editingId) {
  const newData = Array.from(editingId.getElementsByTagName("input"));
  const elem = timersData.dataValue[editingId.id];
  elem.momental = CheckValue(newData[0]);
  elem.total = CheckValue(newData[1]);
  let checkCounter = 0;
  checkCounter += elem.momental;
  checkCounter += elem.total;
  if (!checkCounter) {
    AddDeviceEvent('start')
    elem.momental = parseFloat(newData[0].value);
    elem.total = parseFloat(newData[1].value);
    elem.timeEnd = Date.now() + (elem.total/elem.momental)*1000;
    textChanged = false;
    setTimeout(() => {
      newPassword = Math.random();
      $.ajax( {
        url : ajaxHandlerScript, 
        type : 'POST',
        dataType:'json',
        data : { f : 'LOCKGET', n : dataName, p : newPassword},
        cache : false,
        success : UpdateNewStart,
        error : errorHandler
      }
      );
    }, 500);
  }
}




function UpdateNewStart(el) {
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
  let buttonEdit = document.getElementById(`${editingId.id}EditButton`);
  let buttonSave = document.getElementById(`${editingId.id}SaveButton`);
  let buttonCancel = document.getElementById(`${editingId.id}CancelButton`);
  const inputs = Array.from(editingId.getElementsByTagName("input"));
  const spans = Array.from(editingId.getElementsByTagName("span"));
  buttonEdit.style.display = 'block'
  buttonSave.style.display = 'none';
  buttonCancel.style.display = 'none';
  inputs.forEach(el => {el.style.display = "none"});
  spans.forEach(el => {el.style.display = "block"});
  debugger
  if (Date.now() > timersData.dataValue[editingId.id].timeEnd) {
    editingId.getElementsByTagName("h3")[0].style.display = "block"
  } else {
    document.getElementById(`${editingId.id}TimeLeft`).style.display = "flex";
    document.getElementById(`${editingId.id}Left`).textContent += " seconds";
  }
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
