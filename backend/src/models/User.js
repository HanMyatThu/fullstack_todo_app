import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error('passowrd cannot contain password');
      }
    },
  },
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
},{
    timestamps: true
});


//Generate Token when login
UserSchema.methods.generateAuthToken = async function() {
    const user = this;

    const token = jwt.sign({ _id : user._id.toString() }, process.env.JWT_KEY,{ expiresIn : '2 days'})

    user.tokens = user.tokens.concat({
        token
    })
    await user.save();

    return token
}


// object ko access ya dl
UserSchema.statics.findByCredentials = async(email,password)=>{
    const user = await User.findOne({ email });

    if(!user){
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {
        throw new Error('Different Credientials')
    }
    return user
}

// password ma pya chin lo
UserSchema.methods.toJSON =  function(){
    const user = this
    const userObj = user.toObject()

    delete userObj.password
    delete userObj.tokens
    return userObj

}

// use standard function hash the password before saving
UserSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified('password')) {
        user.password = await bcrypt.hash(user.password,8)
    }

    next();
})

const User = mongoose.model('users',UserSchema);

export default User;