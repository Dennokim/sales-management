import {
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../../config/config";

const db = getFirestore(firebase_app);
const expenseCategoryRef = collection(db, "expenseCategories");
const incomeCategoryRef = collection(db, "incomeCategories");

export const addExpenseCategory = async (name) => {
  try {
    await addDoc(expenseCategoryRef, { name });
  } catch (error) {
    console.error(error);
  }
};

export const getExpenseCategory = async (setCategory) => {
  try {
    const unsub = onSnapshot(expenseCategoryRef, (querySnapshot) => {
      let categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      setCategory(categories);
    });
  } catch (error) {
    console.error(error);
    setCategory([]);
  }
};

export const addIncomeCategory = async (name) => {
  try {
    await addDoc(incomeCategoryRef, { name });
  } catch (error) {
    console.error(error);
  }
};

export const getIncomeCategory = async (setCategory) => {
  try {
    const unsub = onSnapshot(incomeCategoryRef, (querySnapshot) => {
      let categories = [];
      querySnapshot.forEach((doc) => {
        categories.push({ id: doc.id, ...doc.data() });
      });
      setCategory(categories);
    });
  } catch (error) {
    console.error(error);
    setCategory([]);
  }
};
