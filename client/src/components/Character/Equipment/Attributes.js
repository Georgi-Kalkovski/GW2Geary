import { Container, Row, Col } from 'react-bootstrap';

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

function Attributes({ items, upgrades }) {

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
    let critDamage = 0;
    let health = 0;
    let critChance = 0;
    let agonyResistance = 0;

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
    // Getting Runes from upgrades
    if (upgrades) {
        for (const upgrade of upgrades) {
            if (upgrade.type === 'Rune') {
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
    }
    return (
        <Container style={{ display: 'flex' }}>
            <Col>
                <Row title="Power" ><img src={Power} alt="Power" /> {power}</Row>
                <Row title="Toughness" ><img src={Toughness} alt="Toughness" /> {toughness}</Row>
                <Row title="Vitality" ><img src={Vitality} alt="Vitality" /> {vitality}</Row>
                <Row title="Precision"><img src={Precision} alt="Precision" /> {precision}</Row>
                <Row title="Ferocity" ><img src={Ferocity} alt="Ferocity" /> {ferocity}</Row>
                <Row title="Condition Damage" ><img src={CondiDamage} alt="CondiDamage" /> {condiDamage}</Row>
                <Row title="Expertise"><img src={CondiDuration} alt="Expertise" /> {expertise}</Row>
                <Row title="Concentration" ><img src={BoonDuration} alt="Concentration" /> {concentration}</Row>
                <Row title="Agony Resistance"><img src={AgonyResistance} alt="Agony_Resistance" /> {agonyResistance}</Row>
            </Col>
            <Col>
                <br />
                <Row title="Armor"><img src={Armor} alt="Armor" /> {armor}</Row>
                <Row title="Health"><img src={Health} alt="Health" /> {health}</Row>
                <Row title="Critical Chance"><img src={CritChance} alt="CritChance" /> {critChance.toFixed(2)}</Row>
                <Row title="Critical Damage"><img src={CritDamage} alt="CritDamage" /> {critDamage}</Row>
                <Row title="Healing Power"><img src={HealingPower} alt="HealingPower" /> {healingPower}</Row>
                <Row title="Condition Duration"><img src={CondiDuration} alt="CondiDuration" /> {condiDuration}</Row>
                <Row title="Boon Duration"><img src={BoonDuration} alt="Boon_Duration" /> {boonDuration}</Row>
            </Col>
        </Container>);
}
export default Attributes