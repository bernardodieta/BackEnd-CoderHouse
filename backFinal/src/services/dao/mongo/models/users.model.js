import mongoose, { Schema } from "mongoose";

const collectionName = 'users';

const stringTypeSchemaUniqueRequired = {
    type: String,
    unique: true,
    required: true
};

const stringTypeSchemaNonUniqueRequired = {
    type: String,
    required: true
};

const userSchema = new mongoose.Schema({
    first_name: stringTypeSchemaNonUniqueRequired,
    last_name: stringTypeSchemaNonUniqueRequired,
    age: Number,
    email: stringTypeSchemaUniqueRequired,
    password: stringTypeSchemaNonUniqueRequired,
    role: String,
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cart'
    },
    addresses: {
        addressId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'address',
        }
    },
    favProducts: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            }
        }
    ],
    questions: [{
        type: Schema.Types.ObjectId,
        ref: 'questionProducts'
    }],
    fecha_reg: String,
});

const userModel = mongoose.model(collectionName, userSchema);

export default userModel;
