function Prefixes({ finishedItemstats, emptyPrefixes }) {
    return (
        <>
            {finishedItemstats && (
                <div>
                    <div>
                        <span className="yellow-highlight">Prefixes</span>:
                    </div>
                    {finishedItemstats.map((itemstat, index) => (
                        itemstat.name !== '' && (
                            <div key={itemstat.name + itemstat.id + index}>
                                <span className="itemname">
                                    {itemstat.items.length}x {itemstat.name.split("'")[0]}{' '}
                                </span>
                                <span className="itemtypes">
                                    - {itemstat.items.map((x, i) => x.type).join(', ')}
                                </span>
                            </div>
                        )
                    ))}
                    {emptyPrefixes && emptyPrefixes.length !== 0 && (
                        <div>
                            <span className="itemname" style={{ color: '#ff1e1e' }}>
                                Missing prefixes{' '}
                            </span>
                            <span className="itemtypes">- {emptyPrefixes}</span>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Prefixes;
