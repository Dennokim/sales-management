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

// Add income
const addIncome = async (name, amount, description, category) => {
  try {
    const incomeData = { name, amount, description, category };
    const docRef = await addDoc(incomeRef, incomeData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

// Edit income
const editIncome = async (incomeId, name, amount, description, category) => {
  try {
    const newIncomeData = { name, amount, description, category };
    const incomeDoc = doc(db, "income", incomeId);
    await setDoc(incomeDoc, newIncomeData);
    console.log("Document updated with ID: ", incomeId);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

// Delete income
const deleteIncome = async (incomeId) => {
  try {
    await deleteDoc(doc(db, "income", incomeId));
    console.log("Document with ID: ", incomeId, " deleted");
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

//get income total
const getAllIncomes = (callback) => {
  onSnapshot(incomeRef, (querySnapshot) => {
    const incomes = [];
    let categoryTotals = {};
    querySnapshot.forEach((doc) => {
      let income = { id: doc.id, ...doc.data() };
      // Ensure the amount is a number
      income.amount = Number(income.amount);
      incomes.push(income);

      // Calculate total income for each category
      if (categoryTotals[income.category]) {
        categoryTotals[income.category] += income.amount;
      } else {
        categoryTotals[income.category] = income.amount;
      }
    });

    callback(incomes, categoryTotals);
  });
};

//get income total for a certain category
const getIncomeByCategory = (category, callback) => {
  onSnapshot(incomeRef, (querySnapshot) => {
    let totalIncome = 0;
    querySnapshot.forEach((doc) => {
      let income = { id: doc.id, ...doc.data() };
      if (income.category === category) {
        totalIncome += income.amount;
      }
    });

    callback(totalIncome);
  });
};

export {
  addIncome,
  editIncome,
  deleteIncome,
  getAllIncomes,
  getIncomeByCategory,
};
