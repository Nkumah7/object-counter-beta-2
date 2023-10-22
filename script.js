const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const flipBtn = document.getElementById('flip-btn');
const video = document.getElementById('video');

// Set a disabled attribute before starting camera
stopBtn.setAttribute("disabled", "");
flipBtn.setAttribute("disabled", "");

// Define video constraints
let constraints = {
    video: {
        facingMode: "environment", 
        width: { min: 1024, ideal: 1280, max: 1920 }, 
        height: { min: 576, ideal: 720, max: 1080 },        
    },
};


/* Camera Controls */

// Start Camera
const startWebcam = function () { 
    /* Function to start webcam */   
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

// Stop Camera
const stopWebcam = function () {
    /* Function to stop camera */
    const stream = video.srcObject;
    let tracks = stream.getTracks();
    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];
        track.stop();
    }
    video.srcObject = null;
};


/* Event Listeners */

// Event listener to start camera
startBtn.addEventListener("click", () => {
    startWebcam();  
    startBtn.setAttribute("disabled", ""); // Disable 'Start Camera' button
    stopBtn.removeAttribute("disabled"); // Enable 'Stop Camera' button
    flipBtn.removeAttribute("disabled"); // Enable 'Flip Camera' button
});

// Event listener to stop camera
stopBtn.addEventListener("click", () => {
        stopWebcam();
        startBtn.removeAttribute("disabled"); // Enable 'Start Camera' button
        stopBtn.setAttribute("disabled", ""); // Disable 'Stop Camera' button
        flipBtn.setAttribute("disabled", ""); // Disable 'Flip Camera' button
});

// Event listener to flip camera
let front = false;
flipBtn.onclick = () => {
    front = !front; // Switch front boolean value
    constraints.video.facingMode = front ? "user" : "environment"; // Toggle camera facing mode
    startWebcam(); // Start webcam after flipping camera facing mode
}; 