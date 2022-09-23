const selectCharacter = document.querySelector(".character");
const startBtn = document.querySelector(".start-btn");
const attackBtns = document.querySelectorAll(".attack-button");
const villainHealth = document.querySelector(".villainPower");
const heroHealth = document.querySelector(".heroPower");
const heroText = document.querySelector(".hero-text");
const villainText = document.querySelector(".villain-text");
const actionText = document.querySelector(".action-text");

let gameOver = false;

attackBtns.forEach((attackBtn) => {
  attackBtn.disabled = true;
});

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
      { attack: "spoon-smack", value: 15 },
      { attack: "slap", value: 10 },
      { attack: "web-shot", value: 10 },
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
      { attack: "spoon-smack", value: 20 },
      { attack: "slap", value: 15 },
      { attack: "web-shot", value: 10 },
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
      { attack: "spoon-smack", value: 5 },
      { attack: "slap", value: 20 },
      { attack: "web-shot", value: 15 },
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
      { attack: "spoon-smack", value: 10 },
      { attack: "slap", value: 5 },
      { attack: "web-shot", value: 20 },
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
      { attack: "spoon-smack", value: 10 },
      { attack: "slap", value: 10 },
      { attack: "web-shot", value: 5 },
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
    } else if (characterOutput === "Captain Crunch") {
      this.hero = new Captaincrunch();
    } else if (characterOutput === "Elastigirl") {
      this.hero = new Elastigirl();
    } else if (characterOutput === "Spiderman") {
      this.hero = new Spiderman();
    } else if (characterOutput === "Tarzan") {
      this.hero = new Tarzan();
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
  }

  pairAttackValue(btnValue) {
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
    }, 3000);
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
}

const game = new Game();

startBtn.addEventListener("click", () => {
  gameOver = false;
  game.getActiveHero();
  game.getActiveVillain();
  game.displayPlayerNames();

  attackBtns.forEach((attackBtn) => {
    attackBtn.disabled = false;
  });
});

attackBtns.forEach((attackBtn) => {
  attackBtn.addEventListener("click", (e) => {
    let value = e.target.value;
    game.pairAttackValue(value);
  });
});

function Media({ myAudio } = {}) {
  this.myAudio = myAudio;
  console.log(myAudio);
}
