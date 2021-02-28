// Main tracking file. Loads exersices dynamically

// Grab elements for use with mediapipe
const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');

// Detection Function. Changed Dynamically
var detectFn = (landmarks) => {
    return [0, 0];
};

function loadExercise(name) {
    detects = [0, 0];
    import("./exercises/" + name + ".js").then(obj => detectFn = obj.default).catch(err => console.error(err));
}

// Post Detect Callback
var postDetect = (detects) => { };

function setPostDetect(callback) {
    postDetect = callback;
}

// Resulting Detection
var detects = [0, 0];

function getDetects() {
    return detects;
}

function getDetectsAccuracy() {
    return detects[0];
}

function getDetectsCount() {
    return detects[1];
}

// Pose estimation callback
function onResults(results) {
    // Draw trackers onto canvas
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        { color: '#00FF00', lineWidth: 2 });
    canvasCtx.restore();

    detects = detectFn(results.poseLandmarks);
    postDetect(detects);
}

// Mediapipe pose estimation
const pose = new Pose({
    locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
    }
});

pose.setOptions({
    upperBodyOnly: false,
    smoothLandmarks: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5
});
pose.onResults(onResults);

// Start camera
const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({ image: videoElement });
    },
    width: 1280,
    height: 720
});
camera.start();