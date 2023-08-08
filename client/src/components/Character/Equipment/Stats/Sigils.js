import React from "react";

function Sigils({ upgrades, emptySigils }) {
    return (<>
        <div className="itemstat">
            <span className="yellow-highlight">Sigils</span>:
        </div>
        {
            upgrades &&
            upgrades.map((upgrade, index) => (
                <div key={index}>
                    {upgrade.type == "Sigil" && (
                        <React.Fragment key={index}>
                            <span className="itemname">{upgrade.items.length}x {upgrade.name} </span>
                            <span className="itemtypes">- {upgrade.items.map((x, i) => x.type).join(", ")}</span>
                        </React.Fragment>
                    )}
                </div>
            ))
        }
        {emptySigils && emptySigils.length !== 0 &&
            <div>
                <span span className="itemname" style={{ color: '#ff1e1e' }}>Missing sigils </span>
                <span className="itemtypes">- {emptySigils.map((x, i) => x.amount > 1 ? `${x.amount}x ${x.type}` : x.type).join(", ")}</span>
            </div>
        }
    </>)
}

export default Sigils;