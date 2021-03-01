// Knee raise detection

var first = true;
var nlegups = 0;
var currentleg;

export default function (landmarks) {
    var left = landmarks[25].y - landmarks[23].y;
    var right = landmarks[26].y - landmarks[24].y;

    if (left < 0.1 && first) {
        currentleg = "left";
        first = false;
    }

    if (right < 0.1 && first) {
        currentleg = "right";
        first = false;
    }

    if (left < 0.1 && currentleg == "right") {
        currentleg = "left";
    }

    if (right < 0.1 && currentleg == "left") {
        nlegups++;
        currentleg = "right";
    }

    return [1, nlegups];
}

export function reset() {
    first = true;
    nlegups = 0;
    currentleg = undefined;
}