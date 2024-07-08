import mongoose from "mongoose";

interface financialRecord {
    userID: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

const financialRecordSchema = new mongoose.Schema<financialRecord>({
    userID: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    paymentMethod: { type: String, required: true },



})

const FinancialRecordModel= mongoose.model<financialRecord>('financialRecord', financialRecordSchema)

export default FinancialRecordModel;