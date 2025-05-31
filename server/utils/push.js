const webpush = require('web-push');

const VAPID_PUBLIC_KEY = 'BDZmAY9ftu4QbvQar--1IPhe6w2HbGumWg05wa2oQIFZAz_XmzLmraaB9xcCIcc2d1XVhcs0BK_0FohNFuPBQ8o';
const VAPID_PRIVATE_KEY = 'ucamUmZqs4twZk6LaB1IdKtbFuIiNpwNnT3Qd_nXJYU';

webpush.setVapidDetails(
  'mailto:your_gmail_address@gmail.com',
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const sendPushNotification = async (subscription, payload) => {
  try {
    await webpush.sendNotification(subscription, JSON.stringify(payload));
  } catch (error) {
    console.error('Push notification error:', error);
  }
};

module.exports = {
  sendPushNotification,
  VAPID_PUBLIC_KEY
}; 