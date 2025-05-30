import React, { useEffect, useState } from 'react';

const Pets = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch('/api/pets');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch pets');
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-8">Available Pets</h2>
        {loading && <div className="text-center text-gray-500">Loading pets...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {!loading && !error && pets.length === 0 && (
            <div className="col-span-full text-center text-gray-500">No pets found.</div>
          )}
          {pets.map(pet => (
            <div key={pet._id} className="bg-white rounded-xl shadow hover:-translate-y-2 transition-transform p-4 flex flex-col">
              <img src={pet.images && pet.images[0]} alt={pet.name} className="h-40 w-full object-cover rounded-t-xl mb-4" />
              <div className="font-semibold text-lg mb-1 truncate">{pet.name}</div>
              <div className="text-gray-500 text-sm mb-2">{pet.breed} • {pet.age}</div>
              <div className="font-bold text-primary text-xl mb-2">${pet.price}</div>
              <button className="mt-auto bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pets; 