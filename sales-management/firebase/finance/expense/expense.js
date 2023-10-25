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
const expenseRef = collection(db, "expenses");

export const addExpense = async (name, amount, description, category) => {
  try {
    await addDoc(expenseRef, { name, amount, description, category });
  } catch (error) {
    console.error(error);
  }
};

export const getExpense = async (setExpense) => {
  try {
    const unsub = onSnapshot(expenseRef, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setExpense(docs);
    });
  } catch (error) {
    console.error(error);
    setExpense([]);
  }
};

export const editExpense = async (id, expenseName, amount, description) => {
  try {
    await setDoc(doc(expenseRef, id), {
      name: expenseName,
      amount,
      description,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteExpense = async (id, name) => {
  try {
    await deleteDoc(doc(expenseRef, id));
    console.log("deleted:", name);
  } catch (error) {
    console.error(error);
  }
};
