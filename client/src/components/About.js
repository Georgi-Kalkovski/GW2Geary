import github from './img/github.svg';
import discord from './img/discord.svg';
import linkedin from './img/linkedin.svg';

function About() {
    return (
        <div className='flex center column'>
            <div className='about-box' style={{ textAlign: 'left', alignItems: 'right' }}>
            <h3>Privacy Notice</h3>
            TODO....
            <h3>Acknowledgements</h3>
                <div className="line"></div>
                © ArenaNet LLC. All rights reserved.
                NCSOFT, ArenaNet, Guild Wars, Guild Wars 2: Heart of Thorns, Guild Wars 2: Path of Fire, and Guild Wars 2: End of Dragons
                and all associated logos, designs, and composite marks are trademarks or registered trademarks of NCSOFT Corporation.
                All other trademarks are the property of their respective owners.
                <span><br /></span>
                <h3>Design and coding by <span className='yellow-highlight'>Terter.4125</span></h3>
                <div className="line"></div>
                <div className='flex'>
                    <a className="contact-svg" href='https://discord.com/users/242250226545590274'><img src={discord} /></a>
                    <a className="contact-svg" href='https://www.linkedin.com/in/georgi-kalkovski/'><img src={linkedin} /></a>
                    <a className="contact-svg" href='https://github.com/Georgi-Kalkovski'><img src={github} /></a>
                </div>
            </div>
        </div>);
}

export default About;