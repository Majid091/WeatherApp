const {model, Schema} = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    username:
    {
        type: String,
        required: true
    },
    email:
    {
        type: String,
        required: true
    },
    password:
    {
        type: String,
        required: true
    },
    haveAsthma:
    {
        type: Boolean,
        required: true
    }
},
{
    timestamps: true
}
);


userSchema.pre('save', async function(next){
    if(!this.isModified('password'))
    {
        return next()
    }
    const salt = bcrypt.salt(10);
    this.password = bcrypt.hash(this.password, salt)
});

userSchema.methods.getSignedJwtToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET),
    {
        expiresIn: process.env.JWT_EXPIREIN
    }
    
};


userSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
};



const userModel = model('User', userSchema);
module.exports = userModel