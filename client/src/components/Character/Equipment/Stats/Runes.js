import React from "react";

function Runes({ upgrades, emptyRunes }) {
    return (<>
        < div className="itemstat" >
            <span className="yellow-highlight">Runes</span>:
        </div >
        <div>
            {upgrades &&
                upgrades.map((upgrade, index) => (
                    <React.Fragment key={index}>
                        {upgrade.type === "Rune" && (
                            <div key={index}>
                                <span className="itemname">{upgrade.items.length}x {upgrade.name} </span>
                                <span className="itemtypes">- {upgrade.items.map((x, i) => x.type).join(", ")}</span>
                            </div>
                        )}
                    </React.Fragment>
                ))
            }
            {emptyRunes && emptyRunes.length !== 0 &&
                <div>
                    <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing runes </span>
                    <span className="itemtypes">- {emptyRunes.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
                </div>
            }
        </div>
    </>)
}

export default Runes;