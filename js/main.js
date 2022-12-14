const selectCharacter = document.querySelector(".character");
const startBtn = document.querySelector(".start-btn");
const attackBtns = document.querySelectorAll(".attack-button");
const villainHealth = document.querySelector(".villainPower");
const heroHealth = document.querySelector(".heroPower");
const heroText = document.querySelector(".hero-text");
const villainText = document.querySelector(".villain-text");
const actionText = document.querySelector(".action-text");
const audio = document.getElementById("audio");

let gameOver = false;

attackBtns.forEach((attackBtn) => {
  attackBtn.disabled = true;
});
startBtn.disabled = true;
selectCharacter.disabled = true;

class Character {
  constructor(name) {
    this.name = name;
    this.health = 100;
  }
}

class Hero extends Character {
  constructor(name) {
    super();
    this.name = name;
  }
}

class Villain extends Character {
  constructor(name) {
    super();
    this.name = name;
  }
}

class Superman extends Hero {
  constructor() {
    super();
    this.name = "Superman";
    this.attacks = [
      { attack: "punch", value: 20 },
      { attack: "spoon smack", value: 15 },
      { attack: "slap", value: 10 },
      { attack: "web shot", value: 10 },
      { attack: "tickle", value: 5 },
    ];
  }
}

class Captaincrunch extends Hero {
  constructor() {
    super();
    this.name = "Captain Crunch";
    this.attacks = [
      { attack: "punch", value: 5 },
      { attack: "spoon smack", value: 20 },
      { attack: "slap", value: 15 },
      { attack: "web shot", value: 10 },
      { attack: "tickle", value: 10 },
    ];
  }
}

class Elastigirl extends Hero {
  constructor() {
    super();
    this.name = "Elastigirl";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "spoon smack", value: 5 },
      { attack: "slap", value: 20 },
      { attack: "web shot", value: 15 },
      { attack: "tickle", value: 10 },
    ];
  }
}

class Spiderman extends Hero {
  constructor() {
    super();
    this.name = "Spiderman";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "spoon smack", value: 10 },
      { attack: "slap", value: 5 },
      { attack: "web shot", value: 20 },
      { attack: "tickle", value: 15 },
    ];
  }
}

class Tarzan extends Hero {
  constructor() {
    super();
    this.name = "Tarzan";
    this.attacks = [
      { attack: "punch", value: 15 },
      { attack: "spoon smack", value: 10 },
      { attack: "slap", value: 10 },
      { attack: "web shot", value: 5 },
      { attack: "tickle", value: 20 },
    ];
  }
}

class Darthvader extends Villain {
  constructor() {
    super();
    this.name = "Darth Vader";
    this.attacks = [
      { attack: "force choke", value: 15 },
      { attack: "laugh", value: 10 },
      { attack: "fire ball", value: 5 },
    ];
  }
}

class Thejoker extends Villain {
  constructor() {
    super();
    this.name = "The Joker";
    this.attacks = [
      { attack: "force choke", value: 5 },
      { attack: "laugh", value: 15 },
      { attack: "fire ball", value: 10 },
    ];
  }
}

class Bowser extends Villain {
  constructor() {
    super();
    this.name = "Bowser";
    this.attacks = [
      { attack: "force choke", value: 10 },
      { attack: "laugh", value: 5 },
      { attack: "fire ball", value: 15 },
    ];
  }
}

class Game {
  constructor() {
    this.hero = [];
    this.villain = [];
    // this.gameOver= false;
  }

  getActiveHero() {
    let characterOutput = selectCharacter.options[selectCharacter.selectedIndex].value;
    console.log(characterOutput);

    if (characterOutput === "Superman") {
      this.hero = new Superman();
      document.querySelector(".hero-img").src = "./images/superman.png";
    } else if (characterOutput === "Captain Crunch") {
      this.hero = new Captaincrunch();
      document.querySelector(".hero-img").src = "./images/captain-crunch.png";
    } else if (characterOutput === "Elastigirl") {
      this.hero = new Elastigirl();
      document.querySelector(".hero-img").src = "./images/elastigirl.png";
    } else if (characterOutput === "Spiderman") {
      this.hero = new Spiderman();
      document.querySelector(".hero-img").src = "./images/spiderman.png";
    } else if (characterOutput === "Tarzan") {
      this.hero = new Tarzan();
      document.querySelector(".hero-img").src = "./images/tarzan.png";
    }
    console.log(this.hero);
  }

  getActiveVillain() {
    const villainOptions = [new Darthvader(), new Thejoker(), new Bowser()];
    console.log(villainOptions);

    const random = Math.floor(Math.random() * villainOptions.length);
    console.log(random);
    this.villain = villainOptions[random];

    console.log(this.villain);
    if (this.villain.name === "Darth Vader") {
      document.querySelector(".villain-img").src = "./images/darth-vader.png";
    }
    if (this.villain.name === "The Joker") {
      document.querySelector(".villain-img").src = "./images/the-joker.png";
    }
    if (this.villain.name === "Bowser") {
      document.querySelector(".villain-img").src = "./images/bowser.png";
    }
  }

  pairAttackValue(btnValue) {
    attackBtns.forEach((attackBtn) => {
      attackBtn.disabled = true;
    });

    let chosenAttack = this.hero.attacks.find(({ attack }) => attack === `${btnValue}`);
    // console.log(chosenAttack.value, "hero attack");
    this.villain.health -= chosenAttack.value;
    // console.log(this.villain.health, "villain health");
    actionText.value = `${this.hero.name} uses ${chosenAttack.attack} and does ${chosenAttack.value} damage!`;

    if (this.villain.health <= 0 || gameOver) {
      gameOver = true;
    }
    game.checkGameOver();
    game.updateVillainHealth();

    setTimeout(() => {
      if (gameOver === true) {
        return;
      }

      const random = Math.floor(Math.random() * this.villain.attacks.length);
      let villainAttack = this.villain.attacks[random];
      let villainAttackValue = villainAttack.value;
      // console.log(villainAttackValue, "villain attack");
      this.hero.health -= villainAttackValue;
      // console.log(this.hero.health, "hero health");
      actionText.value = `${this.villain.name} uses ${villainAttack.attack} and does ${villainAttackValue} damage!`;

      if (this.hero.health <= 0 || gameOver) {
        gameOver = true;
      }
      game.checkGameOver();
      game.updateHeroHealth();

      setTimeout(() => {
        attackBtns.forEach((attackBtn) => {
          attackBtn.disabled = false;
        });
        actionText.value = "";
      }, 1500);
    }, 1500);
  }

  updateHeroHealth() {
    // heroHealth.innerHTML = this.hero.health;
    heroHealth.style.width = `${(this.hero.health / 100) * 250}px`;
  }

  updateVillainHealth() {
    // villainHealth.innerHTML = this.villain.health;
    villainHealth.style.width = `${(this.villain.health / 100) * 250}px`;
  }

  checkGameOver() {
    if (!gameOver) {
      return;
    } else if (this.hero.health <= 0) {
      this.hero.health = 0;
      actionText.value = `${this.villain.name} wins!`;

      attackBtns.forEach((attackBtn) => {
        attackBtn.disabled = true;
      });
    } else if (this.villain.health <= 0) {
      this.villain.health = 0;
      actionText.value = `${this.hero.name} wins!`;

      attackBtns.forEach((attackBtn) => {
        attackBtn.disabled = true;
      });
    }
  }

  displayPlayerNames() {
    heroText.value = `${this.hero.name}`;
    villainText.value = `${this.villain.name}`;
  }

  resetGame() {
    heroText.value = "";
    villainText.value = "";
    this.villain.health = 100;
    this.hero.health = 100;
    actionText.value = "";
  }
}

const game = new Game();

startBtn.addEventListener("click", () => {
  gameOver = false;
  game.resetGame();
  game.getActiveHero();
  game.getActiveVillain();
  game.displayPlayerNames();
  game.updateHeroHealth();
  game.updateVillainHealth();

  attackBtns.forEach((attackBtn) => {
    attackBtn.disabled = false;
  });
});

attackBtns.forEach((attackBtn) => {
  attackBtn.addEventListener("click", (e) => {
    let value = e.target.value;
    game.pairAttackValue(value);

    if (value === "punch") {
      playAudio("audio-punch");
    }
    if (value === "spoon smack") {
      playAudio("audio-smack");
    }
    if (value === "slap") {
      playAudio("audio-slap");
    }
    if (value === "web shot") {
      playAudio("audio-shot");
    }
    if (value === "tickle") {
      playAudio("audio-joker");
    }
  });
});

function playAudio(audioFile) {
  let audio = document.getElementById(audioFile);
  audio.play();
}
function play() {
  audio.play();
}

// music credits below

// <!-- Hostiles Inbound by Miguel Johnson | https://soundcloud.com/migueljohnsonmjmusic
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons CC BY 3.0
// https://creativecommons.org/licenses/by/3.0/ -->

let isOn = false;
const onBtn = document.querySelector("#on-button");
onBtn.addEventListener("click", () => {
  if (!isOn) {
    document.querySelector("#on-button").style.backgroundColor = "#91dc6f";
    document.querySelector("#on-button").style.borderColor = "#65994d";
    document.querySelector(".screen-img").src = "./images/stadium-2.jpg";
    document.querySelector(".hero-text").style.display = "block";
    document.querySelector(".vs-logo").style.display = "block";
    document.querySelector(".villain-text").style.display = "block";
    document.querySelector(".heroPower").style.display = "block";
    document.querySelector(".heroPower-shadow").style.display = "block";
    document.querySelector(".villainPower").style.display = "block";
    document.querySelector(".villainPower-shadow").style.display = "block";
    document.querySelector(".action-text").style.display = "block";
    document.querySelector(".players").style.display = "flex";
    document.querySelector(".hero-img").style.display = "block";
    document.querySelector(".villain-img").style.display = "block";
    document.querySelector(".hero-img").src = "";
    document.querySelector(".villain-img").src = "";
    play();
    document.getElementById("audio").muted = false;
    document.getElementById("audio").currentTime = 0;

    selectCharacter.disabled = false;
    isOn = true;
  } else if (isOn) {
    document.querySelector("#on-button").style.backgroundColor = "#e34e45";
    document.querySelector("#on-button").style.borderColor = "#a43832";
    document.querySelector(".screen-img").src = "./images/loading-scrn.png";
    document.querySelector(".hero-text").style.display = "none";
    document.querySelector(".vs-logo").style.display = "none";
    document.querySelector(".villain-text").style.display = "none";
    document.querySelector(".heroPower").style.display = "none";
    document.querySelector(".heroPower-shadow").style.display = "none";
    document.querySelector(".villainPower").style.display = "none";
    document.querySelector(".villainPower-shadow").style.display = "none";
    document.querySelector(".action-text").style.display = "none";
    document.querySelector(".players").style.display = "flex";
    document.querySelector(".hero-img").style.display = "none";
    document.querySelector(".villain-img").style.display = "none";
    document.getElementById("audio").muted = true;

    startBtn.disabled = true;
    selectCharacter.disabled = true;
    document.querySelector(".character").selectedIndex = 0;
    isOn = false;
    attackBtns.forEach((attackBtn) => {
      attackBtn.disabled = true;
    });
    game.resetGame();
  }
});

selectCharacter.addEventListener("change", (event) => {
  startBtn.disabled = false;
});

// music credits below

// <!-- Hostiles Inbound by Miguel Johnson | https://soundcloud.com/migueljohnsonmjmusic
// Music promoted by https://www.chosic.com/free-music/all/
// Creative Commons CC BY 3.0
// https://creativecommons.org/licenses/by/3.0/ -->
