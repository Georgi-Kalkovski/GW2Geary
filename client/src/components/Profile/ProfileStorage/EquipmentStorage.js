import { Link } from "react-router-dom";
import AuthService from "../../../services/auth.service";
import { useState, useCallback, useEffect } from "react";
import { specIcons } from '../../Character/Build/specIcons';
import { genderIcons, wikiBigRacesColoredIcons } from '../../icons';
import CopyEquipment from '../copy.png';
import ApplyEquipment from '../apply.png';
import EventBus from "../../../common/EventBus";
import { useNavigate } from "react-router-dom";

function EquipmentStorage() {
    const [storage, setStorage] = useState([]);
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);
    const currentUser = AuthService.getCurrentUser();
    let navigate = useNavigate();

    const fetchStoredEquipment = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            setStorage(user.storedEquipment || []);
        } catch (error) {
            console.error('Error fetching stored equipment:', error);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await AuthService.getUser();
                setStorage(user.storedEquipment || []);
            } catch (error) {
                if (error.message === "Request failed with status code 401") {
                    EventBus.emit("logout");
                    navigate('/');
                } else {
                    console.error('Error fetching user data:', error);
                }
            }
        };

        fetchData();
        fetchStoredEquipment();

    }, [fetchStoredEquipment]);

    const [copiedMap, setCopiedMap] = useState({});

    const copyEquipmentLink = (link, storedId) => {
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
                console.error('Error copying full equipment link:', error);
            });
    };

    const deleteStoredEquipment = useCallback((storedEquipmentId) => {
        if (deleteConfirmation === storedEquipmentId) {
            AuthService.deleteEquipment(storedEquipmentId)
                .then((response) => {
                    const user = JSON.parse(localStorage.getItem('user')) || {};
                    const updatedStoredEquipment = user.storedEquipment.filter(equipment => equipment.id !== storedEquipmentId);
                    const updatedUser = {
                        ...user,
                        accessToken: currentUser.accessToken,
                        storedEquipment: updatedStoredEquipment,
                    };
                    localStorage.setItem('user', JSON.stringify(updatedUser));
                    setStorage(updatedStoredEquipment);
                    setDeleteConfirmation(null);
                })
                .catch((error) => {
                    console.error("Error deleting stored equipment:", error);
                });
        } else {
            setDeleteConfirmation(storedEquipmentId);
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
                    {storage.slice().reverse().map((stored) => (
                        <div className="facts-div-profile api-right" key={stored.id}>
                            <Link className="flex profile-storage-first-child" title="Redirect to Equipment" style={{ marginLeft: '20px', textDecoration: 'none', color: 'inherit' }} to={`/eqs/${stored.char.replaceAll(' ', '_')}/${stored.id}`}>

                                <div style={{ textAlign: 'right' }}>
                                    <div
                                        className="font-size-20px yellow-highlight profile-names"
                                        style={window.innerWidth < 900
                                            ? { fontSize: '15px' }
                                            : {}}
                                    >
                                        {stored.char}
                                    </div>
                                    <div style={{ fontSize: '10px' }}>{stored?.eqname}</div></div>
                                <img
                                    style={window.innerWidth < 900 ? { width: '25px', height: '25px' } : { width: '30px', height: '30px' }}
                                    src={specIcons[stored.profession.toLowerCase()]}
                                    alt=""
                                    title={stored.profession}
                                />
                                <div style={window.innerWidth < 900 ? { marginLeft: '5px', marginRight: '5px', fontSize: '9px' } : { marginLeft: '5px', marginRight: '5px', fontSize: '12px' }}>
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
                                onClick={() => copyEquipmentLink(`/eqs/${stored.char}/${stored.id}`, stored.id)}
                            >
                                <img src={copiedMap[stored.id] ? ApplyEquipment : CopyEquipment} alt={copiedMap[stored.id] ? 'ApplyEquipment' : 'StoreEquipment'} />
                            </button>

                            {deleteConfirmation === stored.id ? (
                                <>
                                    <button className="basic-button delete-button" onClick={() => deleteStoredEquipment(stored.id)}>Confirm</button>
                                </>
                            ) : (
                                <button className="basic-button delete-button" onClick={() => deleteStoredEquipment(stored.id)}>Delete</button>
                            )
                            }
                            <div>
                            </div>
                        </div >
                    ))}
                </div >
                : <div className="flex center">No Equipment Stored</div>
            }
        </>
    );
}

export default EquipmentStorage;
