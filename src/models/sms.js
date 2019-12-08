import mongoose from 'mongoose';

const smsSchema = new mongoose.Schema({
  message: String,
  status: String,
  sender: String,
  receiver: String,
});

const SMS = mongoose.model('sms', smsSchema);

export default SMS;
