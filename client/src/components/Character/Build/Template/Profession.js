const professionMap = {
  'Guardian': 1,
  'Warrior': 2,
  'Engineer': 3,
  'Ranger': 4,
  'Thief': 5,
  'Elementalist': 6,
  'Mesmer': 7,
  'Necromancer': 8,
  'Revenant': 9,
};

function Profession(input) {
  return professionMap[input] || 0;
}

export default Profession;