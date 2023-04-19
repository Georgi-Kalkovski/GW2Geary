import { Container } from 'react-bootstrap';
import SpecBox from './SpecBox';

function BuildBox({ char, tab }) {
    const builds = char.build_tabs;
    let build = builds.find(x => x.is_active === true).build;
    if (tab) {
        build = builds[tab - 1].build;
    }

    return (
        <Container className='spec-box'>
            {build.specializations &&
                <>
                    <SpecBox spec={build.specializations[0]}/>
                    <SpecBox spec={build.specializations[1]}/>
                    <SpecBox spec={build.specializations[2]}/>
                </>
            }
        </Container>
    );
}

export default BuildBox;