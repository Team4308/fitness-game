$(document).ready(function () {
    var playerTurn = true;
    var playerHealth = 100;
    var enemyHealth = 100;
    var exercise = "";
    var timerStatus = false;
    var damage = {
        "pushups": -5,
        "squats": -2,
        "legraises": 3,
        "kneeraises": 2
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
            var reps = 0;
            await doExercise(exercise).then((value) => reps = value);
            if (reps * damage[exercise] > 0) { // if heal
                playerHealth = playerHealth + reps * damage[exercise];
                document.getElementById("barp").value = playerHealth;
                alert("You healed " + reps * damage[exercise] + " health");
            } else { // if damage
                enemyHealth = enemyHealth + reps * damage[exercise];
                document.getElementById("bare").value = enemyHealth;
                alert("You did " + reps * damage[exercise] + " damage");
            }
            playerTurn = false;
            exercise = "";
            return new Promise(resolve => setTimeout(resolve, 1000));
        } else {
            // random damage
            var temp = Math.floor((Math.random() * 40) + 5)
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
        timerStatus = true;
        timer(20);

        loadExercise(exer);

        return new Promise(resolve => {
            var reps = 0;
            setPostDetect((detects) => {
                reps = detects[1];
                document.getElementById("reps").innerHTML = reps;
                if (detects[1] >= 8) {
                    resetDetect();
                    timerStatus = false;
                    resolve(reps);
                }
            });
            setTimeout(() => {
                if (timerStatus) {
                    resetDetect();
                    timerStatus = false;
                    resolve(reps);
                }
            }, 20000);
        });
    }

    function timer(x) {
        if (x === 0) {
            return;
        }
        document.getElementById("timer").innerHTML = x;
        return setTimeout(() => { timer(--x) }, 1000);
    }
})