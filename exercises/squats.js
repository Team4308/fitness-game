var high = true;
var nsquats = 0;
var height;

export default function (landmarks) {
    var right = landmarks[0].x - landmarks[28].x;
    var left = landmarks[0].x - landmarks[27].x;
    var dist = (right + left) / 2;

    if (dist < 0.1 && leglow) {
        nlegraises++;
        leglow = false;
    }

    if (disty < 0.1 && !leglow) {
        nlegraises++;
        leglow = true;
    }
    return (1, Math.floor(nlegraises / 2);
}

