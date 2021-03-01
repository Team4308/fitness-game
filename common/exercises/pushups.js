// Pushup detection

var total_pushups = 0;
var npushups = 0;
var pushuphigh = false;

export default function (landmarks) {
    var nosepos = landmarks[0].y;
    var meanhpos = (landmarks[15].y + landmarks[16].y) / 2;
    var nosehanddist = meanhpos - nosepos;

    // High state
    if (nosehanddist > 0.5 && pushuphigh == false) {
        npushups++;
        pushuphigh = true;
        total_pushups = Math.floor(npushups / 2);
    }

    // Low state
    if (nosehanddist < 0.2 && pushuphigh == true) {
        npushups++;
        pushuphigh = false;
        total_pushups = Math.floor(npushups / 2);
    }

    return [1, total_pushups];
}

export function reset() {
    pushuphigh = false;
    total_pushups = 0;
    npushups = 0;
}