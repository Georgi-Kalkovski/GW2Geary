import { Row, Col } from 'react-bootstrap';

import Power from './img/Power.png';
import Precision from './img/Precision.png';
import Toughness from './img/Toughness.png';
import Vitality from './img/Vitality.png';
import Boon_Duration from './img/Boon_Duration.png';
import Condition_Damage from './img/Condition_Damage.png';
import Condition_Duration from './img/Condition_Duration.png';
import Ferocity from './img/Ferocity.png';
import Healing_Power from './img/Healing_Power.png';
import Armor from './img/Armor.png';
import Critical_Chance from './img/Critical_Chance.png';
import Critical_Damage from './img/Critical_Damage.png';
import Health from './img/Health.png';
import Agony_Resistance from './img/Agony_Resistance.png';

//import { parseCharacter } from 'gw2e-item-attributes'

function Attributes({ items }) {
    let power = 1000;
    let precision = 1000;
    let toughness = 1000;
    let vitality = 1000;

    console.log(items)
    
    for (const item of items) {
        if (item.slot !== 'HelmAquatic' && item.slot !== 'WeaponAquaticA' && item.slot !== 'WeaponAquaticB') {

            // Getting attributes from items
            if (item.stats && item.stats.attributes) {
                const attributes = item.stats.attributes;
                for (const attribute in attributes) {
                    const value = attributes[attribute];
                    if (attribute === 'Power') { power += value }
                    if (attribute === 'Precision') { precision += value }
                    if (attribute === 'Toughness') { toughness += value }
                    if (attribute === 'Vitality') { vitality += value }
                }
            }

            //Getting runes, sigils and infusions from items
            if (item.upgrades) {
                //console.log('upgrades', item.upgrades)

                // Runes
                console.log(item.runeCount)
                if (item.upgrades.details && item.upgrades.details.type === 'Rune') {
                    for (const rune of item.upgrades.details.bonuses) {
                        console.log('rune',rune)
                    }
                }
            }
            // TODO: {name: 'Superior Rune of the Thief', type: 'Rune', bonuses: Array(6), count: 5}
        }
    }

    // Calculate critical chance based on precision
    //at lvl 80 
    // https://wiki.guildwars2.com/wiki/Precision
    let criticalChance = (precision - 1000) / 21;
    if (criticalChance < 5) {
        criticalChance = 5;
    } else if (criticalChance > 100) {
        criticalChance = 100;
    }

    return (<>
        <Row className='custom-row'>
            <Col><img src={Power} alt="Power" /> {power}</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Toughness} alt="Toughness" /> {toughness}</Col>
            <Col><img src={Armor} alt="Armor" /> Armor</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Vitality} alt="Vitality" /> {vitality}</Col>
            <Col><img src={Health} alt="Health" /> Health</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Precision} alt="Precision" /> {precision}</Col>
            <Col><img src={Critical_Chance} alt="Critical_Chance" /> {criticalChance.toFixed(2)}</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Ferocity} alt="Ferocity" /> Ferocity</Col>
            <Col><img src={Critical_Damage} alt="Critical_Damage" /> Critical_Damage</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Condition_Damage} alt="Condition_Damage" /> Condition_Damage</Col>
            <Col><img src={Healing_Power} alt="Healing_Power" /> Healing_Power</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Condition_Duration} alt="Condition_Duration" /> Condi_Duration</Col>
            <Col><img src={Condition_Duration} alt="Condition_Duration" /> Condi_Duration</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Boon_Duration} alt="Boon_Duration" /> Boon_Duration</Col>
            <Col><img src={Boon_Duration} alt="Boon_Duration" /> Boon_Duration</Col>
        </Row>
        <Row className='custom-row'>
            <Col><img src={Agony_Resistance} alt="Agony_Resistance" /> Agony_Resistance</Col>
        </Row>


    </>);
}
export default Attributes