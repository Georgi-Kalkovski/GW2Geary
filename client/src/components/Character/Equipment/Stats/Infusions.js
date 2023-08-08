function Infusions({ infusions, emptyInfusions }) {

    return (<>
        <div className="itemstat">
            <span className="yellow-highlight">Infusions</span>:
        </div>
        {
            infusions &&
            infusions.map((infusion, index) => (
                <div key={index}>
                    {(() => {
                        if (infusion.attribute === 'CritDamage') { infusion.attribute = 'Ferocity' }
                        if (infusion.attribute === 'ConditionDamage') { infusion.attribute = 'Condition Damage' }
                        if (infusion.attribute === 'ConditionDuration') { infusion.attribute = 'Expertise' }
                        if (infusion.attribute === 'BoonDuration') { infusion.attribute = 'Concentration' }
                        if (infusion.attribute === 'AgonyResistance') { infusion.attribute = 'Agony Resistance' }
                    })()}
                    <span className="yellow-highlight itemtypes">{infusion.count}x</span>
                    <span className="itemname"> +{infusion.modifier} {infusion.attribute} </span>
                    <span className="off-text itemtypes">(+{infusion.count * infusion.modifier}) </span>
                    <span className="itemtypes">- {infusion.items.join(", ")}</span>
                </div>
            ))
        }
        {emptyInfusions && emptyInfusions.length !== 0 &&
            <div>
                <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing infusions </span>
                <span className="itemtypes">- {emptyInfusions.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
            </div>
        }
    </>)
}

export default Infusions;