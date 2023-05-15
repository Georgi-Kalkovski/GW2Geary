import React from 'react';

function Logout({ handleLogout }) {
  const handleLogoutClick = () => {
    localStorage.removeItem('isLoggedIn');

    handleLogout();
  };

  return (
    <div>
      <h1>Logout</h1>
      <button onClick={handleLogoutClick}>Logout</button>
    </div>
  );
}

export default Logout;
