$(document).ready(function () {
    var playerTurn = true;
    var reps = 0;
    var playerHealth = document.getElementById("barp").value;
    var enemyHealth = document.getElementById("bare").value;
    var exercise = "";
    var damage = {
        "p": -5,
        "s": -2,
        "lr": 3,
        "kr": 2
    };

    start();

    // determines game start / end
    async function start() {
        while (playerHealth > 0 && enemyHealth > 0) {
            await gamePlay();
        }
        alert("Game Over");
    }

    // gameplay action
    async function gamePlay() {
        if (playerTurn) {
            await selectExer();
            await doExercise(exercise);
            if (reps * damage[exercise] > 0) { // if heal
                playerHealth = playerHealth + reps * damage[exercise];
                document.getElementById("barp").value = playerHealth;
                alert("You healed " + reps * damage[exercise] + " xp");
            } else { // if damage
                enemyHealth = enemyHealth + reps * damage[exercise];
                document.getElementById("bare").value = enemyHealth;
                alert("You did " + reps * damage[exercise] + " damage");
            }
            playerTurn = false;
            reps = 0;
            exercise = "";
            return new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            // random damage
            var temp = Math.floor((Math.random() * 20) + 5)
            playerHealth = playerHealth - temp;
            document.getElementById("barp").value = playerHealth;
            playerTurn = true;
            alert("Your enemy did " + temp + " damage");
            // enables all exercise options
            document.getElementById("option_attack_p").disabled = false;
            document.getElementById("option_attack_s").disabled = false;
            document.getElementById("option_heal_lr").disabled = false;
            document.getElementById("option_heal_kr").disabled = false;
            return new Promise(resolve => setTimeout(resolve, 1000)); // wait 1000ms
        }
    }

    function selectExer() { // selects exercise and disables other exercises
        return new Promise(function (resolve) {
            document.getElementById('option_attack_p').addEventListener('click', function (e) {
                exercise = "pushups";
                document.getElementById("option_attack_s").disabled = true;
                document.getElementById("option_heal_lr").disabled = true;
                document.getElementById("option_heal_kr").disabled = true;
                resolve(e);

            }, { once: true });
            document.getElementById('option_attack_s').addEventListener('click', function (e) {

                exercise = "squats";
                document.getElementById("option_attack_p").disabled = true;
                document.getElementById("option_heal_lr").disabled = true;
                document.getElementById("option_heal_kr").disabled = true;
                resolve(e);
            }, { once: true });
            document.getElementById('option_heal_lr').addEventListener('click', function (e) {

                exercise = "legraises";
                document.getElementById("option_attack_p").disabled = true;
                document.getElementById("option_attack_s").disabled = true;
                document.getElementById("option_heal_kr").disabled = true;
                resolve(e);
            }, { once: true });
            document.getElementById('option_heal_kr').addEventListener('click', function (e) {

                exercise = "kneeraises";
                document.getElementById("option_attack_p").disabled = true;
                document.getElementById("option_attack_s").disabled = true;
                document.getElementById("option_heal_lr").disabled = true;
                resolve(e);
            }, { once: true });
        });

    }

    function doExercise(exer) {
        timer(30);

        loadExercise(exer);
        
        return new Promise(resolve => {
            setPostDetect((detects) => {
                if (detects[1] >= 5) {
                    resolve();
                }
                reps = detects[1];
            });
            setTimeout(resolve, 30000);
        });
    }

    function timer(x) {
        if (x === -1) {
            return;
        }
        document.getElementById("timer").innerHTML = x;
        return setTimeout(() => { timer(--x) }, 1000)
    }
})


/*
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
*/