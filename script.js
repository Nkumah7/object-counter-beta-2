const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const flipBtn = document.getElementById('flip-btn');
const videoClass = document.querySelector('.environment');
const video = document.getElementById('video');

let mode = { exact: videoClass.classList.value };

stopBtn.setAttribute("disabled", "");
flipBtn.setAttribute("disabled", "");

let constraints = {
    audio: false,
    video:  {
        width: {
            min: 1024,
            ideal: 1280,
            max: 1920,
        },
        height: {
            min: 576,
            ideal: 720,
            max: 1080
        },
    },
    facingMode: {exact: mode}
}

function facingDirection () {
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
    };
};

const stopWebcam = function () {
    const stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
};

startBtn.addEventListener("click", () => {
    console.log(mode);
    facingDirection();    
    startBtn.setAttribute("disabled", "");
    stopBtn.removeAttribute("disabled");
    flipBtn.removeAttribute("disabled");
});

stopBtn.addEventListener("click", () => {
        stopWebcam();
        startBtn.removeAttribute("disabled");
        stopBtn.setAttribute("disabled", "");
        flipBtn.setAttribute("disabled", "");
});

flipBtn.addEventListener("click", () => {
    if (mode.exact == "environment") {
        mode = "user";       
    } else {
        mode = { exact: "environment" };
    }
    console.log(mode)

    facingDirection();
});









// const flipCamera = function () {
//     let constraints = {audio: false, video: true}

//     if (mode == "user") {
//         mode = { exact: "environment"}        
//     } else {
//         mode = "user"
//     }
//     constraints.facingMode = mode
//     console.log("Flipped", constraints.facingMode)
//     if (navigator.mediaDevices.getUserMedia) {
//             navigator.mediaDevices.getUserMedia(constraints)
//                 .then(function (stream) {
//                     if ('srcObject' in video) {
//                         video.srcObject = stream;
//                     } else {
//                         video.src = window.URL.createObjectURL(stream)
//                     }                
//                 }).catch(function (error) {
//                     console.log("Something went wrong!");
//                 });
//         }    
// }
// flipBtn.addEventListener("click", () => {
//     flipCamera();
//     // flipBtn.setAttribute("disabled", "");
//     // startBtn.setAttribute("disabled", "");
//     // stopBtn.removeAttribute("disabled");    
// });

// clickedStart();
// clickedStop();

/* Flip Camera Funtionality */
// function clickedFlip() {
//     const flipCamera = function () {
//         let on_stream_video = document.getElementById('video');
        
//         // default user media options
//         let constraints = { audio: false, video: true }
//         let shouldFaceUser = true;
        
//         // check whether we can use facingMode
//         let supports = navigator.mediaDevices.getSupportedConstraints();
//             if( supports['facingMode'] === true ) {
//             flipBtn.disabled = false;
//         }

//         let stream = null;    

        
//         constraints.video = {
//             width: {
            // min: 1024,
            // ideal: 1280,
            // max: 1920,
//         },
//         height: {
            // min: 576,
            // ideal: 720,
            // max: 1080
//         },
//         facingMode: shouldFaceUser ? 'user' : 'environment'
//         };
//         navigator.mediaDevices.getUserMedia(constraints)
//         .then(function(mediaStream) {
//             stream  = mediaStream;
//             on_stream_video.srcObject = stream;
//             on_stream_video.play();
//         })
//         .catch(function(err) {
//             console.log(err)
//         });

//         flipBtn.addEventListener('click', function(){
//             if( stream == null ) return
//             // we need to flip, stop everything
//             stream.getTracks().forEach(t => {
//             t.stop();
//         });
//         // toggle / flip
//         shouldFaceUser = !shouldFaceUser;
//             // capture();
            
//             })

//         // capture();
//     };
// };
// flipWebcam();

// function isFlipped() {
//     flipBtn.addEventListener('click', () => {
//     // return;
//     })
// }
// flipWebcam();

// if (isFlipped) {
//     flipWebcam();
// }




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



