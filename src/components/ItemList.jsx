import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/api';

export default function ItemList() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await getItems();
    setItems(data);
  };

  const handleDelete = async id => {
    await deleteItem(id);
    fetchItems();
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Ítems</h1>
      <ul className="space-y-4">
        {items.map(item => (
          <li key={item.id} className="p-4 border rounded flex justify-between">
            <span>{item.name} - ${item.price}</span>
            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white px-2 py-1 rounded">Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
