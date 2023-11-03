import React from 'react';
import { Container, Col } from "react-bootstrap";
import DyesTooltip from "./DyesTooltip";
import './Fashion.css';

function Dyes({ item }) {
    const nonNullDyes = item?.dyes?.filter(dye => dye !== undefined);

    return (
        <Container className='flex'>
            {/* Dyes */}
            {nonNullDyes ? (
                <div>
                    {nonNullDyes.length === 0 &&
                        <div className="item-box box-gray">
                        </div>
                    }
                    {nonNullDyes.length === 1 &&
                        <div className="item-box box-gray">
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[0]} box={'box-big'} />
                            </Col>
                        </div>
                    }
                    {nonNullDyes.length === 2 &&
                        <Container className="item-box box-gray flex column">
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[0]} box={'box-long'} />
                            </Col>
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[1]} box={'box-long'} />
                            </Col>
                        </Container>
                    }
                    {nonNullDyes.length === 3 &&
                        <Container className="item-box box-gray flex column">
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[0]} box={'box-long'} />
                            </Col>
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[1]} box={'box'} />
                                <DyesTooltip dye={nonNullDyes[2]} box={'box'} />
                            </Col>
                        </Container>
                    }
                    {nonNullDyes.length === 4 &&
                        <Container className="item-box box-gray flex column">
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[0]} box={'box'} />
                                <DyesTooltip dye={nonNullDyes[1]} box={'box'} />
                            </Col>
                            <Col className="flex">
                                <DyesTooltip dye={nonNullDyes[2]} box={'box'} />
                                <DyesTooltip dye={nonNullDyes[3]} box={'box'} />
                            </Col>
                        </Container>
                    }
                </div>
            )
                : <div className="item-box">
                </div>}
        </Container>
    )
}

export default Dyes;