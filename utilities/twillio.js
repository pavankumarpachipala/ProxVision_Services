const twilio = require('twilio');

const accountSid = 'AC8d6947c93f5edeb787e8ce7959332be7';
const authToken = 'b33dbbf6df259cc47e33bc13d71a4190';
const twilioPhoneNumber = '+12186703048';

const client = twilio(accountSid, authToken);

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.sendOTP = function (phoneNumber) {
    client.messages
    .create({
      body: `Your Proqmax Login OTP is: ${generateOTP()}`,
      from: twilioPhoneNumber,
      to: '+919642101102',
    })
    .then((message) => {
      console.log(`OTP sent successfully. Message SID: ${message.sid}`);
    })
    .catch((error) => {
      console.error('Error sending OTP:', error);
    });
  };
  
