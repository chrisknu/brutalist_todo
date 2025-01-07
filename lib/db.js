'use client';

let dbConnection = null;
let dbInitPromise = null;

export function openDB() {
  if (dbConnection) {
    return Promise.resolve(dbConnection);
  }

  if (dbInitPromise) {
    return dbInitPromise;
  }

  dbInitPromise = new Promise((resolve, reject) => {
    const request = indexedDB.open('TodoDB', 1);

    request.onerror = () => {
      dbInitPromise = null;
      reject(request.error);
    };

    request.onsuccess = () => {
      dbConnection = request.result;
      dbInitPromise = null;
      resolve(dbConnection);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('todos')) {
        const store = db.createObjectStore('todos', { keyPath: 'id' });
        store.createIndex('order', 'order');
      }
    };
  });

  return dbInitPromise;
}

// Cache for todos
let todosCache = null;
let lastCacheTime = 0;
const CACHE_DURATION = 1000; // 1 second cache duration

export async function getAllTodos() {
  const now = Date.now();

  // Return cached data if it's fresh
  if (todosCache && now - lastCacheTime < CACHE_DURATION) {
    return Promise.resolve([...todosCache]); // Return a copy to prevent mutations
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readonly');
    const store = transaction.objectStore('todos');
    const request = store.getAll();

    request.onsuccess = () => {
      todosCache = request.result;
      lastCacheTime = now;
      resolve([...todosCache]); // Return a copy to prevent mutations
    };
    request.onerror = () => reject(request.error);
  });
}

export async function addTodo(todo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.add(todo);

    request.onsuccess = () => {
      todosCache = null; // Invalidate cache
      resolve(todo);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function updateTodo(todo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.put(todo);

    request.onsuccess = () => {
      todosCache = null; // Invalidate cache
      resolve(todo);
    };
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTodo(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.delete(id);

    request.onsuccess = () => {
      todosCache = null; // Invalidate cache
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

// Clean up function to close DB connection when needed
export function closeDB() {
  if (dbConnection) {
    dbConnection.close();
    dbConnection = null;
  }
  todosCache = null;
}
