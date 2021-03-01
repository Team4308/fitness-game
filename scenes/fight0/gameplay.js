const atkPushupBtn = document.getElementById("option_attack_p");
atkPushupBtn.onclick = () => {
    loadExercise("pushups");

    function postD(detects) {
        document.getElementById("bare").value = detects[1];
    }

    setPostDetect(postD);
};
const atkSquatBtn = document.getElementById("option_attack_s");
atkSquatBtn.onclick = () => {
    loadExercise("squats");

    function postD(detects) {
        document.getElementById("bare").value = detects[1];
    }

    setPostDetect(postD);
};
const healLegRaiseBtn = document.getElementById("option_heal_lr");
healLegRaiseBtn.onclick = () => {
    loadExercise("legraises");

    function postD(detects) {
        document.getElementById("barp").value = detects[1];
    }

    setPostDetect(postD);
};
const healKneeraiseBtn = document.getElementById("option_heal_kr");
healKneeraiseBtn.onclick = () => {
    loadExercise("kneeraise");

    function postD(detects) {
        document.getElementById("barp").value = detects[1];
    }

    setPostDetect(postD);
};