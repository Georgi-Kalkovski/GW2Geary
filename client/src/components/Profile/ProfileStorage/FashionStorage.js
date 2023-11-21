import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useState, useCallback, useEffect } from "react";
import { specIcons } from '../../Character/Build/specIcons';
import { genderIcons,wikiBigRacesColoredIcons } from '../../icons';
import CopyFashion from '../copy.png';
import ApplyFashion from '../apply.png';
function FashionStorage() {
    const [storage, setStorage] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const fetchStoredFashion = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            setStorage(user.storedFashion || []);
        } catch (error) {
            console.error('Error fetching stored fashion:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AuthService.getUser();
                setStorage(user.storedFashion || []);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchData();
        fetchStoredFashion();

    }, [fetchStoredFashion]);

    const [copiedMap, setCopiedMap] = useState({});

    const copyFashionLink = (link, storedId) => {
        const correctedLink = link.replaceAll(' ', '_');
        const fullLink = `${window.location.origin}${correctedLink}`;
        navigator.clipboard.writeText(fullLink)
            .then(() => {
                setCopiedMap(prevState => ({
                    ...prevState,
                    [storedId]: true,
                }));
                setTimeout(() => {
                    setCopiedMap(prevState => ({
                        ...prevState,
                        [storedId]: false,
                    }));
                }, 800);
            })
            .catch((error) => {
                console.error('Error copying full fashion link:', error);
            });
    };

    const deleteStoredFashion = useCallback((storedFashionId) => {
        if (deleteConfirmation === storedFashionId) {
            AuthService.deleteFashion(storedFashionId)
                .then((response) => {
                    const user = JSON.parse(localStorage.getItem('user')) || {};
                    const updatedStoredFashion = user.storedFashion.filter(fashion => fashion.id !== storedFashionId);
                    const updatedUser = {
                        ...user,
                        storedFashion: updatedStoredFashion,
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setStorage(updatedStoredFashion);
                    setDeleteConfirmation(null);
                })
                .catch((error) => {
                    console.error("Error deleting stored fashion:", error);
                });
        } else {
            setDeleteConfirmation(storedFashionId);
        }
    }, [deleteConfirmation]);

    const [maxHeight, setMaxHeight] = useState(0);

    useEffect(() => {
        if (window.innerWidth >= 900) {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.6);
        } else {
            setMaxHeight(Math.max(document.documentElement.clientHeight, window.innerHeight || 0) * 0.55);
        }
    }, []);

    return (
        <>
            {storage && storage.length > 0
                ?
                <div className='profile-box custom-scrollbar' style={{ textAlign: 'left', justifyContent: 'right', maxWidth: '790px', maxHeight: `${maxHeight}px`, overflow: 'auto' }}>
                    {storage.map((stored) => (
                        <div className="facts-div-profile api-right" key={stored.id}>
                            <Link className="flex profile-storage-first-child" title="Redirect to Fashion" style={{ marginLeft: '20px', textDecoration: 'none', color: 'inherit' }} to={`/fs/${stored.char.replaceAll(' ', '_')}/${stored.id}`}>
                                
                                <div className=" font-size-20px yellow-highlight profile-names">
                                    {stored.char}
                                </div>
                                <img
                                    style={{ width: '30px', height: '30px' }}
                                    src={genderIcons[stored.gender]}
                                    alt=""
                                    title={stored.gender}
                                />
                                 <img
                                    style={{ width: '30px', height: '30px' }}
                                    src={wikiBigRacesColoredIcons[stored.race]}
                                    alt=""
                                    title={stored.race}
                                />
                                 <img
                                    style={{ width: '30px', height: '30px' }}
                                    src={specIcons[stored.profession.toLowerCase()]}
                                    alt=""
                                    title={stored.profession}
                                />
                                <div style={{ marginLeft: '5px', marginRight: '5px', fontSize: '12px' }}>
                                    <div>
                                        {stored.creationDate.split('T')[1].split('.')[0]}
                                    </div>
                                    <div>
                                        {stored.creationDate.split('T')[0]}
                                    </div>
                                </div>
                                
                            </Link >
                            <button
                                type='button'
                                title='Copy Link'
                                className='game-button'
                                style={{ background: 'none' }}
                                onClick={() => copyFashionLink(`/fs/${stored.char}/${stored.id}`, stored.id)}
                            >
                                <img src={copiedMap[stored.id] ? ApplyFashion : CopyFashion} alt={copiedMap[stored.id] ? 'ApplyFashion' : 'StoreFashion'} />
                            </button>

                            {deleteConfirmation === stored.id ? (
                                <>
                                    <button className="basic-button delete-button" onClick={() => deleteStoredFashion(stored.id)}>Confirm</button>
                                </>
                            ) : (
                                <button className="basic-button delete-button" onClick={() => deleteStoredFashion(stored.id)}>Delete</button>
                            )
                            }
                            <div>
                            </div>
                        </div >
                    ))}
                </div >
                : <div className="flex center">No Fashion Stored</div>
            }
        </>
    );
}

export default FashionStorage;
