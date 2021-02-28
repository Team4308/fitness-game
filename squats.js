high = true;
nsqu = 0

export default function (landmarks) {
    rightx = landmarks[28].x - landmarks[24].x;
    leftx = landmarks[27].x - landmarks[23].x;
    distx = (right + left) / 2;

    righty = landmarks[28].y - landmarks[24].y;
    lefty = landmarks[27].y - landmarks[23].y;
    disty = (right + left) / 2;

    if (distx < 0.1 && leglow) {
        nlegraises++;
        leglow = false;
    }

    if (disty < 0.1 && !leglow) {
        nlegraises++;
        leglow = true;
    }
    return (1, Math.floor(nlegraises / 2);
}

