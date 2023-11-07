import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
  QuerySnapshot,
} from "firebase/firestore";
import firebase_app from "../../config/config";
import { callback } from "chart.js/dist/helpers/helpers.core";

const db = getFirestore(firebase_app);
const expenseRef = collection(db, "expenses");

export const addExpense = async (name, amount, description, category) => {
  try {
    await addDoc(expenseRef, { name, amount, description, category });
  } catch (error) {
    console.error(error);
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

export const getAllExpenses = async (callback) => {
  onSnapshot(expenseRef, (QuerySnapshot) => {
    let expenses = [];
    let categoryTotals = {};
    QuerySnapshot.forEach((doc) => {
      let expense = ({ ...doc.data(), id: doc.id });
      expense.amount = Number(expense.amount);
      expenses.push(expense);

      // Calculate total expense for each category
      if (!categoryTotals[expense.category]) {
        categoryTotals[expense.category] += expense.amount;
      }else{
        categoryTotals[expense.category] = expense.amount;
      }
    })
  })
}
