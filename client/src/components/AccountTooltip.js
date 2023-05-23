import React from 'react';
import { usePopperTooltip } from 'react-popper-tooltip';
import Info from '../components/Character/info.svg';

function AccountTooltip({ account }) {
    const {
        getArrowProps,
        getTooltipProps,
        setTooltipRef,
        setTriggerRef,
        visible,
    } = usePopperTooltip({ placement: 'right' });

    return (
        <>
            <img className="info-size white-info" ref={setTriggerRef} src={Info} alt={account.accountName + 'img'} />

            {visible && (
                <div
                    ref={setTooltipRef}
                    {...getTooltipProps({ className: 'tooltip-container' })}
                >
                    <div className='account-popup border-basic box-basic'>
                        <div><span className="yellow-highlight">Mastery Points: </span>{account.mastery_points}</div>
                        <div><span className="yellow-highlight">Fractal Level: </span>{account.fractal_level}</div>
                        <div><span className="yellow-highlight">WvW Rank: </span>{account.wvw_rank}</div>
                        <div><span className="yellow-highlight">World: </span>{account.world}</div>
                    </div>
                    <div {...getArrowProps({ className: 'tooltip-arrow' })} />
                </div>
            )}
        </>
    );
}

export default AccountTooltip;