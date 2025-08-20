import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // ✅ For Render/Production (stringified JSON env var)
  // Replace escaped newlines with actual newlines
  const firebaseConfig = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  serviceAccount = {
    ...firebaseConfig,
    private_key: firebaseConfig.private_key.replace(/\\n/g, '\n'),
  };
} else {
  // ✅ For Local development
  serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_LOCAL, "base64").toString("utf-8")
  );
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;