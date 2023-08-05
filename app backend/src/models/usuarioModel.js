import mongoose from 'mongoose';

const { Schema, model } = mongoose;
const userSchema =new Schema({

    
        name: {
          type: String,
          required: [true, "El campo name es obligatorio"],
        },
        email: {
          type: String,
          required: [true, "El campo email es obligatorio"],
          unique: true,
        },
    
        password: {
          type: String,
          required: [true, "El campo password es obligatorio"],
        },
      },
      { 
        timestamps: true 
     }
);

userSchema.methods.matchPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

export const userSchemaModel = model('user', userSchema);