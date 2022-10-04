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
      <div className={"${showDropDown ? 'dropdown' : 'dropdown active'} items-start text-black absolute z-1000 mt-6 left-0 shadow-lg bg-white rounded-md py-2 px-1 flex flex-col gap-2"}>
        {users.map(
          (username: User, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(username);
                }}
                className='hover:bg-black/10 p-1 rounded-md w-full text-start'
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
