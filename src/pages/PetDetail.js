import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PetDetail = () => {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPet = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/pets/${id}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch pet');
        setPet(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPet();
  }, [id]);

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        {loading && <div className="text-center text-gray-500">Loading pet...</div>}
        {error && <div className="text-center text-red-500">{error}</div>}
        {pet && (
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1 flex items-center justify-center">
              <img src={pet.images && pet.images[0]} alt={pet.name} className="h-80 w-full object-cover rounded-xl" />
            </div>
            <div className="flex-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
              <div className="text-gray-500 text-sm mb-2">{pet.breed} • {pet.age} • {pet.gender}</div>
              <div className="font-bold text-primary text-2xl mb-4">${pet.price}</div>
              <div className="mb-4 text-gray-700">{pet.description}</div>
              <button className="bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition w-full md:w-1/2">
                {pet.isAdoption ? 'Adopt' : 'Add to Cart'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetDetail; 