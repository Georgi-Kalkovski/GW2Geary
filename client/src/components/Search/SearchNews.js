import { Container, Row, Col } from "react-bootstrap";
function SearchNews() {
    return (
        <Container className="flex center">
            <Col className="home-empty-search-box">
                <Row className='home-welcome' style={{ fontSize: '25px' }}>
                    Latest News
                </Row>
                <Row className='search-news'>

                    <div>
                        <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>28.09.2023</span> -
                        <span style={{ color: '#aa0404' }}> Removed invalid old API keys</span>.
                        If anyone is affected please register a new API key.
                    </div>

                    <div>
                        <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>26.09.2023</span> -
                        Added a <span className="yellow-highlight"> button </span>
                        on the right of the <span className="yellow-highlight"> search bar </span>
                        allowing the users to search by
                        <span className="yellow-highlight"> race</span> and
                        <span className="yellow-highlight"> profession</span>.
                    </div>

                    <div>
                        <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>30.08.2023</span> -
                        Added a button/s allowing the users to
                        <span className="yellow-highlight"> copy</span> the
                        <span className="yellow-highlight"> chat codes</span> of the
                        <span className="yellow-highlight"> items</span> or their
                        <span className="yellow-highlight"> skins</span>.
                    </div>

                    <div>
                        <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>28.08.2023</span> -
                        Now the <span className="yellow-highlight"> fashion mode </span> can preview <span className="yellow-highlight"> wiki images</span>.
                    </div>

                    <div>
                        <span className='yellow-highlight' style={{ marginBlockEnd: '0em', marginBlockStart: '0em', }}>18.08.2023</span> -
                        Now the user can choose between fashion mode or normal mode preview on the characters.
                        Happy Fashion Wars everybody! <span style={{ color: '#9fc3f0' }}>o/</span>
                    </div>

                </Row>
            </Col>
        </Container>
    )
}

export default SearchNews;