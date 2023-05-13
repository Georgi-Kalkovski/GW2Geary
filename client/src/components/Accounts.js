import { useState, useEffect } from "react";
import fetchData from "./fetchData";
import './Classes.css'
function Accounts() {
    const [accounts, setAccounts] = useState([]);

    useEffect(() => {
        try {
            (async () => {
                setAccounts(await fetchData('accounts'));
            })();
        } catch (error) {
            console.error(error);
        }
    });

    return (
        <>
            {accounts && accounts.map(account => (
                <div key={account.name}>
                    <div>Name: {account.name}</div>
                    <div>Api Key: {account.id}</div>
                </div>
            ))
            }
            {console.log(accounts)}
        </>
    );
}

export default Accounts;