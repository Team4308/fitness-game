// Legraise detection

var leglow = true;
var nlegraises = 0

export default function (landmarks) {
    var rightx = landmarks[28].x - landmarks[24].x;
    var leftx = landmarks[27].x - landmarks[23].x;
    var distx = (rightx + leftx) / 2;

    var righty = landmarks[28].y - landmarks[24].y;
    var lefty = landmarks[27].y - landmarks[23].y;
    var disty = (righty + lefty) / 2;

    if (distx < 0.1 && leglow) {
        nlegraises++;
        leglow = false;
    }

    if (disty < 0.1 && !leglow) {
        leglow = true;
    }

    return [1, nlegraises];
}

