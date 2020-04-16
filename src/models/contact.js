import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  phone: {
    type: String,
    unique: true,
    minlength: 1,
    maxlength: 11,
  },
});

const CONTACT = mongoose.model('contact', contactSchema);

export default CONTACT;
