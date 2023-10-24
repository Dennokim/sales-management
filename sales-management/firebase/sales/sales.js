import {
  where,
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
  serverTimestamp,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import firebase_app from "../config/config";

const db = getFirestore(firebase_app);
const salesRef = collection(db, "sales");

export const addSales = async (
  customerName,
  customerEmail,
  products,
  totalAmount,
  setAddNew
) => {
  try {
    await addDoc(salesRef, {
      customerName: customerName,
      customerEmail: customerEmail,
      products: products,
      totalAmount: totalAmount,
      timestamp: serverTimestamp(),
    });
    setAddNew(false);
  } catch (error) {
    console.error(error);
  }
};

// Get all Sales data
export const getSales = async (setSales) => {
  try {
    const q = query(salesRef, orderBy("timestamp"));
    onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.unshift({ ...doc.data(), id: doc.id });
      });
      setSales(docs);
    });
  } catch (error) {
    console.error(error);
    setSales([]);
  }
};

// Get total sales
export const getTotalSales = async (setTotalSales) => {
  try {
    const unsub = onSnapshot(salesRef, (querySnapshot) => {
      let totalSales = 0;
      querySnapshot.forEach((doc) => {
        totalSales += doc.data().totalAmount; // Corrected the field to 'totalAmount'
      });
      setTotalSales(totalSales);
    });
  } catch (error) {
    console.error(error);
  }
};

// Get sales for day
export const getSalesForDay = async (date, setSales) => {
  try {
    const day = date.getDate(); // Changed to getDate() to get the day
    const month = date.getMonth();
    const year = date.getFullYear();

    if (day !== undefined && month !== undefined && year !== undefined) {
      const startDate = new Date(year, month, day, 0, 0, 0);
      const endDate = new Date(year, month, day, 23, 59, 59);

      const q = query(
        salesRef,
        orderBy("timestamp"),
        where("timestamp", ">=", Timestamp.fromDate(startDate)),
        where("timestamp", "<=", Timestamp.fromDate(endDate))
      );

      onSnapshot(q, (querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.unshift({ ...doc.data(), id: doc.id });
        });
        setSales(docs);
      });
    }
  } catch (error) {
    console.error(error);
  }
};
