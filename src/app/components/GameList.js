import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GameList = () => {
  const [objectId, setObjectId] = useState(''); // champ de recherche pour l'object ID
  const [objectData, setObjectData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
      setObjectData(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <div className='max-w-2xl mx-auto'>
      <h2 className="text-lg font-bold">Recherche d'Oeuvres d'art (entrez un numéro)</h2>
      <input
        type="text"
        value={objectId}
        onChange={(e) => setObjectId(e.target.value)}
        placeholder="Entrer l'object ID"
        className="w-full p-2 mb-4 border border-gray-400 text-black"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
      >
        Rechercher
      </button>
      {objectData && objectData.primaryImage ? (
        <div>
          <a href={objectData.primaryImage} target="_blank" rel="noopener noreferrer">
            <img src={objectData.primaryImage} alt="Image principale" className="max-w-2xs mb-4" />
          </a>
          <p className="text-lg font-semibold">{objectData.title}</p>
          <p className="text-sm text-white">{objectData.artistDisplayName}</p>
          <p className="text-sm text-white">{objectData.country}</p>
          <p className="text-sm text-white">{objectData.creditLine}</p>
          <p className="text-sm text-white">{objectData.culture}</p>
          <p className="text-sm text-white">{objectData.department}</p>
          {objectData.additionalImages && objectData.additionalImages.length > 0 ? (
            <div className="flex flex-wrap">
              {objectData.additionalImages.map((image, index) => (
                <a key={index} href={image} target="_blank" rel="noopener noreferrer">
                  <img src={image} alt={`Image secondaire ${index + 1}`} className="max-w-2xs mb-4 mt-5 mr-2" />
                </a>
              ))}
            </div>
          ) : (
            <p className="text-red-500">Aucune image secondaire disponible pour cet objet ID</p>
          )}
        </div>
      ) : (
        <p className="text-red-500">Aucune image disponible pour cet objet ID</p>
      )}
    </div>
  );
};

export default GameList;
