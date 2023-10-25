import React, { useState } from "react";
import CharacterPreview from "../../CharacterPreview";
import upArrow from '../up-arrow.svg';
import downArrow from '../down-arrow.svg';

function ProfileApiCharacters({ apiKey }) {
    const [expandedIndexes, setExpandedIndexes] = useState([]);

    const isExpanded = (apiKey) => expandedIndexes.includes(apiKey?._id);

    const toggleExpansion = (apiKey) => {
        if (isExpanded(apiKey?._id)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== apiKey?._id));
        } else {
            setExpandedIndexes([...expandedIndexes, apiKey?._id]);
        }
    };
    return (<>
        <div key="characters-section">
            {apiKey &&
                <React.Fragment key={`characters-fragment-${apiKey?._id}`}>
                    
                    <div className="arrow-line" onClick={() => toggleExpansion(apiKey?._id)} key={`character-arrow-line-${apiKey?._id}`}>
                        <div className="flex center">
                            <div className="profile-line">

                            </div>{isExpanded(apiKey?._id) ? <img src={upArrow} className="up-down-arrow" alt="up-arrow" /> : <img src={downArrow} className="up-down-arrow" alt="down-arrow" />}
                        </div>
                    </div>
                    {isExpanded(apiKey?._id) && (
                        <div className="characters profile-characters" key={`character-preview-${apiKey?._id}`}>
                            {apiKey.characters &&
                                apiKey.characters.map((character, characterIndex) => (
                                    <CharacterPreview
                                        character={character}
                                        apiKey={apiKey}
                                        key={`${character.name}-${characterIndex}`}
                                    />
                                ))}
                        </div>
                    )}
                </React.Fragment>}
        </div>
    </>);
}

export default ProfileApiCharacters;