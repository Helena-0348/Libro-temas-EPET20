import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const useMonth = () => {
    // Add a new month with empty days subcollection
    const addMonth = async (monthData) => {
        try {
            // Create a new document in the months collection
            const monthRef = await addDoc(collection(db, 'months'), {
                idMonth: monthData.idMonth,
                nameMonth: monthData.nameMonth
            });

            return monthRef.id;
        } catch (error) {
            console.error('Error adding month: ', error);
            throw error;
        }
    };

    // Add a day to a specific month's days subcollection
    const addDayToMonth = async (monthId, dayData) => {
        try {
            const monthRef = doc(db, 'months', monthId);
            const daysCollectionRef = collection(monthRef, 'days');
            await addDoc(daysCollectionRef, dayData);
        } catch (error) {
            console.error('Error adding day to month: ', error);
            throw error;
        }
    };

    // Get all months
    const getMonths = async () => {
        try {
            const monthsSnapshot = await getDocs(collection(db, 'months'));
            return monthsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting months: ', error);
            throw error;
        }
    };

    // Get all days for a specific month
    const getDaysForMonth = async (monthId) => {
        try {
            const monthRef = doc(db, 'months', monthId);
            const daysCollectionRef = collection(monthRef, 'days');
            const daysSnapshot = await getDocs(daysCollectionRef);
            return daysSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        } catch (error) {
            console.error('Error getting days: ', error);
            throw error;
        }
    };

    return {
        addMonth,
        addDayToMonth,
        getMonths,
        getDaysForMonth
    };
};