const selectCharacter = document.querySelector(".character");
const startBtn = document.querySelector(".start-btn");
const attackBtn = document.querySelector(".attack-button");

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
    this.attacks = [{ punch: 10 }, { slash: 15 }, { magic: 10 }];
  }
}

class Titan extends Hero {
  constructor() {
    super();
    this.name = "Titan";
    this.attacks = [{ punch: 20 }, { slash: 10 }, { magic: 5 }];
  }
}

class Warlock extends Hero {
  constructor() {
    super();
    this.name = "Warlock";
    this.attacks = [{ punch: 10 }, { slash: 5 }, { magic: 20 }];
  }
}

class Fallen extends Villain {
  constructor() {
    super();
    this.name = "Fallen";
    this.attacks = [{ bite: 10 }, { grab: 5 }, { shoot: 20 }];
  }
}
class Overlord extends Villain {
  constructor() {
    super();
    this.name = "Overlord";
    this.attacks = [{ bite: 5 }, { grab: 20 }, { shoot: 10 }];
  }
}
class Skinner extends Villain {
  constructor() {
    super();
    this.name = "Skinner";
    this.attacks = [{ bite: 20 }, { grab: 10 }, { shoot: 5 }];
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
}

const game = new Game();

startBtn.addEventListener("click", () => {
  game.getActiveHero();
  game.getActiveVillain();
});

attackBtn.addEventListener("click", () => {
  
}