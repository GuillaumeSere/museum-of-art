import React from 'react';

const SuggestionsList = ({ suggestions, onSuggestionClick }) => {
    if (!suggestions || suggestions.length === 0) return null;

    return (
        <ul className="list rounded-md shadow-md mb-5 mt-2">
            <h2 className='text-black text-center from-neutral-500 mb-2 pt-2'>Suggestions</h2>
            {suggestions.map((suggestion, index) => (
                <li 
                    key={index} 
                    className="p-2 text-black hover:text-green-500 hover:bg-stone-700 hover:rounded-md cursor-pointer"
                    onClick={() => onSuggestionClick(suggestion)}
                >
                   ✔️ {suggestion.title} - {suggestion.artistDisplayName}
                </li>
            ))}
        </ul>
    );
};

export default SuggestionsList;
