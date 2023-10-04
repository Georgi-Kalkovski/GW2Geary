function Relic({ relic }) {
    return (<>
        <div className="itemstat">
            <span className="yellow-highlight">Relic</span>:
            {relic
                ? <span className="itemname"> {relic.name}</span>
                : <span span className="itemname" style={{ color: '#ff1e1e' }}> Missing relic</span>
            }
        </div>
    </>)
}

export default Relic;