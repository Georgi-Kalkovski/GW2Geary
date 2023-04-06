import { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

function BuildDropdown() {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  return (
    <Dropdown show={showMenu} onToggle={handleButtonClick}>
      <Dropdown.Toggle id="dropdown-basic-button" variant="secondary">
        Dropdown button
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default BuildDropdown;
