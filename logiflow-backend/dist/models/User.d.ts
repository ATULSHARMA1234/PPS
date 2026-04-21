import mongoose, { Document } from 'mongoose';
import { UserRole } from '../types';
interface IUserDocument extends Document {
    email: string;
    passwordHash: string;
    role: UserRole;
    firstName: string;
    lastName: string;
    phone: string;
    profile: {
        avatar?: string;
        department?: string;
        permissions: string[];
    };
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
export declare const User: mongoose.Model<IUserDocument, {}, {}, {}, mongoose.Document<unknown, {}, IUserDocument, {}, mongoose.DefaultSchemaOptions> & IUserDocument & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IUserDocument>;
export {};
//# sourceMappingURL=User.d.ts.map