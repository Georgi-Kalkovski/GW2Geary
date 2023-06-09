import React, { useState, useEffect } from 'react';
import { Container, Col } from 'react-bootstrap';
import fetchData from '../../fetchData';
import Trait from './Trait';

function Traits({ spec, prof }) {
  const [specialization, setSpecialization] = useState(null);
  const [traits, setTraits] = useState({ min: null, maj: null });

  useEffect(() => {
    (async () => {
      try {
        const char = await fetchData('specializations', spec.id);
        const [min, maj] = await Promise.all([
          fetchData('traits', char.minor_traits.join(',')),
          fetchData('traits', char.major_traits.join(','))
        ]);
        setSpecialization(char);
        setTraits({ min, maj });
      } catch (error) {
        console.error(error);
      }
    })();
  }, [spec.id]);

  return (
    <>
      {specialization && traits.min && traits.maj && (
        <>
          <Col className="traits-box">
            <Trait
              traitMin={traits.min}
              traitMaj={traits.maj}
              traitsActive={spec.traits}
              prof={prof}
            />
          </Col>
          <Container className="cropped-spec-img-div">
            <img
              className="cropped-spec-img"
              src={specialization.background}
              alt={specialization.name}
            />
          </Container>
        </>
      )}
    </>
  );
}

export default Traits;
