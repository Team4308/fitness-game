var high = true;
var nsquats = 0;
var height;
<<<<<<< Updated upstream
var first = true;
=======
var first;
>>>>>>> Stashed changes

export default function (landmarks) {
    var right = landmarks[0].y - landmarks[28].y;
    var left = landmarks[0].y - landmarks[27].y;
    var dist = (right + left) / 2;

<<<<<<< Updated upstream
    if(first){
        height = dist-0.05;
    }

    if (dist < 0.2 && high) {
        nsquats++;
        high = false;
=======
    

>>>>>>> Stashed changes
    }

    if (disty > height && !high) {
        high = true;
    }
    return [1, nsquats];
}

