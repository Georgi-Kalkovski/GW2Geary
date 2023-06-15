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

function Attributes({ items, prof, build }) {
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

    const uniqueRunes = [];

    function applyAttributeSpacing(attribute, number) {
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
            case 'Healing': healingPower += number; break;
            case 'Armor': armor += number; break;
            case 'Critical Damage': critDamage += number; break;
            case 'Health': health += number; break;
            case 'Critical Chance': critChance += number; break;
            case 'Agony Resistance': agonyResistance += number; break;
        }
    }

    function applyAttributeNoSpacing(attribute, number) {
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

    // Traits logic
    for (const specs of build) {
        const mins = specs.traits.min;
        const majs = specs.traits.maj.filter(maj => specs.activeTraits.includes(maj.id));
        const specsArr = mins.concat(majs);

        for (const spec of specsArr) {
            if (spec && spec.facts) {
                if (spec.facts[0].target && spec.facts[0].value) {
                    if (spec.facts[0].target) {
                        applyAttributeNoSpacing(spec.facts[0].target, spec.facts[0].value)
                    }
                }
            }
        }
    }

    // Looking items
    for (const item of items) {
        // Getting defense
        if (item.slot !== 'HelmAquatic') {
            if (item.details && item.details.defense) {
                defense += item.details.defense;
            }
        }

        if (item.slot !== 'HelmAquatic'
            && item.slot !== 'WeaponAquaticA'
            && item.slot !== 'WeaponAquaticB'
            && item.slot !== 'WeaponB1'
            && item.slot !== 'WeaponB2') {

            // Getting attributes from items
            let attributes;

            if (item.stats && item.stats.attributes) {
                attributes = item.stats.attributes;

            } else if (item.details && item.details.infix_upgrade && item.details.infix_upgrade.attributes) {
                const attr = item.details.infix_upgrade.attributes;
                attributes = attr.reduce((obj, item) => {
                    obj[item.attribute] = item.modifier;
                    return obj;
                }, {});
            }
            for (const attribute in attributes) {
                const number = attributes[attribute];
                applyAttributeNoSpacing(attribute, number);
            }

            // Looking upgrades
            if (item.upgrades) {
                for (const upgrade of item.upgrades) {
                    // Pulling unique runes
                    if (upgrade.details.type === 'Rune') {
                        const hasDuplicate = uniqueRunes.some(rune => rune.name === upgrade.name);
                        if (!hasDuplicate) {
                            uniqueRunes.push(upgrade);
                        }
                    }

                    // Getting attributes from sigils
                    if (upgrade.details.type === 'Sigil') {
                        const bonus = upgrade.details.infix_upgrade.buff.description;
                        let pattern = /^([-+])?(\d+)(?=%?)?\s?(%?)\s+(\S+(?:\s+\S+)?)/;
                        let match = bonus.match(pattern);

                        if (match) {
                            let number = parseInt(match[1] + match[2]);  // +65 or -65
                            let percentage = match[3] ? match[3] + '%' : '';  // '%' or ''
                            let attribute = match[4];   // 'Attribute'

                            applyAttributeSpacing(attribute, number);
                        }
                    }

                    // Getting attributes from infusions
                    if (upgrade.details.type === 'Default') {
                        const attr = upgrade.details.infix_upgrade.attributes;
                        attributes = attr.reduce((obj, item) => {
                            obj[item.attribute] = item.modifier;
                            return obj;
                        }, {});
                        for (const attribute in attributes) {
                            const number = attributes[attribute];
                            applyAttributeNoSpacing(attribute, number);
                        }
                    }
                }
            }
        }
    }

    // Getting attributes from unique runes
    for (const rune of uniqueRunes) {
        for (let i = 0; i < rune.counter; i++) {
            const r = rune.details.bonuses[i].split('; ')
            for (const bonus of r) {
                let pattern = /^([-+])?(\d+)(?=%?)?\s?(%?)\s+(\S+(?:\s+\S+)?)/;
                let match = bonus.match(pattern);

                if (match) {
                    let number = parseInt(match[1] + match[2]);  // +65 or -65
                    let percentage = match[3] ? match[3] + '%' : '';  // '%' or ''
                    let attribute = match[4];   // 'Attribute'

                    applyAttributeSpacing(attribute, number);
                }
            }
        }
    }

    armor = defense + toughness;
    health += vitality * 10;
    critChance += 5 + ((precision - 1000) / 21);
    critDamage += ferocity / 15;
    condiDuration += expertise / 15;
    boonDuration = concentration / 15 + boonDuration;

    const AttributesBox = ({ attribute }) => {
        return (
            <Container className="attributes-box-container">
                <AttributesTooltip name={attribute.name} icon={attribute.icon} value={attribute.value} />
            </Container>
        );
    };

    const attr = [
        { name: "Power", icon: Power, value: power.toLocaleString("en-US") },
        { name: "Toughness", icon: Toughness, value: toughness.toLocaleString("en-US") },
        { name: "Vitality", icon: Vitality, value: vitality.toLocaleString("en-US") },
        { name: "Precision", icon: Precision, value: precision.toLocaleString("en-US") },
        { name: "Ferocity", icon: Ferocity, value: ferocity.toLocaleString("en-US") },
        { name: "Condition Damage", icon: CondiDamage, value: condiDamage.toLocaleString("en-US") },
        { name: "Expertise", icon: CondiDuration, value: expertise.toLocaleString("en-US") },
        { name: "Concentration", icon: BoonDuration, value: concentration.toLocaleString("en-US") },
        { name: "Agony Resistance", icon: AgonyResistance, value: agonyResistance.toLocaleString("en-US") },
        { name: "Armor", icon: Armor, value: armor.toLocaleString("en-US") },
        { name: "Health", icon: Health, value: health.toLocaleString("en-US") },
        { name: "Critical Chance", icon: CritChance, value: critChance.toFixed(2) + "%" },
        { name: "Critical Damage", icon: CritDamage, value: critDamage.toFixed(1) + "%" },
        { name: "Healing Power", icon: HealingPower, value: healingPower.toLocaleString("en-US") },
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