/**
 * User schema
 */
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { 
        type: String,
        require:true,
        trim: true, 
        unique: true
    },
    date: {
        type: Date,
        default: Date.now
    }

},
{
    timestamps: true
});

module.exports = model('UserModel', userSchema);

