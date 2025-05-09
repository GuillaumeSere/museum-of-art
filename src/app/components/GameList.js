import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SuggestionsList from './SuggestionsList';
import Video from './Video';

const GameList = () => {
    const [searchTerm, setSearchTerm] = useState(''); // champ de recherche pour le terme
    const [objectData, setObjectData] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // message d'erreur pour l'objectId inexistant
    const [suggestions, setSuggestions] = useState([]); // Nouvel état pour les suggestions
    const [showVideo, setShowVideo] = useState(true); // Nouvel état pour afficher la vidéo

    const handleSearch = async () => {
        setErrorMessage(''); // Réinitialisation du message d'erreur avant chaque recherche
        setSuggestions([]); // Réinitialiser les suggestions avant chaque recherche
        setShowVideo(false); // Cacher la vidéo avant chaque recherche
        try {
            const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
            if (response.data.objectIDs.length > 0) {
                const objectId = response.data.objectIDs[0]; // On prend le premier objet ID trouvé
                const detailResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
                setObjectData(detailResponse.data);
                console.log(detailResponse.data);
            } else {
                console.log('Aucun objet trouvé avec ce terme de recherche.');
                setErrorMessage('Aucun objet trouvé avec ce terme de recherche. Veuillez essayer une nouvelle recherche.'); // Message d'erreur si aucun objet trouvé
            }

            // Récupérer les suggestions d'œuvres d'art
            const suggestionsResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
            const suggestionsData = await Promise.all(
                suggestionsResponse.data.objectIDs.slice(0, 5).map(async (id) => {
                    const detailResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                    return detailResponse.data;
                })
            );
            setSuggestions(suggestionsData); // Mettre à jour l'état des suggestions
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
            setErrorMessage('Erreur lors de la récupération des données. Veuillez essayer une nouvelle recherche.'); // Message d'erreur en cas d'erreur de récupération
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setObjectData(suggestion); // Mettre à jour l'état avec les données de la suggestion cliquée
    };

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (searchTerm.length >= 3) {
                try {
                    const response = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q=${searchTerm}`);
                    const suggestionsData = await Promise.all(
                        response.data.objectIDs.slice(0, 5).map(async (id) => {
                            const detailResponse = await axios.get(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`);
                            return detailResponse.data;
                        })
                    );
                    setSuggestions(suggestionsData); // Mettre à jour l'état des suggestions
                } catch (error) {
                    console.error('Erreur lors de la récupération des suggestions:', error);
                }
            }
        };

        fetchSuggestions();
    }, [searchTerm]);

    return (
        <div className='descriptions px-4 py-8 w-full'>
            <div className="container mx-auto">
            <h2 className="text-stone-200 mb-4">Recherche d'Oeuvres d'art (entrer un terme comme Rome, Louis ou un numéro)</h2>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Entrer un terme de recherche (minimum 3 caractères)"
                className="w-full mx-auto p-2 mb-4 border border-gray-400 text-black rounded-md"
                onKeyDown={handleKeyDown}
                minLength={3}
            />
            {searchTerm.length < 3 && <p className=" text-white text-sm mb-4">Veuillez entrer au moins 3 caractères ou 1 chiffres.</p>}
            <button
                onClick={handleSearch}
                className="bg-stone-800 hover:bg-stone-700 text-white font-bold w-sm py-2 px-4 mb-4 rounded cursor-pointer"
                disabled={searchTerm.length < 3}
            >
                Rechercher
            </button>
            {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}
            {showVideo ? <Video /> : <SuggestionsList suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />}
            {objectData ? (
                <div className='description'>
                    {objectData.primaryImage ? (
                        <a href={objectData.primaryImage} target="_blank" rel="noopener noreferrer">
                            <img src={objectData.primaryImage} alt="Image principale" className="max-w-2xs mb-4" />
                        </a>
                    ) : (
                        <p className="text-lg font-semibold text-red-500">Aucune image principale disponible pour cet objet ID</p>
                    )}
                    <p className="header-title">{objectData.title}</p>
                    <p className="text-sm text-stone-200">Artiste: {objectData.artistDisplayName}</p>
                    <p className="text-sm text-stone-200">Ville: {objectData.country}</p>
                    <p className="text-sm text-stone-200">Dimensions: {objectData.dimensions}</p>
                    <p className="text-sm text-stone-200">Description: {objectData.creditLine}</p>
                    <p className="text-sm text-stone-200">Culture: {objectData.culture}</p>
                    <p className="text-sm text-stone-200">Département: {objectData.department}</p>
                    <p className="text-sm text-stone-200">Date de l'objet: {objectData.objectDate}</p>
                    <a href={objectData.artistWikidata_URL} target="_blank" className='text-blue-500'>En savoir plus sur l'artiste</a>
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
            ) : null}
            </div>
          
        </div>
    );
};

export default GameList;