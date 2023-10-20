const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
let flipBtn = document.getElementById("flip-btn");
stopBtn.setAttribute("disabled", "");
flipBtn.setAttribute("disabled", "");


const startWebcam = function () {
    const video = document.getElementById('video')
        // vendorUrl = window.URL || window.webkitURL;
    const constraints = {
        video: null,
    };
    
    if (video.value == "environment") {
        constraints.video = {
            facingMode: { exact: "environment" }
        }        
    } else {
        constraints.video = { facingMode: "user" }        
    };

    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (stream) {
                if ('srcObject' in video) {
                    video.srcObject = stream;
                } else {
                    video.src = window.URL.createObjectURL(stream)
                }                
            }).catch(function (error) {
                console.log("Something went wrong!");
            });
    }
}
startBtn.addEventListener("click", () => {
    startWebcam();
    startBtn.setAttribute("disabled", "");
    stopBtn.removeAttribute("disabled");
    flipBtn.removeAttribute("disabled");
});


const stopWebcam = function () {
    const stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
}

stopBtn.addEventListener("click", () => {
    stopWebcam();
    startBtn.removeAttribute("disabled");
    stopBtn.setAttribute("disabled", "");
    flipBtn.setAttribute("disabled", "");
});


const flipCamera = function (btn) {
    if (btn.value == "user") {
        btn.value = "environment";
        startWebcam();
    } else {
        btn.value = "user"
        startWebcam();
    }
};

flipBtn.addEventListener('click', () => {
    flipCamera(flipBtn);
})
// let toggleCamera = document.getElementById("webcam");
// toggleCamera.addEventListener('click', () => {
//     toggle(toggleCamera);
// })










// function toggle(btn) {
//     if (btn.value == "start") {
//         btn.value = "stop";
//         btn.classList.remove("btn-success");
//         btn.classList.add("btn-danger");
//         btn.innerText = "Stop Camera";
//         start();
//     } else {
//         btn.value = "start";
//         btn.classList.remove("btn-danger");
//         btn.classList.add("btn-success");
//         btn.innerText = "Start Camera";
//         stop();
//     }
// }

// function toggleCamera(mode) {
//     if (mode == "user") {
//         return "environment"
//     } else {
//         return "user"
//     }
// }



