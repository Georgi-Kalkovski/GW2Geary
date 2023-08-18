function Infusions({ infusions, emptyInfusions, enrichment }) {
    console.log(enrichment)
    return (<>
        {/* Infusions */}
        <div className="itemstat">
            <span className="yellow-highlight">Infusions</span>:
        </div>
        {
            infusions &&
            infusions.filter(infusion => infusion.type !== "Amulet").map((infusion, index) => (
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
        {/* Enrichment */}
        {enrichment?.details?.infix_upgrade?.buff?.description &&
            <div className="itemstat">
                <span className="yellow-highlight">Enrichment </span>:
                <span className="itemtypes itemname"> {enrichment.details?.infix_upgrade?.buff?.description}</span>
            </div>
        }
        {/* Missing Infusions */}
        {emptyInfusions && emptyInfusions.filter(infusion => infusion.type !== "Amulet").length !== 0 &&
            <div>
                <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing infusions </span>
                <span className="itemtypes">- {emptyInfusions.filter(infusion => infusion.type !== "Amulet").map(
                    (infusion, i) =>
                        infusion.amount > 0 ? `${infusion.amount}x ${infusion.type}` : infusion.type)
                    .join(", ")
                }</span>
            </div>
        }
        {/* Missing Enrichment */}
        {emptyInfusions && emptyInfusions.filter(infusion => infusion.type === "Amulet").length !== 0 &&
            <div>
                <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing enrichment </span>
                <span className="itemtypes">- {emptyInfusions.filter(infusion => infusion.type === "Amulet").map(
                    (infusion, i) => infusion.type)
                }</span>
            </div>
        }
    </>)
}

export default Infusions;