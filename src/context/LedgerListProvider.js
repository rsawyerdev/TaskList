import { createContext, useState } from 'react';

export const ledgerListContext = createContext();

const LedgerListProvider = (props) => {
    const [ledgerList, setLedgerList] = useState();

    return (
        <ledgerListContext.Provider value={[ledgerList, setLedgerList]}>
            {props.children}
        </ledgerListContext.Provider>
    );
};

export default LedgerListProvider;