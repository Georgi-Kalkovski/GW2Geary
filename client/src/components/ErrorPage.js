import Dragon from '../dragon.svg';
import Cog from '../cog.svg';
import Googly from '../googly-eye.png';
function ErrorPage() {
    return (
        <>

            <div className="flex center">
                <div style={{ filter: 'drop-shadow(4px 2px 0px rgba(0, 0, 0, 1))', paddingTop: '50px', fontFamily: 'GW2Font', textAlign: 'center', fontSize: '60px', transform: 'translate(0%, 75%)' }}>
                    <div >404</div>
                    <div style={{ color: '#aa0404' }}>Page Not Found</div>
                </div>
            </div>
            <div className="flex center">
                <div className="logo-loading-div">
                    <img src={Googly} alt="" className="logo-loading-googly" />
                    <img src={Dragon} alt="" className="logo--loading-dragon" />
                    <img src={Cog} alt="" className="logo-loading-cog" />
                </div>
            </div>
        </>
    );
}

export default ErrorPage;