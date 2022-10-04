import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest, User } from '../../Resources/ResponseTypes';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CommitList from '../ProgressPageComponents/CommitList';
import MergeRQList from '../ProgressPageComponents/MergeRQList';
import DropDown from '../Components/Dropdown';
import TabButton from '../ProgressPageComponents/TabButton';
import Overview from '../ProgressPageComponents/Overview';

function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

const ProgressPage = () => {

  const [isLoaded, setIsLoaded] = useState(false);

  const [startDate, setStartDate] = useState(sessionStorage.getItem('startDate') ?? (new Date()).toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(sessionStorage.getItem('endDate') ?? (new Date()).toISOString().split('T')[0]);
  const [username, setUsername] = useState(sessionStorage.getItem('user') ?? "");
  const [displayOption, setdisplayOption] = useState(sessionStorage.getItem('displayOption') ?? 'Overview');

  useEffect(() => {
    updateResult();
  }, [username]);

  const updateParams = async () => {
    sessionStorage.setItem("startDate", startDate);
    setStartDate(startDate);
    sessionStorage.setItem("endDate", endDate);
    setEndDate(endDate);
  }

  const handleOptionSelect = (option: string) => {
    setdisplayOption(option);
    sessionStorage.setItem('displayOption', option);
  }

  const ctx = useContext(DataContext);

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
    setUsername(user.username ?? '');
    sessionStorage.setItem("user", user.username ?? '');
  };

  const updateResult = async () => {
    await updateParams();
    const filteredMergeList: MergeRequest[] = ctx.mergeData.filter((m) => {
      if (
        m.created_at!.split("T")[0] >= startDate &&
        m.created_at!.split('T')[0] <= endDate &&
        m.author?.username == username) {
        return m;
      }
    });
    setRenderedMergeList(filteredMergeList);

    const filteredCommits: Commit[] = ctx.commitData.filter((c) => {
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
        return <Overview></Overview>;
      case 'Merge requests':
        return <MergeRQList mergeRequestList={renderedMergeList} />;
      case 'Commits':
        return <CommitList commitList={renderedCommitList} />;
      default:
        return <></>
    }
  }

  return (
    <div className="w-full h-full flex flex-col gap-2 p-2 lg:flex lg:flex-col lg:gap-4">
      <div className="flex flex-col p-2 gap-1 lg:flex lg:flex-row w-full lg:items-center lg:justify-between lg:px-2 lg:py-2 bg-white rounded-md">
        <div className='flex flex-row gap-3 pl-2'>
          <TabButton
            label='Overview'
            selected={displayOption === 'Overview'}
            handleCLick={(l) => handleOptionSelect(l)} />
          <TabButton
            label='Merge requests'
            selected={displayOption === 'Merge requests'}
            handleCLick={(l) => handleOptionSelect(l)} />
          <TabButton
            label='Commits'
            selected={displayOption === 'Commits'}
            handleCLick={(l) => handleOptionSelect(l)} />
        </div>
        <form
          className='flex flex-row justify-between pr-5 '
          onSubmit={(e) => e.preventDefault()}>
          <div className='order-last flex items-center'>
            <button
              className={'relative px-7 py-2 rounded-md text-white text-sm bg-blue-700 cursor-pointer hover:bg-blue-800 ${showDropDown ? "active" : undefined}'}
              onClick={(): void => toggleDropDown()}
              onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
                dismissHandler(e)
              }
            >
              <div>
                {(username !== '') ? username : "Select ..."}
              </div>
              {showDropDown && (
                <DropDown
                  users={ctx.usersData}
                  showDropDown={false}
                  toggleDropDown={(): void => toggleDropDown()}
                  userSelection={userSelection}
                />
              )}
            </button>
          </div>
          <div className='lg:flex lg:flex-row lg:gap-2 lg:px-2'>
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