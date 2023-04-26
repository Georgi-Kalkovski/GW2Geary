import { Container } from 'react-bootstrap';
import Traits from './Traits';
import Skills from './Skills';
import Template from './Template';

function BuildBox({ char, tab }) {
    const builds = char.build_tabs;
    let build = builds.find(x => x.is_active === true).build;
    if (tab) {
        build = builds[tab - 1].build;
    }
    return (
        <Container className='spec-box'>
            {build.specializations && build.skills && build.aquatic_skills &&
                <>
                    <Skills skills={build.skills} water_skills={build.aquatic_skills} />
                    <Traits spec={build.specializations[0]} />
                    <Traits spec={build.specializations[1]} />
                    <Traits spec={build.specializations[2]} />
                    <Template buildInput={build} />
                </>
            }
        </Container>
    );
}

export default BuildBox;