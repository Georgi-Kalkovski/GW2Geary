import React from 'react';
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

function Attributes({ items, prof, build, relic, powerCore }) {
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

    // Adding vitality from Power Core
    const powerCoreNum = powerCore?.description?.toString().match(/\d+/)
    if (powerCoreNum) {
        const firstNumbers = parseInt(powerCoreNum[0], 10);
        vitality += firstNumbers;
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
            case 'AgonyResistance': agonyResistance += number; break;
        }
    }

    // Traits logic

    /*
    const oneHandWeapons = ['axe', 'dagger', 'mace', 'pistol', 'sword', 'scepter', 'focus', 'shield', 'torch', 'warhorn'];
    const twoHandWeapons = ['greatsword', 'hammer', 'longbow', 'rifle', 'short bow', 'staff']
    for (const specs of build) {
        const mins = specs.traits.min;
        const majs = specs.traits.maj.filter(maj => specs.activeTraits.includes(maj.id));
        const specsArr = mins.concat(majs);
        let weapon1 = items.find(i => i.slot === 'WeaponA1')?.details.type.toLowerCase();
        let weapon2 = items.find(i => i.slot === 'WeaponA2')?.details.type.toLowerCase();
        console.log('wep1', weapon1)
        console.log('wep2', weapon2)
        for (const spec of specsArr) {
            if (spec && spec.facts && spec.facts[0]) {
                const fact = spec.facts[0];
                if (fact.target && fact.value) {
                    const target = fact.target;
                    const value = fact.value;
                    const description = spec.description;
                    const wieldingRegex = /wielding a (\w+)?/i;
                    const wieldingMatch = description?.match(wieldingRegex);
                    if (wieldingMatch) {
                        const wordAfterWielding = wieldingMatch[1];
                        if (wordAfterWielding === 'one-handed') {
                            if (oneHandWeapons.includes(weapon1) || oneHandWeapons.includes(weapon2)) {
                                applyAttributeNoSpacing(target, value);
                            }
                        } else if (wordAfterWielding === 'two-handed') {
                            if (twoHandWeapons.includes(weapon1) || twoHandWeapons.includes(weapon2)) {
                                applyAttributeNoSpacing(target, value);
                            }
                        } else {

                        }

                        console.log("Word after 'wielding a':", wordAfterWielding);
                    } else {
                        applyAttributeNoSpacing(target, value);
                    }
                }
            }
        }
    } */

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
        <div className={`${prof.toLowerCase()}-lightning-border  attributes-unzoom`} style={{ borderWidth: '2px', paddingBottom: '5px', marginBottom: '10px', textAlign: 'center' }}>
            <Row style={{ borderWidth: '0 0 0px 0', padding: '5px 0 5px 0' }}>
                Attributes
            </Row>

            <Container className='attribute-container' style={{ fontSize: '14.5px', display: 'flex', padding: '5px 5% 0 5%' }}>
                <Col className="attribute-col-one" style={{ textAlign: "left" }}>
                    {attr.slice(0, 9).map((attribute, index) => (
                        <Row key={index}>
                            <AttributesBox attribute={attribute} />
                        </Row>
                    ))}

                </Col>
                <Col className="attribute-col-two" style={{ width: "100%", textAlign: "left" }}>
                    <br />
                    {attr.slice(9).map((attribute, index) => (
                        <Row key={index}>
                            <AttributesBox attribute={attribute} />
                        </Row>
                    ))}
                </Col>
            </Container>
            <span style={{ color: '#f16565', fontSize: '12px' }}>Traits & Skills not implemented!</span>
        </div>);
}
export default Attributes