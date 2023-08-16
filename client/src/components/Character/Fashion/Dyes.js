import { Container, Col, Row } from "react-bootstrap";
import DyesTooltip from "./DyesTooltip";
import './Dyes.css';

function Dyes({ item }) {
    const nonNullDyes = item?.dyes?.filter(dye => dye !== undefined);

    return (
        <Container className='flex'>
            {/* Dyes */}
            {nonNullDyes && (
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
                // <Col >
                //     {item.dyes.map((dye, index) => (
                //         <Row key={index} >
                //             {dye != null
                //                 ? <div className='flex'>
                //                     <div style={{
                //                         margin: '1px 5px 1px 1px',
                //                         height: '15px',
                //                         width: '15px',
                //                         border: '0.2px solid gray',
                //                         backgroundColor: `rgb(${dye.cloth.rgb[0]}, ${dye.cloth.rgb[1]}, ${dye.cloth.rgb[2]})`
                //                     }}>
                //                     </div>
                //                     <span>{dye.name}</span>
                //                 </div>
                //                 : ''
                //             }</Row>
                //     ))}
                // </Col>
            )}
        </Container>
    )
}

export default Dyes;