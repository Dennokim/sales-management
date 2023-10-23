import {
  doc,
  deleteDoc,
  onSnapshot,
  collection,
  addDoc,
  query,
  where,
  getFirestore,
} from "firebase/firestore";
import firebase_app from "../config/config";

const db = getFirestore(firebase_app);
const categoryRef = collection(db, "categories");
const productRef = collection(db, "products");

export const addCategory = async (name) => {
  try {
    await addDoc(categoryRef, { name });
    console.log("added this to categories: ", name);
  } catch (error) {
    console.error(error);
  }
};

export const deleteCategory = async ({ id, name }) => {
  try {
    await deleteDoc(doc(categoryRef, id));
    const q = query(productRef, where("category", "==", name));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((document) => {
        deleteDoc(doc(productRef, document.id));
      });
    });
  } catch (error) {
    console.error(error);
  }
};

export const getCategories = async (setCategories) => {
  try {
    const unsub = onSnapshot(categoryRef, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setCategories(docs);
    });
  } catch (error) {
    console.error(error);
    setCategories([]);
  }
};
