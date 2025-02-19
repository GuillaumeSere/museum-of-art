import React, { useState } from 'react';
import axios from 'axios';

const GameList = () => {
  const [searchTerm, setSearchTerm] = useState(''); // champ de recherche pour le terme
  const [objectData, setObjectData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
      if (response.data.objectIDs.length > 0) {
        const objectId = response.data.objectIDs[0]; // On prend le premier objet ID trouvé
        const detailResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        setObjectData(detailResponse.data);
        console.log(detailResponse.data);
      } else {
        console.log('Aucun objet trouvé avec ce terme de recherche.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='description max-w-2xl mx-auto'>
      <h2 className="text-lg font-bold text-black">Recherche d'Oeuvres d'art (entrez un terme comme Rome, Louis ou un numéro)</h2>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Entrer un terme de recherche"
        className="w-full p-2 mb-4 border border-gray-400 text-black"
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded"
      >
        Rechercher
      </button>
      {objectData ? (
        <div className='description'>
          {objectData.primaryImage ? (
            <a href={objectData.primaryImage} target="_blank" rel="noopener noreferrer">
              <img src={objectData.primaryImage} alt="Image principale" className="max-w-2xs mb-4" />
            </a>
          ) : (
            <p className="text-lg font-semibold">Aucune image principale disponible pour cet objet ID</p>
          )}
          <p className="text-lg font-semibold">{objectData.title}</p>
          <p className="text-sm text-black">{objectData.artistDisplayName}</p>
          <p className="text-sm text-black">{objectData.country}</p>
          <p className="text-sm text-black">{objectData.creditLine}</p>
          <p className="text-sm text-black">{objectData.culture}</p>
          <p className="text-sm text-black">{objectData.department}</p>
         <a href={objectData.artistWikidata_URL} target="_blank" className='text-green-500'>En savoir plus sur l'artiste</a>
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
        <p className="text-red-500">Aucun objet trouvé avec ce terme de recherche.</p>
      )}
    </div>
  );
};

export default GameList;