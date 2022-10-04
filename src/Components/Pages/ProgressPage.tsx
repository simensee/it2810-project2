import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest, User } from '../../Resources/ResponseTypes';
import MergeDetailCard from '../DetailCards/MergeDetailCard';
import DatePicker from 'react-datepicker';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import "react-datepicker/dist/react-datepicker.css";
import CommitList from '../ProgressPageComponents/CommitList';
import MergeRQList from '../ProgressPageComponents/MergeRQList';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../Router/AppRoutes';
import DropDown from '../Components/Dropdown';
import { Button } from '@mui/material';
import TabButton from '../ProgressPageComponents/TabButton';

function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

const ProgressPage = () => {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("startDate", startDate);
    setStartDate(startDate);
    localStorage.setItem("endDate", endDate);
    setEndDate(endDate);
    localStorage.setItem("user", username);
    setUsername(username);
  }

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [username, setUsername] = useState("");
  const [displayOption, setdisplayOption] = useState('Overview');

  const handleOptionSelect = (option: string) => {
    setdisplayOption(option);
    sessionStorage.setItem('displayOption', option);
  }

  const ctx = useContext(DataContext);
  const mergeList: MergeRequest[] = ctx.mergeData;
  const commitList: Commit[] = ctx.commitData;
  const userList: User[] = ctx.usersData;

  const [renderedMergeList, setRenderedMergeList] = useState<MergeRequest[]>([]);
  const [renderedCommitList, setRenderedCommitList] = useState<Commit[]>([]);

  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  const userSelection = (user: User): void => {
    setUsername(user.username ? user.username : "");
  };

  useEffect(() => {
    setdisplayOption(sessionStorage.getItem('displayOption') ?? 'Overview');
    const startDateStr: string = localStorage.getItem('startDate') ?? (new Date()).toISOString().split('T')[0];
    setStartDate(startDateStr);
    const endDateStr: string = localStorage.getItem('endDate') ?? (new Date()).toISOString().split('T')[0];
    setEndDate(endDateStr);
    const name: string = localStorage.getItem('user') ?? "";
    setUsername(name);
    updateResult();
  }, [username]);

  const updateResult = () => {
    const filteredMergeList: MergeRequest[] = mergeList.filter((m) => {
      if (
        m.created_at!.split("T")[0] >= startDate &&
        m.created_at!.split('T')[0] <= endDate &&
        m.author?.username == username) {
        return m;
      }
    });
    setRenderedMergeList(filteredMergeList);

    const filteredCommits: Commit[] = commitList.filter((c) => {
      if (
        c.committed_date!.split("T")[0] >= startDate.split("T")[0] &&
        c.committed_date!.split("T")[0] <= endDate.split("T")[0] &&
        c.author_email!.split('@')[0] === username
      ) {
        return c;
      }
    });
    setRenderedCommitList(filteredCommits);
  };

  const displayChoosen = (option: string): JSX.Element => {
    switch (option) {
      case 'Overview':
        return <div className='w-full'>Overview!</div>;
      case 'Merge requests':
        return <MergeRQList mergeRequestList={renderedMergeList} />;
      case 'Commits':
        return <CommitList commitList={renderedCommitList} />;
      default:
        return <></>
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row w-full items-center justify-between px-2 py-2 bg-white rounded-md">
        <div className='flex flex-row gap-3 pl-2'>
        <TabButton 
          label='Overview'
          selected={displayOption === 'Overview'}
          handleCLick={(l) => handleOptionSelect(l)}/>
          <TabButton 
          label='Merge requests'
          selected={displayOption === 'Merge requests'}
          handleCLick={(l) => handleOptionSelect(l)}/>
          <TabButton 
          label='Commits'
          selected={displayOption === 'Commits'}
          handleCLick={(l) => handleOptionSelect(l)}/>
        </div>
        <form
          className='flex'
          onSubmit={handleSubmit}>
          <button
            className={'relative px-7 rounded-md text-white text-sm bg-blue-700 cursor-pointer hover:bg-blue-800 ${showDropDown ? "active" : undefined}'}
            onClick={(): void => toggleDropDown()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            <div>
              {username ? username : "Select ..."}
            </div>
            {showDropDown && (
              <DropDown
                users={userList}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                userSelection={userSelection}
              />
            )}
          </button>
          <div className='flex flex-row gap-2 px-2'>
            <span className='flex items-center'>Fra: </span>
            <DatePicker
              className='rounded-md'
              selected={dateIsValid(new Date(startDate)) ? new Date(startDate) : new Date()}
              onChange={(date: Date) => setStartDate(date.toISOString().split('T')[0])}
              onCalendarClose={() => updateResult()} />
            <span className='flex items-center'>Til: </span>
            <DatePicker
              className='rounded-md'
              selected={dateIsValid(new Date(endDate)) ? new Date(endDate) : new Date()}
              onChange={(date: Date) => setEndDate(date.toISOString().split('T')[0])}
              onCalendarClose={() => updateResult()} />
          </div>
        </form>
      </div>
      {displayChoosen(displayOption)}
    </div>
  )
}

export default ProgressPage