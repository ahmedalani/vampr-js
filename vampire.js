class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let creator = this.creator;
    let vampiresFromOriginal = 0;
    while (creator) {
      vampiresFromOriginal++;
      creator = creator.creator;
    }
    return vampiresFromOriginal;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    return this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {
    if (!this.creator) {
      return this;
    } else if (this.offspring.find(({ name }) => name === vampire.name)) {
      return this;
    } else if (vampire.offspring.find(({ name }) => name === this.name)) {
      return vampire;
    } else if (this.creator.name === vampire.creator.name) {
      if (this.name === vampire.name) {
        return this;
      }
      return this.creator;
    } else {
      let lessSenior = this;
      let creatorOfLessSenior = this.creator;
      let moreSenior = vampire;
      let creatorOfMoreSenior = vampire.creator;
      if (this.isMoreSeniorThan(vampire)) {
        lessSenior = vampire;
        creatorOfLessSenior = vampire.creator;
        moreSenior = this;
        creatorOfMoreSenior = this.creator;
      }
      while (creatorOfLessSenior) {
        if (creatorOfMoreSenior.name === creatorOfLessSenior.name) {
          return creatorOfMoreSenior;
        }
        if (!creatorOfLessSenior.creator) {
          return creatorOfLessSenior;
        }
        creatorOfLessSenior = creatorOfLessSenior.creator;
      }
    }
  }
}

module.exports = Vampire;

