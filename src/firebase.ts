import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCmLMbQrBGJq31aI9ZevRs7gQ6FQgv0W34",
  authDomain: "scratchjr-extension.firebaseapp.com",
  projectId: "scratchjr-extension",
  storageBucket: "scratchjr-extension.appspot.com",
  messagingSenderId: "223827656127",
  appId: "1:223827656127:web:daed6e608469261f57b50a"
};
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);



