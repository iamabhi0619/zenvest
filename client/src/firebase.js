
import { initializeApp } from "firebase/app";
import { getMessaging} from "firebase/messaging"

const firebaseConfig = {
  apiKey: "AIzaSyDCe7Zo1_BeZniNuwgdq0OYUMZfUIFe0fQ",
  authDomain: "zenvest-8f417.firebaseapp.com",
  projectId: "zenvest-8f417",
  storageBucket: "zenvest-8f417.appspot.com",
  messagingSenderId: "525863628284",
  appId: "1:525863628284:web:ebf19d1cd22c3baf659679"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app)

export default app

export {messaging}