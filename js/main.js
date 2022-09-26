(function(){
  'use strict';
  
  const selectCharacter = document.querySelector(".character");
  const startBtn = document.querySelector(".start-btn");
  const attackBtns = document.querySelectorAll(".actions");
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
    constructor(name, audio) {
      super();
      this.name = name;
      this.audio = audio;
      
      
    }
  }
  class Audio extends Hero {
    constructor({audio, sounds, name}={}){
      super({name});
      this.name = name;
      this.audio = "Audio";
      this.sounds= [
        {soundname: "audiosmack", src : "./audio/hit-sound-effect-12445.mp3"},
        {soundname: "audiopunch", src :"./audio/umph-47201.mp3" },
        {soundname: "audiowebshot", src : "./audio/splash-by-blaukreuz-6261.mp3"},
        {soundname: "audioslap", src :"./audio/slap-in-the-face-101869.mp3"},
        {soundname: "audiotickle", src: "audio/joker-laugh-2-98829.mp3"}
      ];
    }
  }
  
  class Villain extends Character {
    constructor(name) {
      super();
      this.name = name;
    }
  }
  
  class Superman extends Audio {
    constructor({attack, name}={}) {
      super({name});
      this.name = "Superman";
      this.attacks = [
        { attack: "punch", caption: "punch", value: 20 , sound: "audiopunch"},
        { attack: "spoonsmack", caption: "spoon smack", value: 15, sound: "audiosmack" },
        { attack: "slap", caption:"slap", value: 10, sound: "audioslap" },
        { attack: "webshot", caption:"web shot", value: 10, sound: "audiowebshot" },
        { attack: "tickle", caption: "tickle", value: 5 , sound:"audiotickle" },
      ];
    }
  }
  
  
  class Captaincrunch extends Audio {
    constructor({attack, name}={}) {
      super({name});
      this.name = "Captain Crunch";
      this.attacks = [
        { attack: "punch", caption: "punch", value: 5 , sound: "audiopunch"},
        { attack: "spoonsmack", caption: "spoon smack", value: 20, sound: "audiosmack" },
        { attack: "slap", caption:"slap", value: 15 , sound: "audioslap"},
        { attack: "webshot", caption:"web shot", value: 10 , sound: "audiowebshot"},
        { attack: "tickle", caption: "tickle", value: 10 , sound:"audiotickle" },
      ];
    }
  }
  
  class Elastigirl extends Audio {
    constructor({attack, name}={}) {
      super({name});
      this.name = "Elastigirl";
      this.attacks = [
        { attack: "punch", caption: "punch", value: 10 , sound: "audiopunch"},
        { attack: "spoonsmack", caption: "spoon smack", value: 5 , sound: "audiosmack"},
        { attack: "slap", caption:"slap", value: 20 , sound: "audioslap"},
        { attack: "webshot", caption:"web shot", value: 15, sound: "audiowebshot" },
        { attack: "tickle", caption: "tickle", value: 10 , sound:"audiotickle" },
      ];
    }
  }
  
  class Spiderman extends Audio {
    constructor({attack, name}={}) {
      super({name});
      this.name = "Spiderman";
      this.attacks = [
        { attack: "climp", caption: "climp", value: 10 , sound: "audiopunch"},
        { attack: "jump", caption: "jump", value: 10 , sound: "audiosmack"},
        { attack: "slid", caption:"slap", value: 5 , sound: "audioslap"},
        { attack: "webshot", caption:"web shot", value: 20, sound: "audiowebshot" },
        { attack: "swing", caption: "swing", value: 15 , sound:"audiotickle" },
      ];
    }
  }
  
  class Tarzan extends Audio {
    constructor({attack, name}={}) {
      super({name});
      this.name = "Tarzan";
      this.attacks = [
        { attack: "punch", caption: "punch", value: 15 , sound: "audiopunch"},
        { attack: "spoonsmack", caption: "spoon smack", value: 10, sound: "audiosmack"},
        { attack: "slap", caption:"slap", value: 10 , sound: "audioslap"},
        { attack: "webshot", caption:"web shot", value: 5, sound: "audiowebshot" },
        { attack: "tickle", caption: "tickle", value: 20, caption: "tickle", sound:"audiotickle" },
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
    
      
      console.log(document.getElementsByClassName('actions3') , 'This active ID');
        var list = document.getElementsByClassName('actions3');
        for (var k = list.length - 1; k >= 0; k--) {
          var item = list[k];
          item.parentNode.removeChild(item);
          //removeChild(li);
        }
      
      
        var source = document.getElementById("template").innerHTML;
        var template = Handlebars.compile(source);
        let context =   this.hero.attacks;
        console.log(this.hero.attacks);
        var html = template({context});
         console.log(html, 'HTML');
         document.querySelector('.actions').insertAdjacentHTML('afterbegin', html);
         console.log(document.getElementsByClassName('actions').length , 'This active actions');
         if(document.getElementsByClassName('actions').length >= 3){
         let toremove = document.getElementsByClassName('actions')[2];
         toremove.remove();
         console.log(document.getElementsById(audiofile) , 'This after actions');
      }
      
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
      let chosenAttack = this.hero.attacks.find(
        ({ attack }) => attack === `${btnValue}`
      );
      console.log(chosenAttack, "hero attack");
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
      var list = document.getElementsByClassName('actions3');
        for (var k = list.length - 1; k >= 0; k--) {
          var item = list[k];
          item.parentNode.removeChild(item);
        }
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
      console.log(e.target, "E-Target")
      let value = e.target.value;
      game.pairAttackValue(value);
      let sound = e.target.id;
      sound = Array.from(sound)
      sound= sound.slice(3);
      sound = sound.join("");
      console.log(value , "<=Value", "Sound=>", sound);
      playAudio(sound);
     
    });
  });
  
  function playAudio(audioFile) {
    let audio = document.getElementById(audioFile);
    console.log(audio, "this is initial audio");
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
      play();
      document.getElementById("audio").muted = false;
      document.getElementById("audio").currentTime = 0;
  
      selectCharacter.disabled = false;
      isOn = true;
      
      console.log('game on');
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
      console.log('game off');
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
  
  
  })();