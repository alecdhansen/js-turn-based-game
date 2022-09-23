const selectCharacter = document.querySelector(".character");
const startBtn = document.querySelector(".start-btn");
const attackBtns = document.querySelectorAll(".attack-button");

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
      { attack: "punch", value: 10 },
      { attack: "slash", value: 15 },
      { attack: "magic", value: 10 },
    ];
  }
}

class Titan extends Hero {
  constructor() {
    super();
    this.name = "Titan";
    this.attacks = [
      { attack: "punch", value: 20 },
      { attack: "slash", value: 10 },
      { attack: "magic", value: 5 },
    ];
  }
}

class Warlock extends Hero {
  constructor() {
    super();
    this.name = "Warlock";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "slash", value: 5 },
      { attack: "magic", value: 20 },
    ];
  }
}

class Fallen extends Villain {
  constructor() {
    super();
    this.name = "Fallen";
    this.attacks = [
      { attack: "punch", value: 10 },
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
      { attack: "punch", value: 10 },
      { attack: "slash", value: 15 },
      { attack: "magic", value: 10 },
    ];
  }
}

class Skinner extends Villain {
  constructor() {
    super();
    this.name = "Skinner";
    this.attacks = [
      { attack: "punch", value: 10 },
      { attack: "slash", value: 15 },
      { attack: "magic", value: 10 },
    ];
  }
}

class Game {
  constructor() {
    this.hero = [];
    this.villain = [];
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
    console.log(chosenAttack.value, "hero attack");
    this.villain.health -= chosenAttack.value;
    console.log(this.villain.health, "villain health");

    setTimeout(() => {
      const random = Math.floor(Math.random() * this.villain.attacks.length);
      let villainAttackValue = this.villain.attacks[random].value;
      console.log(villainAttackValue, "villain attack");
      this.hero.health -= villainAttackValue;
      console.log(this.hero.health, "hero health");
    }, 5000);
  }
}

const game = new Game();

startBtn.addEventListener("click", () => {
  game.getActiveHero();
  game.getActiveVillain();
});

attackBtns.forEach((attackBtn) => {
  attackBtn.addEventListener("click", (e) => {
    let value = e.target.value;
    game.pairAttackValue(value);
  });
});
