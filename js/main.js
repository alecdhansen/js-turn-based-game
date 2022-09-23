const selectCharacter = document.querySelector(".character");
const startBtn = document.querySelector(".start-btn");
const attackBtns = document.querySelectorAll(".attack-button");
let gameOver= false;

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

class Hunter extends Hero {
  constructor() {
    super();
    this.name = "Hunter";
    this.attacks = [
      { attack: "punch", value: 5 },
      { attack: "kick", value: 20 },
      { attack: "slash", value: 10 },
      { attack: "magic", value: 10 },
      { attack: "insult", value: 15 },
    ];
  }
}

class Titan extends Hero {
  constructor() {
    super();
    this.name = "Titan";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "kick", value: 10 },
      { attack: "slash", value: 15 },
      { attack: "magic", value: 5 },
      { attack: "insult", value: 20 },
    ];
  }
}

class Warlock extends Hero {
  constructor() {
    super();
    this.name = "Warlock";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "kick", value: 15 },
      { attack: "slash", value: 20 },
      { attack: "magic", value: 10 },
      { attack: "insult", value: 5 },
    ];
  }
}

class Wizard extends Hero {
  constructor() {
    super();
    this.name = "Warlock";
    this.attacks = [
      { attack: "punch", value: 15 },
      { attack: "kick", value: 10 },
      { attack: "slash", value: 5 },
      { attack: "magic", value: 10 },
      { attack: "insult", value: 20 },
    ];
  }
}

class Knight extends Hero {
  constructor() {
    super();
    this.name = "Warlock";
    this.attacks = [
      { attack: "punch", value: 20 },
      { attack: "kick", value: 5 },
      { attack: "slash", value: 10 },
      { attack: "magic", value: 15 },
      { attack: "insult", value: 10 },
    ];
  }
}

class Fallen extends Villain {
  constructor() {
    super();
    this.name = "Fallen";
    this.attacks = [
      { attack: "punch", value: 5 },
      { attack: "slash", value: 15 },
      { attack: "magic", value: 10 },
    ];
  }
}

class Overlord extends Villain {
  constructor() {
    super();
    this.name = "Overlord";
    this.attacks = [
      { attack: "punch", value: 15 },
      { attack: "slash", value: 10 },
      { attack: "magic", value: 5 },
    ];
  }
}

class Skinner extends Villain {
  constructor() {
    super();
    this.name = "Skinner";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "slash", value: 5 },
      { attack: "magic", value: 15 },
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
    let characterOutput =
      selectCharacter.options[selectCharacter.selectedIndex].value;
    console.log(characterOutput);

    if (characterOutput === "Hunter") {
      this.hero = new Hunter();
    } else if (characterOutput === "Titan") {
      this.hero = new Titan();
    } else if (characterOutput === "Warlock") {
      this.hero = new Warlock();
    } else if (characterOutput === "Wizard") {
      this.hero = new Wizard();
    } else if (characterOutput === "Knight") {
      this.hero = new Knight();
    }
    console.log(this.hero);
  }

  getActiveVillain() {
    const villainOptions = [new Fallen(), new Overlord(), new Skinner()];
    console.log(villainOptions);

    const random = Math.floor(Math.random() * villainOptions.length);
    console.log(random);
    this.villain = villainOptions[random];

    console.log(this.villain);
  }

  pairAttackValue(btnValue) {
    let chosenAttack = this.hero.attacks.find(
      ({ attack }) => attack === `${btnValue}`
    );
    if( this.villain.health <= 0 || gameOver){
      gameOver = true;
      return;
    }
    console.log(chosenAttack.value, "hero attack");
    this.villain.health -= chosenAttack.value;
    document.querySelector(".villainPower").innerHTML = this.villain.health;
    console.log(this.villain.health, "villain health");
    if (this.villain.health <= 0) {
      this.gameOver = true;
    }

    setTimeout(() => {
      if( this.hero.health <= 0 || gameOver){
        gameOver = true;
        return
      }
      const random = Math.floor(Math.random() * this.villain.attacks.length);
      let villainAttackValue = this.villain.attacks[random].value;
      console.log(villainAttackValue, "villain attack");
      this.hero.health -= villainAttackValue;
      document.querySelector(".heroPower").innerHTML = this.hero.health;
      console.log(this.hero.health, "hero health");
      if (this.hero.health <= 0) {
        this.gameOver = true;
      }
      document.querySelector(".heroPower").innerHTML = this.villain.health;
      console.log(this.hero.health, "hero health");
    }, 1000);
  }
}

const game = new Game();

startBtn.addEventListener("click", () => {
  gameOver= false;
  game.getActiveHero();
  game.getActiveVillain();
});

attackBtns.forEach((attackBtn) => {
  attackBtn.addEventListener("click", (e) => {
    let value = e.target.value;
    game.pairAttackValue(value);
  });
});
