import { createContext, useState, useContext, ReactNode } from "react";

interface FinancialRecord {
    id: string;
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined);

export const FinancialRecordProvider = ({ children }: { children: ReactNode }) => {
    const [records, setRecords] = useState<FinancialRecord[]>([]);

    const addRecord = async (record: FinancialRecord) => {
    const response = await fetch ("http://localhost:3003/financial-records", {method:"POST",body: JSON.stringify(record),})
    
    try {
    if (response.ok){
    const newRecord = await response.json()
    setRecords((prev) => [...prev, newRecord])

    };
    } catch (err) {}
   

    }



    const updateRecord = (id: string, newRecord: FinancialRecord) => {
        setRecords(records.map(record => (record.id === id ? newRecord : record)));
    };

    const deleteRecord = (id: string) => {
        setRecords(records.filter(record => record.id !== id));
    };

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, updateRecord, deleteRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    );
};

export const useFinancialRecords = () => {
    const context = useContext(FinancialRecordsContext);
    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordProvider");
    }
    return context;
};