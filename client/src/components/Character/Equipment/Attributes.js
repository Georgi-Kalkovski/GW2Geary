import { Container, Row, Col } from 'react-bootstrap';
import AttributesTooltip from './AttributesTooltip';

import Power from './img/Power.png';
import Precision from './img/Precision.png';
import Toughness from './img/Toughness.png';
import Vitality from './img/Vitality.png';
import BoonDuration from './img/Boon_Duration.png';
import CondiDamage from './img/Condition_Damage.png';
import CondiDuration from './img/Condition_Duration.png';
import Ferocity from './img/Ferocity.png';
import HealingPower from './img/Healing_Power.png';
import Armor from './img/Armor.png';
import CritChance from './img/Critical_Chance.png';
import CritDamage from './img/Critical_Damage.png';
import Health from './img/Health.png';
import AgonyResistance from './img/Agony_Resistance.png';

function Attributes({ items, lvl, prof }) {

    let power = 1000;
    let precision = 1000;
    let toughness = 1000;
    let vitality = 1000;
    let boonDuration = 0;
    let condiDamage = 0;
    let concentration = 0;
    let expertise = 0;
    let condiDuration = 0;
    let ferocity = 0;
    let healingPower = 0;
    let armor = 0;
    let critDamage = 150;
    let health = 0;
    let critChance = 0;
    let agonyResistance = 0;

    let defense = 0;

    if (prof === 'Warrior' || prof === 'Necromancer') {
        health += 9212
    } else if (prof === 'Revenant' || prof === 'Engineer' || prof === 'Ranger' || prof === 'Mesmer') {
        health += 5922
    } else if (prof === 'Guardian' || prof === 'Thief' || prof === 'Elementalist') {
        health += 1645
    }


    // Getting defense
    for (const item of items) {
        if (item.slot !== 'HelmAquatic') {
            if (item.details && item.details.defense) {
                defense += item.details.defense;
            }
        }
    }

    for (const item of items) {
        if (item.slot !== 'HelmAquatic' && item.slot !== 'WeaponAquaticA' && item.slot !== 'WeaponAquaticB') {


            // Getting attributes from items
            if (item.stats && item.stats.attributes) {

                const attributes = item.stats.attributes;

                for (const attribute in attributes) {

                    const number = attributes[attribute];
                    switch (attribute) {
                        case 'Power': power += number; break;
                        case 'Precision': precision += number; break;
                        case 'Toughness': toughness += number; break;
                        case 'Vitality': vitality += number; break;
                        case 'BoonDuration': concentration += number; break;
                        case 'ConditionDamage': condiDamage += number; break;
                        case 'Concentration': concentration += number; break;
                        case 'Expertise': expertise += number; break;
                        case 'ConditionDuration': expertise += number; break;
                        case 'Ferocity': ferocity += number; break;
                        case 'Healing': healingPower += number; break;
                        case 'Armor': armor += number; break;
                        case 'CritDamage': ferocity += number; break;
                        case 'Health': health += number; break;
                        case 'CritChance': critChance += number; break;
                        case 'Agony Resistance': agonyResistance += number; break;
                    }
                }
            }

            // Getting attributes from infusions
            if (item.upgrades) {
                for (const upgrade of item.upgrades) {
                    if (upgrade.details && upgrade.details.infix_upgrade && upgrade.details.infix_upgrade.attributes) {

                        const attributes = upgrade.details.infix_upgrade.attributes;

                        for (const attribute of attributes) {
                            switch (attribute.attribute) {
                                case 'Power': power += attribute.modifier; break;
                                case 'Precision': precision += attribute.modifier; break;
                                case 'Toughness': toughness += attribute.modifier; break;
                                case 'Vitality': vitality += attribute.modifier; break;
                                case 'BoonDuration': boonDuration += attribute.modifier; break;
                                case 'ConditionDamage': condiDamage += attribute.modifier; break;
                                case 'Concentration': concentration += attribute.modifier; break;
                                case 'Expertise': expertise += attribute.modifier; break;
                                case 'ConditionDuration': condiDuration += attribute.modifier; break;
                                case 'Ferocity': ferocity += attribute.modifier; break;
                                case 'HealingPower': healingPower += attribute.modifier; break;
                                case 'Armor': armor += attribute.modifier; break;
                                case 'CriticalDamage': critDamage += attribute.modifier; break;
                                case 'Health': health += attribute.modifier; break;
                                case 'CriticalChance': critChance += attribute.modifier; break;
                                case 'AgonyResistance': agonyResistance += attribute.modifier; break;
                            }
                        }

                    }
                }
            }
        }
    }

    // Getting runes from upgrades
    if (items.upgrades) {
        for (const upgrade of items.upgrades) {
            for (let i = 0; i < upgrade.bonuses.length; i++) {
                if (i <= upgrade.count) {
                    const rune = upgrade.bonuses[i].split('; ')
                    for (const bonus of rune) {

                        // Define the regular expression pattern to match the string
                        let pattern = /^([-+])?(\d+)(?=%?)?\s?(%?)\s+(\S+(?:\s+\S+)?)/;

                        // Match the pattern against the input string
                        let match = bonus.match(pattern);

                        // Extract the variables from the match object
                        if (match) {
                            let number = parseInt(match[1] + match[2]);  // +65 or -65
                            let percentage = match[3] ? match[3] + '%' : '';  // '%' or ''
                            let attribute = match[4];   // 'Attribute'

                            switch (attribute) {
                                case 'Power': power += number; break;
                                case 'Precision': precision += number; break;
                                case 'Toughness': toughness += number; break;
                                case 'Vitality': vitality += number; break;
                                case 'Boon Duration': boonDuration += number; break;
                                case 'Condition Damage': condiDamage += number; break;
                                case 'Concentration': concentration += number; break;
                                case 'Expertise': expertise += number; break;
                                case 'Condition Duration': condiDuration += number; break;
                                case 'Ferocity': ferocity += number; break;
                                case 'Healing Power': healingPower += number; break;
                                case 'Armor': armor += number; break;
                                case 'Critical Damage': critDamage += number; break;
                                case 'Health': health += number; break;
                                case 'Critical Chance': critChance += number; break;
                                case 'Agony Resistance': agonyResistance += number; break;
                            }
                        }
                    }
                }
            }
        }
    }

    armor = defense + toughness;
    health += vitality * 10;
    critChance += 5 + ((precision - 1000) / 21);
    critDamage += ferocity / 15;
    boonDuration = concentration / 15;

    const AttributesBox = ({ attribute }) => {
        return (
            <Container className="attributes-box-container">
                <AttributesTooltip name={attribute.name} icon={attribute.icon} value={attribute.value} />
            </Container>
        );
    };

    const attr = [
        { name: "Power", icon: Power, value: power.toLocaleString("en-US")  },
        { name: "Toughness", icon: Toughness, value: toughness.toLocaleString("en-US")  },
        { name: "Vitality", icon: Vitality, value: vitality.toLocaleString("en-US")  },
        { name: "Precision", icon: Precision, value: precision.toLocaleString("en-US")  },
        { name: "Ferocity", icon: Ferocity, value: ferocity.toLocaleString("en-US")  },
        { name: "Condition Damage", icon: CondiDamage, value: condiDamage.toLocaleString("en-US") },
        { name: "Expertise", icon: CondiDuration, value: expertise.toLocaleString("en-US") },
        { name: "Concentration", icon: BoonDuration, value: concentration.toLocaleString("en-US")  },
        { name: "Agony Resistance", icon: AgonyResistance, value: agonyResistance.toLocaleString("en-US") },
        { name: "Armor", icon: Armor, value: armor.toLocaleString("en-US") },
        { name: "Health", icon: Health, value: health.toLocaleString("en-US") },
        { name: "Critical Chance", icon: CritChance, value: critChance.toFixed(2) + "%" },
        { name: "Critical Damage", icon: CritDamage, value: critDamage.toFixed(2) + "%" },
        { name: "Healing Power", icon: HealingPower, value: healingPower.toLocaleString("en-US")  },
        { name: "Condition Duration", icon: CondiDuration, value: condiDuration.toFixed(2) + "%" },
        { name: "Boon Duration", icon: BoonDuration, value: boonDuration.toFixed(2) + "%" }
    ];

    return (
        <Container className='attribute-container' style={{ display: 'flex', paddingLeft: '10%' }}>
            <Col className="attribute-col-one" style={{ width: "50%", textAlign: "left" }}>
                {attr.slice(0, 9).map((attribute, index) => (
                    <Row key={index}>
                        <AttributesBox attribute={attribute} />
                    </Row>
                ))}

            </Col>
            <Col className="attribute-col-two" style={{ width: "50%", textAlign: "left" }}>
                <br />
                {attr.slice(9).map((attribute, index) => (
                    <Row key={index}>
                        <AttributesBox attribute={attribute} />
                    </Row>
                ))}
            </Col>
        </Container>);
}
export default Attributes