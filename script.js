const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const flipBtn = document.getElementById('flip-btn');
stopBtn.setAttribute("disabled", "");
flipBtn.setAttribute("disabled", "");


const startWebcam = function () {
    const video = document.getElementById('video')
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { facingMode: "environment" }
        })
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



/* Flip Camera Funtionality */
const flipWebcam = function () {
    let on_stream_video = document.getElementById('video');
    
    // default user media options
    let constraints = { audio: false, video: true }
    let shouldFaceUser = true;
    
    // check whether we can use facingMode
    let supports = navigator.mediaDevices.getSupportedConstraints();
        if( supports['facingMode'] === true ) {
        flipBtn.disabled = false;
    }

    let stream = null;    

    function capture() {
        constraints.video = {
            width: {
            min: 192,
            ideal: 192,
            max: 192,
        },
        height: {
            min: 192,
            ideal: 192,
            max: 192
        },
        facingMode: shouldFaceUser ? 'user' : 'environment'
        }
        console.log(constraints)
        navigator.mediaDevices.getUserMedia(constraints)
        .then(function(mediaStream) {
            stream  = mediaStream;
            on_stream_video.srcObject = stream;
            on_stream_video.play();
        })
        .catch(function(err) {
            console.log(err)
        });
    }
    flipBtn.addEventListener('click', function(){
        if( stream == null ) return
        // we need to flip, stop everything
        stream.getTracks().forEach(t => {
        t.stop();
    });
    // toggle / flip
    shouldFaceUser = !shouldFaceUser;
    capture();
    
    })

    capture();
};

function isFlipped() {
    flipBtn.addEventListener('click', () => {
    return true;
    })
}

if (isFlipped) {
    flipWebcam();
}




// flipBtn.addEventListener('click', () => {
//     // const cameraToggle = document.querySelector('.camera-toggle')
//     const cameraToggle = document.querySelector('#video')
//     console.log(cameraToggle.value)
    // flipCamera(cameraToggle);
// })
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



