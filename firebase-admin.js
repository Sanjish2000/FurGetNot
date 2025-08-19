// ✅ Firebase Admin ko import karo
import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  // ✅ Render / Production ke liye
  serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
} else {
  // ✅ Local development ke liye
  serviceAccount = require("./serviceAccount.json");
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
