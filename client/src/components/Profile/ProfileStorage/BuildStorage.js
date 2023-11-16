import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useState, useCallback, useEffect } from "react";
import { specIcons } from '../../Character/Build/specIcons';
import CopyBuild from '../copy.png';
import ApplyBuild from '../apply.png';
function BuildStorage() {
    const [storage, setStorage] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const fetchStoredBuilds = useCallback(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        setStorage(user.storedBuilds || []);
    }, []);

    useEffect(() => {
        fetchStoredBuilds();
    }, [fetchStoredBuilds]);

    const [copiedMap, setCopiedMap] = useState({});

    const copyBuildLink = (link, storedId) => {
        const fullLink = `${window.location.origin}${link}`;
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
                console.error('Error copying full build link:', error);
            });
    };

    const deleteStoredBuild = useCallback((storedBuildId) => {
        if (deleteConfirmation === storedBuildId) {
            AuthService.deleteBuild(storedBuildId)
                .then((response) => {
                    const user = JSON.parse(localStorage.getItem('user')) || {};
                    const updatedStoredBuilds = user.storedBuilds.filter(build => build.id !== storedBuildId);
                    const updatedUser = {
                        ...user,
                        storedBuilds: updatedStoredBuilds,
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setStorage(updatedStoredBuilds);
                    setDeleteConfirmation(null);
                })
                .catch((error) => {
                    console.error("Error deleting stored build:", error);
                });
        } else {
            setDeleteConfirmation(storedBuildId);
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
                            {console.log(stored)}
                            <Link className="flex profile-storage-first-child" title="Redirect to Build" style={{ marginLeft: '20px', textDecoration: 'none', color: 'inherit' }} to={`/blds/${stored.char}/${stored.id}`}>
                                <img style={{ width: '30px', height: '30px' }} src={specIcons[stored.spec.toLowerCase()]} alt="" />
                                <div className=" font-size-20px yellow-highlight profile-names">
                                    {stored.char}
                                </div>
                                <div style={{ marginLeft: '5px', marginRight: '5px', fontSize: '12px' }}>
                                    <div>
                                        {stored.creationDate?.split('T')[1]?.split('.')[0]}
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
                                onClick={() => copyBuildLink(`/blds/${stored.char}/${stored.id}`, stored.id)}
                            >
                                <img src={copiedMap[stored.id] ? ApplyBuild : CopyBuild} alt={copiedMap[stored.id] ? 'ApplyBuild' : 'StoreBuild'} />
                            </button>

                            {deleteConfirmation === stored.id ? (
                                <>
                                    <button className="basic-button delete-button" onClick={() => deleteStoredBuild(stored.id)}>Confirm</button>
                                </>
                            ) : (
                                <button className="basic-button delete-button" onClick={() => deleteStoredBuild(stored.id)}>Delete</button>
                            )
                            }
                            <div>
                            </div>
                        </div >
                    ))}
                </div >
                : <div className="flex center">No Builds Stored</div>
            }
        </>
    );
}

export default BuildStorage;
