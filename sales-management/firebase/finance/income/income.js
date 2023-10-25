import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../../config/config";

const db = getFirestore(firebase_app);
const incomeRef = collection(db, "income");

export const addIncome = async (name, amount, description, category) => {
  try {
    await addDoc(incomeRef, { name, amount, description, category });
  } catch (error) {
    console.error(error);
  }
};

export const getIncome = async (setIncome) => {
  try {
    const unsub = onSnapshot(incomeRef, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setIncome(docs);
    });
  } catch (error) {
    console.error(error);
    setIncome([]);
  }
};

export const editIncome = async (id, incomeName, amount, description) => {
  try {
    await setDoc(doc(incomeRef, id), { name: incomeName, amount, description });
  } catch (error) {
    console.error(error);
  }
};

export const deleteIncome = async (id, name) => {
  try {
    await deleteDoc(doc(incomeRef, id));
    console.log("deleted :", name);
  } catch (error) {
    console.error(error);
  }
};
