first = true;
nlegups = 0;

export default function (landmarks) {
    left = landmarks[25].y - landmarks[23].y;
    right = landmarks[26].y - landmarks[24].y;

    if (left < 0.1 && first) {
        currentleg = "left";
        first = false;
    }

    if (right < 0.1 && first) {
        currentleg = "right";
        first - false;
    }

    if (left < 0.1 && currentleg == "right") {
        nlegups++;
        currentleg = "left";
    }

    if (right < 0.1 && currentleg == "left") {
        nlegups++;
        currentleg = "right";
    }

    return [1, nlegups];
}
