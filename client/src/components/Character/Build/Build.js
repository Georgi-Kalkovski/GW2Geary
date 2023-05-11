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
                    <Skills skills={tab.skills} water_skills={tab.aquatic_skills} prof={tab.profession} />
                    <Traits spec={tab.specializations[0]} prof={tab.profession} />
                    <Traits spec={tab.specializations[1]} prof={tab.profession} />
                    <Traits spec={tab.specializations[2]} prof={tab.profession} />
                    <br />
                    <Template buildInput={tab} />
                </>
            }
        </Container>
    );
}

export default Build;