/*
  Object oriented design is commonly used in video games.  For this part of the assignment you will be implementing several constructor functions with their correct inheritance heirarchy.

  In this file you will be creating three constructor functions: GameObject, CharacterStats, Humanoid.  

  At the bottom of this file are 3 objects that all end up inheriting from Humanoid.  Use the objects at the bottom of the page to test your constructor functions.
  
  Each constructor function has unique properites and methods that are defined in their block comments below:
*/
  
/*
  === GameObject ===
  * createdAt
  * dimensions
  * destroy() // prototype method -> returns the string: 'Object was removed from the game.'
*/

function GameObject (GameObj) {
  this.createdAt = GameObj.createdAt;
  this.dimensions = GameObj.dimensions;
};

GameObject.prototype.destroy = function() {
  return `${this.name} was removed from the game.`;
}

/*
  === CharacterStats ===
  * hp
  * name
  * takeDamage() // prototype method -> returns the string '<object name> took damage.'
  * should inherit destroy() from GameObject's prototype
*/

function CharacterStats (CharacterObj) {
  GameObject.call(this, CharacterObj);
  this.hp = CharacterObj.hp;
  this.name = CharacterObj.name;
};

CharacterStats.prototype = Object.create(GameObject.prototype);

CharacterStats.prototype.takeDamage = function() {
  return `${this.name} took damage.`;
};

/*
  === Humanoid ===
  * faction
  * weapons
  * language
  * greet() // prototype method -> returns the string '<object name> offers a greeting in <object language>.'
  * should inherit destroy() from GameObject through CharacterStats
  * should inherit takeDamage() from CharacterStats
*/
function Humanoid (HumanoidObj) {
  CharacterStats.call(this, HumanoidObj);
  this.faction = HumanoidObj.faction;
  this.weapons = HumanoidObj.weapons;
  this.language = HumanoidObj.language;
};

Humanoid.prototype = Object.create(CharacterStats.prototype);

Humanoid.prototype.greet = function() {
  return `${this.name} offers a greeting in ${this.language}`;
};

/*
  * Inheritance chain: GameObject -> CharacterStats -> Humanoid
  * Instances of Humanoid should have all of the same properties as CharacterStats and GameObject.
  * Instances of CharacterStats should have all of the same properties as GameObject.
*/

// Test you work by uncommenting these 3 objects and the list of console logs below:


  const mage = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 1,
      height: 1,
    },
    hp: 5,
    name: 'Bruce',
    faction: 'Mage Guild',
    weapons: [
      'Staff of Shamalama',
    ],
    language: 'Common Toungue',
  });

  const swordsman = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 2,
    },
    hp: 15,
    name: 'Sir Mustachio',
    faction: 'The Round Table',
    weapons: [
      'Giant Sword',
      'Shield',
    ],
    language: 'Common Toungue',
  });

  const archer = new Humanoid({
    createdAt: new Date(),
    dimensions: {
      length: 1,
      width: 2,
      height: 4,
    },
    hp: 10,
    name: 'Lilith',
    faction: 'Forest Kingdom',
    weapons: [
      'Bow',
      'Dagger',
    ],
    language: 'Elvish',
  });

  console.log(mage.createdAt); // Today's date
  console.log(archer.dimensions); // { length: 1, width: 2, height: 4 }
  console.log(swordsman.hp); // 15
  console.log(mage.name); // Bruce
  console.log(swordsman.faction); // The Round Table
  console.log(mage.weapons); // Staff of Shamalama
  console.log(archer.language); // Elvish
  console.log(archer.greet()); // Lilith offers a greeting in Elvish.
  console.log(mage.takeDamage()); // Bruce took damage.
  console.log(swordsman.destroy()); // Sir Mustachio was removed from the game.

  // Stretch task: 
  // * Create Villian and Hero constructor functions that inherit from the Humanoid constructor function.  
  // * Give the Hero and Villians different methods that could be used to remove health points from objects which could result in destruction if health gets to 0 or drops below 0;
  // * Create two new objects, one a villian and one a hero and fight it out with methods!

  //created hero constructor
  function Hero (HeroObj) {
    Humanoid.call(this, HeroObj);
    this.attack = HeroObj.attack;
  }

  //attached hero prototype to humanoid prototype
  Hero.prototype = Object.create(Humanoid.prototype);

  //created light damage attack function on hero prototype
  Hero.prototype.lightAttack = function(enemy) {
    const lightDmg = Math.floor((Math.random() * this.attack)+ 1);
    if (this.hp === 0) {
      return `${this.name} has stopped breathing... ${enemy.name} cries out in hollow victory.`
    } else {
      if (enemy.hp === 0) {
        return `${enemy.name} is dead. The pool of blood around cold body creeps in size. Victory?`
      } else if (enemy.hp - lightDmg < 1) {
        enemy.hp = 0;
        return `${this.name} roars in victory. ${enemy.destroy()}`;
      } else {
        enemy.hp = enemy.hp - lightDmg;
        return `${this.name} deals ${lightDmg} damage! ${enemy.name} has ${enemy.hp} health left!`
      }
    }
  }

  //created hero constructor;
  function Villian (VillianObj) {
    Humanoid.call(this, VillianObj);
    this.attack = VillianObj.attack;
  }

  //attached villian prototype to humanoid prototype
  Villian.prototype = Object.create(Humanoid.prototype);

  //created light damage attack function on villian prototype
  Villian.prototype.lightAttack = function(enemy) {
    const lightDmg = Math.floor((Math.random() * this.attack)+ 1);
    if (this.hp === 0) {
      return `${this.name} has stopped breathing... Conflict resolution?`
    } else {
      if (enemy.hp === 0) {
        return `${enemy.name} has been killed. Who said the bad guys can't win?`
      } else if (enemy.hp - lightDmg < 1) {
        enemy.hp = 0;
        return `${this.name} shrieks in glee. ${enemy.destroy()}`;
      } else {
        enemy.hp = enemy.hp - lightDmg;
        return `${this.name} deals ${lightDmg} damage! ${enemy.name} has ${enemy.hp} health left!`
      }
    }
  }

  //created a new hero
  const Gin = new Hero({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 4,
      height: 2,
    },
    hp: 120,
    name: 'Gin',
    faction: 'Sylvarant',
    weapons: [
      'Sword',
      'Shield',
    ],
    language: 'English',
    attack: 20,
  });

  //created a new villian
  const Tonic = new Villian({
    createdAt: new Date(),
    dimensions: {
      length: 2,
      width: 2,
      height: 7,
    },
    hp: 100,
    name: 'Tonic',
    faction: 'Venus',
    weapons: [
      'Bowstaff',
      'Dagger',
    ],
    language: 'Latin',
    attack: 24,
  });

  console.log(Tonic.lightAttack(Gin));
  console.log(Gin.lightAttack(Tonic));
