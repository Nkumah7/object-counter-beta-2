import { CLASSES } from './labels.js'

const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const flipBtn = document.getElementById('flip-btn');
const video = document.getElementById('video');


let model;

async function loadModel() {
    await tf.ready();
    const modelPath = 'https://tfhub.dev/tensorflow/tfjs-model/ssd_mobilenet_v2/1/default/1';

    return await tf.loadGraphModel(modelPath, { fromTFHub: true })
}

// Define video constraints
let constraints = {
    audio: false,
    video: { 
        width: { min: 1024, ideal: 1280, max: 1920 }, 
        height: { min: 576, ideal: 720, max: 1080 },  
        facingMode: "environment",  
    },
};


/* Camera Controls */

// Start Camera
const startWebcam = async () => { 
    /* Function to start webcam */ 
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia(constraints)

        if ('srcObject' in video) {
            video.srcObject = stream
        } else {
            video.src = window.URL.createObjectURL(stream)
        }
        return new Promise((resolve, _) => {
            video.onloadedmetadata = () => {
                // Prep Canvas
                const detection = document.getElementById('detection');
                const ctx = detection.getContext('2d');
                const imgWidth = video.clientWidth; // clientWidth instead of width
                const imgHeight = video.clientHeight;
                detection.width = imgWidth;
                detection.height = imgHeight;
                ctx.font = '16px sans-serif';
                ctx.textBaseline = 'top';

                resolve([ctx, imgHeight, imgWidth]);

                // console.log(ctx, imgHeight, imgWidth);
                // console.log(constraints.video.facingMode)
            }
        })
    } else {
        alert('No webcam')
    }
    // navigator.mediaDevices
    //     .getUserMedia(constraints)
    //     .then((stream) => {
    //         if ('srcObject' in video){
    //             video.srcObject = stream;
    //         } else {
    //             video.src = window.URL.createObjectURL(stream)
    //         }
    //         const detection = document.getElementById('detection');
    //         const ctx = detection.getContext('2d');
    //         const imgWidth = video.clientWidth;
    //         const imgHeight = video.clientHeight;
    //         detection.width = imgWidth;
    //         detection.height = imgHeight;
    //         ctx.font = '16px sans-serif';
    //         ctx.textBaseline = 'top';   
    //         const camDetails = [ctx, imgHeight, imgWidth]; 
    //         video.addEventListener('loadeddata', performDetections(model, video, camDetails))

    //         // video.onloadedmetadata = () => { 
    //         //     video.play();                                    
    //         //     video.addEventListener('loadeddata', performDetections(model, video, camDetails))
    //         //     // performDetections(model, video, camDetails);
                                   
    //         // }    
    //         // requestAnimationFrame(() => {
    //         //     performDetections(model, video, camDetails);
    //         // });    
    // })
    // .catch((err) => {
    //     console.error(`${err.name}: ${err.message}`)
    // });
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


// /* Camera Controls Prototype */
// function cameraControls () {
    // this.startCamera = () => {
    //     // Event Listener to start camera
    //     startBtn.addEventListener("click", () => {
    //           startWebcam(model);
            
    //         startBtn.setAttribute("disabled", ""); // Disable 'Start Camera' button
    //         stopBtn.removeAttribute("disabled"); // Enable 'Stop Camera' button
    //         flipBtn.removeAttribute("disabled"); // Enable 'Flip Camera' button
    //     });
    // },

    // this.stopCamera = () => {
    //     // Event listener to stop camera
    //     stopBtn.addEventListener("click", () => {
    //         // constraints.video.facingMode = "environment"; // Switch camera facing mode back to "environment"
    //         stopWebcam(); // Stop webcam

    //         startBtn.removeAttribute("disabled"); // Enable 'Start Camera' button
    //         stopBtn.setAttribute("disabled", ""); // Disable 'Stop Camera' button
    //         flipBtn.setAttribute("disabled", ""); // Disable 'Flip Camera' button
    //     }); 
    // },

//     // Event listener to flip camera
//     this.front = false
    // this.flipCamera = () => {
    //     flipBtn.onclick = () => {
    //         stopWebcam(); // Stop webcam before flipping camera facing mode
    
    //         this.front = !this.front; // Switch front boolean value
    //         constraints.video.facingMode = this.front ? "user" : "environment"; // Toggle camera facing mode
    
    //         startWebcam(model); // Start webcam after flipping camera facing mode
    //     };
//     }
// }

function cameraControls () {}

cameraControls.prototype.startCamera = () => {
    // Event Listener to start camera
    
    startBtn.addEventListener("click", async () => {
        
        // Prep Canvas
        // const detection = document.getElementById('detection');
        // const ctx = detection.getContext('2d');
        // const imgWidth = video.clientWidth;
        // const imgHeight = video.clientHeight;
        // detection.width = imgWidth;
        // detection.height = imgHeight;
        // ctx.font = '16px sans-serif';
        // ctx.textBaseline = 'top';   
        // const camDetails = [ctx, imgHeight, imgWidth]; 
        
        const camDetails = await startWebcam();
        performDetections(model, video, camDetails);
        startBtn.setAttribute("disabled", ""); // Disable 'Start Camera' button
        stopBtn.removeAttribute("disabled"); // Enable 'Stop Camera' button
        flipBtn.removeAttribute("disabled"); // Enable 'Flip Camera' button
    });
};

cameraControls.prototype.stopCamera = () => {
    // Event listener to stop camera
    stopBtn.addEventListener("click", () => {
        // constraints.video.facingMode = "environment"; // Switch camera facing mode back to "environment"
        stopWebcam(); // Stop webcam

        startBtn.removeAttribute("disabled"); // Enable 'Start Camera' button
        stopBtn.setAttribute("disabled", ""); // Disable 'Stop Camera' button
        flipBtn.setAttribute("disabled", ""); // Disable 'Flip Camera' button
    }); 
};

cameraControls.prototype.flipCamera = () => {
    
    let front = true;
    flipBtn.onclick = async () => {
        stopWebcam(); // Stop webcam before flipping camera facing mode

        front = !front; // Switch front boolean value
        constraints.video.facingMode = front ? "user" : "environment"; // Toggle camera facing mode
        console.log('flipped', constraints.video.facingMode)

        const camDetails = await startWebcam();
        performDetections(model, video, camDetails);
        console.log(camDetails)
    };
}

function enableCam() {
    if (!model){
        return;
    };
    console.log("Model Loaded")
    startBtn.removeAttribute("disabled");
}

async function doStuff() {
    
    try {
        model = await loadModel();
        enableCam();


        const webcamControls = new cameraControls();
        webcamControls.startCamera();
        webcamControls.stopCamera();
        webcamControls.flipCamera();

    } catch (e) {
        console.log(e)
    }
}

async function performDetections(model, videoRef, camDetails) {
    const [ctx, imgHeight, imgWidth] = camDetails;
    video.style.display = 'none';

    const myTensor = tf.browser.fromPixels(videoRef);

    // SSD Mobilenet single batch
    // The input is expanded in rank to be a batch of one with 
    // the shape [1, height, width, 3]
    const readyfied = tf.expandDims(myTensor, 0);
    const results = await model.executeAsync(readyfied);

    // Get a clean tensor of top indices
    const detectionThreshold = 0.4;
    const iouThreshold = 0.5;
    const maxBoxes = 20;
    const prominentDetection = tf.topk(results[0]);
    const justBoxes = results[1].squeeze();
    const justValues = prominentDetection.values.squeeze();

    // Move results back to JavaScript in parallel
    const [maxIndices, scores, boxes] = await Promise.all([
        prominentDetection.indices.data(),
        justValues.array(),
        justBoxes.array(),
    ]);

    // https://arxiv.org/pdf/1704.04503.pdf, use Async to keep visuals
    const nmsDetections = await tf.image.nonMaxSuppressionWithScoreAsync(
        justBoxes, // shape [numBoxes, 4]
        justValues, // shape [numBoxes]
        maxBoxes, // Stop making boxes when this number is hit
        iouThreshold, // Allowed overlap value 0 to 1
        detectionThreshold, // Minimum detection score allowed
        1 // 0 is a normal NMS, 1 is max Soft-NMS
    );

    // Create a normal JavaScript array from the indices of the resulting 
    // high-scoring boxes
    const chosen = await nmsDetections.selectedIndices.data();
    // Mega Clean
    tf.dispose([
        results[0],
        results[1],
        // model, don't clean this one up for loops
        nmsDetections.selectedIndices,
        nmsDetections.selectedScores,
        prominentDetection.indices,
        prominentDetection.values,
        myTensor,
        readyfied,
        justBoxes,
        justValues,
    ]);

    // Clear everything each round
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)

    let predsCount = {} // define data structure to store class count
    chosen.forEach((detection) => {
        ctx.strokeStyle = "#0F0";
        ctx.lineWidth = 4;

        // Draw under any existing content.
        // ctx.globalCompositeOperation = 'destination-over';

        // Get the highest-scoring index from a previous topk call
        const detectedIndex = maxIndices[detection]

        // The classes are imported as an array to match the given result indices
        const detectedClass = CLASSES[detectedIndex];

        const detectedScore = scores[detection];
        const dBox = boxes[detection];

        // Log what is being boxed in the canvas so you can verify the results
        // console.log(detectedClass, detectedScore)

        // Count each detectedClass
        if (detectedClass in predsCount) {
            predsCount[detectedClass]++;
        } else {
            predsCount[detectedClass] = 1;
        };        

        ctx.drawImage(videoRef, 0, 0, imgWidth, imgHeight);
        // No negative valies for start positions
        const startY = dBox[0] > 0 ? dBox[0] * imgHeight : 0;
        const startX = dBox[1] > 0 ? dBox[1] * imgWidth : 0;
        const height = (dBox[2] - dBox[0]) * imgHeight;
        const width = (dBox[3] - dBox[1]) * imgWidth;
        ctx.strokeRect(startX, startY, width, height);
        
        // Draw the label background

        // Draw over any existing content.
        // ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#0B0';
        // ctx.font = "16px sans-serif"; // Set the font and size to use on the labels
        ctx.textBaseline = "top"; // Set textBaseline as mentioned
        const textHeight = 16;
        const textPad = 4; // Add a little horizontal padding to be used in the fillRect render
        const label = `${detectedClass} ${Math.round(detectedScore * 100)}%`;
        const textWidth = ctx.measureText(label).width;
        // Draw the rectangle using the same startX and startY that were used to draw the bounding boxes
        ctx.fillRect(
            startX,
            startY,
            textWidth + textPad,
            textHeight + textPad
        )
        // Draw the text last to ensure it's on top
        ctx.fillStyle = '#000000'; // Change the fillStyle to be black for the text render
        ctx.fillText(label, startX, startY); // Draw the text;

        // console.log('Tensor Memory Status:', tf.memory().numTensors);        
    });

    // Loop through 'predsCount' data structure and log predicted classes 
    // and count
    for (const [predClass, count] of Object.entries(predsCount)) {
        console.log(predClass, count);        
    };

    // // Loop forever 
    window.requestAnimationFrame(() => {
        performDetections(model, videoRef, camDetails);
    });
};

doStuff();