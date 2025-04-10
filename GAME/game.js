document.addEventListener("DOMContentLoaded", () => {
    let gameOver = false;
    let timer = 60;
    let timerInterval;

    function startGame() {
        console.log("🎮 Game started!");
        timer = 10;
        document.getElementById("timer").innerText = timer;
        document.getElementById("playerHealth").style.width = "100%";
        document.getElementById("enemyHealth").style.width = "100%";
        document.getElementById("endGameScreen").style.display = "none"; // Hide End Screen
        gameOver = false;

        timerInterval = setInterval(() => {
            if (timer > 0) {
                timer--;
                document.getElementById("timer").innerText = timer;
            } else {
                clearInterval(timerInterval);
                if (!gameOver) {
                    endGame("⏳ Time's Up!");
                }
            }
        }, 1000);
    }

    function endGame(winner) {
        console.log("🏆 Game Over! Winner:", winner);
        gameOver = true;
        clearInterval(timerInterval);

        const endGameScreen = document.getElementById("endGameScreen");
        const winnerText = document.getElementById("winnerText");
        const rematchButton = document.querySelector(".rematch-button");

        winnerText.innerText = winner;
        endGameScreen.style.display = "flex"; // Show end screen

        // Animate end game screen
        gsap.fromTo(
            endGameScreen,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.inOut" }
        );

        gsap.fromTo(
            winnerText,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "bounce.out", delay: 0.5 }
        );

        gsap.fromTo(
            rematchButton,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "back.out(1.7)", delay: 1 }
        );
    }

    function restartGame() {
        console.log("🔄 Restarting game...");

        gsap.to("#endGameScreen", {
            opacity: 0,
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                document.getElementById("endGameScreen").style.display = "none";
                startGame();
            }
        });
    }

    function reduceHealth(player) {
        if (!gameOver) {
            let healthBar = document.getElementById(player);
            let currentWidth = parseFloat(healthBar.style.width);
            let newWidth = Math.max(0, currentWidth - 1); //
            healthBar.style.width = newWidth + "%";
    
            if (newWidth <= 0) {
                endGame(player === "playerHealth" ? "👿 Enemy Wins!" : "🎉 Player Wins!");
            }
        }
    }
    

    document.querySelector(".rematch-button").addEventListener("click", restartGame);

    startGame();

    
});
