import React, { useState } from "react";
import CharacterPreview from "../../CharacterPreview";
import upArrow from '../up-arrow.svg';
import downArrow from '../down-arrow.svg';

function ProfileApiCharacters({ apiKeys }) {
    const [expandedIndexes, setExpandedIndexes] = useState([]);

    const isExpanded = (index) => expandedIndexes.includes(index);

    const toggleExpansion = (index) => {
        if (isExpanded(index)) {
            setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
        } else {
            setExpandedIndexes([...expandedIndexes, index]);
        }
    };
    return (<>
        <div key="characters-section">
            {apiKeys &&
                apiKeys.map((apiKey, index) => (
                    <React.Fragment key={`characters-fragment-${index}`}>
                        <br key={`characters-break-${index}`} />
                        <div className="flex center font-size-25px" key={`account-name-${index}`}>
                            {apiKey.accountName}
                        </div>
                        <div className="arrow-line" onClick={() => toggleExpansion(index)} key={`character-arrow-line-${index}`}>
                            <div className="flex center">
                                <div className="profile-line">

                                </div>{isExpanded(index) ? <img src={upArrow} className="up-down-arrow" alt="up-arrow" /> : <img src={downArrow} className="up-down-arrow" alt="down-arrow" />}
                            </div>
                        </div>
                        {isExpanded(index) && (
                            <div className="characters" key={`character-preview-${index}`}>
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
                    </React.Fragment>
                ))}
        </div>
    </>);
}

export default ProfileApiCharacters;