export async function initializeDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('MachuPicchuDB', 1);

    request.onerror = () => reject(request.error);
    
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create stores if they don't exist
      if (!db.objectStoreNames.contains('ipfsCids')) {
        db.createObjectStore('ipfsCids', { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}

export async function storeIPFSCids(cids: string[]) {
  const db = await initializeDB() as IDBDatabase;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['ipfsCids'], 'readwrite');
    const store = transaction.objectStore('ipfsCids');
    
    // Clear existing CIDs
    store.clear();
    
    // Store new CIDs
    cids.forEach(cid => {
      store.add({ cid, timestamp: new Date().toISOString() });
    });
    
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => reject(transaction.error);
  });
}

export async function getStoredCids(): Promise<string[]> {
  const db = await initializeDB() as IDBDatabase;
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['ipfsCids'], 'readonly');
    const store = transaction.objectStore('ipfsCids');
    const request = store.getAll();
    
    request.onsuccess = () => {
      const cids = request.result.map(item => item.cid);
      resolve(cids);
    };
    
    request.onerror = () => reject(request.error);
  });
} 