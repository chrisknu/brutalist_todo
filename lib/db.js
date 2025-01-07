'use client';

export function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('TodoDB', 1);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('todos')) {
        const store = db.createObjectStore('todos', { keyPath: 'id' });
        store.createIndex('order', 'order');
      }
    };
  });
}

export async function getAllTodos() {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readonly');
    const store = transaction.objectStore('todos');
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function addTodo(todo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.add(todo);

    request.onsuccess = () => resolve(todo);
    request.onerror = () => reject(request.error);
  });
}

export async function updateTodo(todo) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.put(todo);

    request.onsuccess = () => resolve(todo);
    request.onerror = () => reject(request.error);
  });
}

export async function deleteTodo(id) {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['todos'], 'readwrite');
    const store = transaction.objectStore('todos');
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}