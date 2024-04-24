import mongoose from "mongoose";

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
    fecha_reg: String,
});

const userModel = mongoose.model(collectionName, userSchema);

export default userModel ;
