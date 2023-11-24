import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useLocation, matchPath } from 'react-router-dom';
import fetchData from '../../fetchData';
import InfusionsName from './InfusionsName';
import AuthService from '../../../services/auth.service';
import FashionSavedInner from './FashionSavedInner';
import { specIcons } from '../Build/specIcons';
import BackButton from '../BackButton';
import Cog from '../../../cog.svg'
import Dragon from '../../../dragon.svg'

const FashionSaved = () => {
    const { name, id } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [mergedItems, setMergedItems] = useState([]);
    const [fashion, setFashion] = useState(null);
    const { pathname } = useLocation();
    console.log(pathname.split('/')[1])

    useEffect(() => {
        (async () => {
            try {
                const fetchedTab = await AuthService.getFashion(name, id);
                const fetchedFashion = fetchedTab.data.fashion;
                setFashion(fetchedFashion);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);
            }
        })();
    }, [name, id]);

    useEffect(() => {
        if (fashion) {
            (async () => {
                try {
                    const itemIds = fashion?.equipment.map((el) => el.id).join(',');
                    const fetchedItems = itemIds ? await fetchData('items', itemIds) : [];
                    const skinIds = fashion?.equipment.filter((item) => item.skin).map((item) => item.skin).join(',');
                    const fetchedSkins = skinIds ? await fetchData('skins', skinIds) : [];
                    const dyesIds = fashion?.equipment.filter((item) => item.dyes).flatMap((el) => el.dyes).join(',');
                    const fetchedColors = dyesIds ? await fetchData('colors', dyesIds) : [];
                    const infusionIds = [
                        ...fashion?.equipment.flatMap((el) => el.infusions).filter((item) => item !== undefined)
                    ].join(',');
                    const fetchedInfusions = infusionIds ? await fetchData('items', infusionIds) : [];

                    const mergingItems = fashion?.equipment.map(item => ({
                        ...fashion?.equipment.find((fetchedItem => fetchedItem.id === item.id)),
                        ...fetchedItems?.find(fetchedItem => fetchedItem.id === item.id),
                        ...item,
                        dyes: [
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[0]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[1]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[2]),
                            item.dyes && fetchedColors?.find(fetchedDyes => fetchedDyes.id === item.dyes[3]),
                        ],
                        infusions: fetchedInfusions ? (item.infusions
                            ?? fashion?.equipment.find(fetchedItem => fetchedItem.id === item.id)?.infusions
                            ?? []
                        ).map(infusionId => {
                            const fetchedInfusion = fetchedInfusions.find(fetchedInfusion => fetchedInfusion.id === infusionId);
                            if (fetchedInfusion && InfusionsName(fetchedInfusion.name)) {
                                return fetchedInfusion;
                            }
                            return null; // or handle non-matching cases as needed
                        }).filter(infusion => infusion !== null) : [],
                        skin_name: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.name,
                        skin_icon: fetchedSkins?.find(fetchedSkin => fetchedSkin.id === item.skin)?.icon
                    }));
                    localStorage.setItem('prof', fashion?.profession);
                    localStorage.setItem('race', fashion?.race);
                    localStorage.setItem('gender', fashion?.gender);

                    setMergedItems(mergingItems);
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [fashion]);

    return (
        <>
            {pathname.split('/')[1] === 'f'
                ? (
                    <div style={{ position: 'absolute', marginTop: '-10px', marginLeft: '10px' }}>
                        {/* {isLoading ? (
                            <Container className='center-items equipment equipment-fashion'>
                                <div className="flex">
                                    <div className="logo-loading-div" style={{ top: '170px', left: '135px' }}>
                                        <img src={Dragon} alt="" className="logo--loading-dragon" />
                                        <img src={Cog} alt="" className="logo-loading-cog" />
                                    </div>
                                </div>
                            </Container>
                        ) : ( */}
                        <div>
                            {mergedItems !== undefined && (
                                <FashionSavedInner items={mergedItems} char={fashion} embed={true} slider={true} />
                            )}
                        </div>
                        {/* )} */}
                    </div>
                )
                : <div className='flex center'>
                    {fashion && (
                        <div className={`equipment-save ${fashion.profession.toLowerCase()}-lightning-border`} style={{ marginRight: '4px' }}>
                            <div className="dropdown">
                                {isLoading ? (
                                    <div className='logo-equipment-width'>
                                        <div className="flex center">
                                            <div className="logo-loading-div-equipment">
                                                <img src={Dragon} alt="" className="logo--loading-dragon" />
                                                <img src={Cog} alt="" className="logo-loading-cog" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <Container className='spec-box logo-equipment-width' style={{ marginTop: 0 }}>
                                        <div>
                                            <BackButton />
                                            <div className='flex center' style={{ marginLeft: '50px' }}>
                                                <div style={{ fontSize: '30px', marginLeft: '-10px' }}>{fashion.name}</div>
                                                <div className='center-land'>
                                                    <img
                                                        className=''
                                                        style={{ width: '40px', height: '40px' }}
                                                        src={specIcons[fashion.profession.toLowerCase()]}
                                                        alt=""
                                                    />
                                                </div>
                                            </div>
                                            <div>
                                                <div style={{ margin: '0  0 10px 0' }}>{fashion?.gender} {fashion?.race} {fashion?.profession}</div>
                                            </div>
                                            <div className="dropdown">
                                            </div>
                                            {mergedItems !== undefined &&
                                                <FashionSavedInner items={mergedItems} char={fashion} embed={false} slider={true} />
                                            }
                                        </div>
                                    </Container>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            }
        </>

    );
}

export default FashionSaved;
