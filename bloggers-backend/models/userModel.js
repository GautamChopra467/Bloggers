const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const CONFIG = require("../utils/config");

const userRegisterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true 
    },
    password: {
        type: String,
        required: true,
        trim: true
    },

});

userRegisterSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})

userRegisterSchema.statics.login = async function(email,password){

    const user = await this.findOne({email})

    if(user){
        try{
            const auth = await bcrypt.compare(password,user.password)
            if(auth){
                return user;
            }else{
                return false;
            }
        }catch(err) {
            console.log(err);
        }
    }
    else{
       return false;
    }
}

const UserRegister = mongoose.model(CONFIG.USERREGISTER, userRegisterSchema);

module.exports = UserRegister;