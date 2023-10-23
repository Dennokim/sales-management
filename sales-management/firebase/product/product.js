import {
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../config/config";

const db = getFirestore(firebase_app);
const productRef = collection(db, "products");

export const addProduct = async (name, price, stock, category, description) => {
  try {
    await addDoc(productRef, { name, price, stock, category, description });
  } catch (error) {
    console.error(error);
  }
};

export const getProducts = async (setProducts) => {
  try {
    const unsub = onSnapshot(productRef, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.unshift({ ...doc.data(), id: doc.id });
      });
      setProducts(docs);
    });
  } catch (error) {
    console.error(error);
    setProducts([]);
  }
};

export const deleteProduct = async (id, name) => {
  try {
    await deleteDoc(doc(productRef, id));
    console.log("deleted:", name);
  } catch (error) {
    console.error(error);
  }
};
