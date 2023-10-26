import React from "react";
import CharacterPreview from "../../CharacterPreview";

function ProfileApiCharacters({ apiKey, show }) {

    return (
        <div className={`characters-section ${show ? 'show' : ''}`} key="characters-section">
            {apiKey &&
                <React.Fragment key={`characters-fragment-${apiKey?._id}`}>
                    <div className={`characters profile-characters ${show ? 'show' : ''}`} key={`character-preview-${apiKey?._id}`}>
                        {apiKey.characters &&
                            apiKey.characters.map((character, characterIndex) => (
                                <CharacterPreview
                                    character={character}
                                    apiKey={apiKey}
                                    key={`${character.name}-${characterIndex}`}
                                />
                            ))}
                    </div>
                </React.Fragment>
            }
        </div>
    );
}

export default ProfileApiCharacters;