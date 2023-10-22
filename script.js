const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const flipBtn = document.getElementById('flip-btn');
const videoClass = document.querySelector('.environment');
const video = document.getElementById('video');

let mode = videoClass.classList.value;
// console.log(mode)

stopBtn.setAttribute("disabled", "");
flipBtn.setAttribute("disabled", "");

// let constraints = {
//     audio: false,
//     video:  {
//         width: {
//             min: 1024,
//             ideal: 1280,
//             max: 1920,
//         },
//         height: {
//             min: 576,
//             ideal: 720,
//             max: 1080
//         },
//         facingMode: { exact: mode }
//     },
    
// }


// function facingDirection () {
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
//         });
//     };
// };

let constraints = {
    video: {
        facingMode: "environment", 
        width: 1280, 
        height: 720        
    },
};
// constraints.video.facingMode = "environment";
const startWebcam = function () {    
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
            video.srcObject = stream;
            video.onloadedmetadata = () => {
                video.play();
        };
    })
    .catch((err) => {
        console.error(`${err.name}: ${err.message}`)
    });
}


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
    startWebcam();  
    console.log(constraints.video.facingMode);
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

let front = false;
flipBtn.onclick = () => {
    front = !front;
    constraints.video.facingMode = front ? "user" : "environment";    
    // stopWebcam();
    startWebcam();
    console.log(constraints.video.facingMode)
};


// console.log(constraints)
// flipBtn.addEventListener("click", () => {
//     if (mode == "environment") {
//         mode = "user";       
//     } else {
//         mode = "environment";
//     }
//     console.log(constraints.video.facingMode.exact);

//     facingDirection();
// });









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



