const videoElement = document.getElementsByClassName('input_video')[0];
const canvasElement = document.getElementsByClassName('output_canvas')[0];
const canvasCtx = canvasElement.getContext('2d');
const pushupCtr = document.getElementById('p_bar')
var initialising = 1
var npushups = 0;
var pushuphigh = false;
var nosepos;
var meanhpos;
var nosehandist;

function onResults(results) {
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(
        results.image, 0, 0, canvasElement.width, canvasElement.height);
    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS,
        {color: '#00FF00', lineWidth: 4});
    drawLandmarks(canvasCtx, results.poseLandmarks,
        {color: '#FF0000', lineWidth: 2});
    canvasCtx.restore();

    nosepos = results.poseLandmarks[0].y
    meanhpos = (results.poseLandmarks[15].y + results.poseLandmarks[16].y) / 2

    nosehandist = meanhpos - nosepos

    //console.log(nosehandist)

    if (nosehandist > 0.5 && pushuphigh == false) {
        npushups++;
        console.log(Math.floor(npushups/2));
        pushuphigh = true;
        pushupCtr.innerHTML = Math.floor(npushups/2)
    }

    if (nosehandist < 0.2 && pushuphigh == true) {
        npushups++;
        console.log(Math.floor(npushups/2));
        pushuphigh = false;
        pushupCtr.innerHTML = Math.floor(npushups/2)
    }
}

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

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await pose.send({image: videoElement});
    },
    width: 1280,
    height: 720
});
camera.start();

