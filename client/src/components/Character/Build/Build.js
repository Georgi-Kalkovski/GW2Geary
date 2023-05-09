import { Container } from 'react-bootstrap';
import Traits from './Traits';
import Skills from './Skills';
import Template from './Template/Template';
import './Build.css';

function Build({ tab }) {
    return (
        <Container className='spec-box'>
            {tab.specializations && tab.skills && tab.aquatic_skills &&
                <>
                    <Skills skills={tab.skills} water_skills={tab.aquatic_skills} />
                    <Traits spec={tab.specializations[0]} />
                    <Traits spec={tab.specializations[1]} />
                    <Traits spec={tab.specializations[2]} />
                    <br />
                    <Template buildInput={tab} />
                </>
            }
        </Container>
    );
}

export default Build;