// /utils/firebaseAdmin.js
import admin from 'firebase-admin';

// Check if Firebase Admin has already been initialized to avoid initializing it multiple times.
if (!admin.apps.length) {
  const serviceAccount = JSON.parse(process.env.GOOGLE_FIREBASE_PRIVATE_KEY);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

export default admin;
