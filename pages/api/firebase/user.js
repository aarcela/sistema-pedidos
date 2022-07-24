export default function handler(req, res) {
  res.status(200).json({ name: "John Doe" });
}

// export const userDetail = async (req, res) => {
// 	const docRef = doc(db, collectionName, docID);
// 	const docSnap = await getDoc(docRef);
// 	return docSnap.data();
//   };
