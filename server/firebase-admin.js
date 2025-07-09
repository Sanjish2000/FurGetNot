// ✅ Firebase Admin ko import karo
import admin from "firebase-admin";

// ✅ Agar tu `.json` file import kar raha hai in ESM (like `type: module`),
// to `createRequire` use karo
import { createRequire } from "module";
const require = createRequire(import.meta.url);

// ✅ JSON config file ko require karo
const serviceAccount = require("./serviceAccount.json");

// ✅ Ab admin ka use karo (baad me karo, pehle define ho chuka hai upar)
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ✅ admin ko export karo taaki kisi aur file me use ho sake
export default admin;
