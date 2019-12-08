import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
});

const CONTACT = mongoose.model('contact', contactSchema);

export default CONTACT;
