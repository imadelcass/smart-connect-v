import React from 'react';
import { Link } from 'react-router-dom';

const SearchUsers = ({
  usersStyle,
  displayUsers,
  filterUsers,
  filtredUsers,
  inputRef,
}) => {
  return (
    <div className='SearchUsers'>
      <input
        placeholder='Search'
        className='SearchUsers__input'
        type='text'
        onClick={displayUsers}
        onKeyUp={filterUsers}
      />

      <div className='SearchUsers__users' ref={inputRef} style={usersStyle}>
        {filtredUsers.map(user => {
          return (
            <Link className='SearchUsers__userLink'
            key={user._id} to={`/users/${user._id}`}>
              <div className='SearchUsers__userStyle'>
                <h4 className='SearchUsers__userName'>{user.name}</h4>
                <img className='SearchUsers__userImg' src={user.image} />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SearchUsers;
