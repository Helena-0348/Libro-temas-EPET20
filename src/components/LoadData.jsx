import React, { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { app } from '../config/firebase';

const LoadData = () => {
    const [status, setStatus] = useState('');
    const db = getFirestore(app);

    const dataToLoad = [
        {
            title: "Item 1",
            description: "Description for item 1",
            date: new Date().toISOString()
        },
        {
            title: "Item 2",
            description: "Description for item 2",
            date: new Date().toISOString()
        },
        {
            title: "Item 3",
            description: "Description for item 3",
            date: new Date().toISOString()
        }
    ];

    const loadDataToFirebase = async () => {
        try {
            setStatus('Loading data...');
            
            for (const item of dataToLoad) {
                await addDoc(collection(db, 'items'), item);
            }

            setStatus('Data loaded successfully!');
        } catch (error) {
            console.error('Error loading data:', error);
            setStatus('Error loading data. Check console for details.');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Load Data to Firebase</h2>
            <button 
                onClick={loadDataToFirebase}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                }}
            >
                Load Data
            </button>
            {status && <p>{status}</p>}
        </div>
    );
};

export default LoadData;