import React, { useEffect, useState } from 'react';
import { User } from '../../Resources/ResponseTypes';

type DropDownProps = {
  users: User[];
  showDropDown: boolean;
  toggleDropDown: Function;
  userSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  users,
  userSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param user  The selected city
   */
  const onClickHandler = (username: User): void => {
    userSelection(username);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {users.map(
          (username: User, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(username);
                }}
              >
                {username.username}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
