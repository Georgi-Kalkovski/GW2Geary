function Profession(input) {
    switch (input) {
      case 'Guardian': return 1;
      case 'Warrior': return 2;
      case 'Engineer': return 3;
      case 'Ranger': return 4;
      case 'Thief': return 5;
      case 'Elementalist': return 6;
      case 'Mesmer': return 7;
      case 'Necromancer': return 8;
      case 'Revenant': return 9;
      default: return 0;
    }
  }
  
  export default Profession;