import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest, User } from '../../Resources/ResponseTypes';
import MergeDetailCard from '../DetailCards/MergeDetailCard';
import DatePicker from 'react-datepicker';
import { DropDownList } from "@progress/kendo-react-dropdowns";
import Dropdown from '../Components/Dropdown';
import "react-datepicker/dist/react-datepicker.css";
import CommitList from '../ProgressPageComponents/CommitList';
import MergeRQList from '../ProgressPageComponents/MergeRQList';



function dateIsValid(date: Date) {
  return !Number.isNaN(new Date(date).getTime());
}

const ProgressPage = () => {
  const [focusMergeRequest, setFocusMergeRequest] = useState<MergeRequest>({
    id: 0,
  });

  const [focusCommit, setFocusCommit] = useState<Commit>({
    id: "",
  });

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
  const [displayCommits, setDisplayCommits] = useState(false);

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

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div className="flex flex-row w-full items-center justify-between px-4 bg-white rounded-md">
        <button onClick={() => setDisplayCommits(!displayCommits)}>
          toggle
        </button>
        <form
          className='flex'
          onSubmit={handleSubmit}>
          <div className='flex'>
            <DatePicker
              className='right-auto top-11 transform-none !important'
              selected={dateIsValid(new Date(startDate)) ? new Date(startDate) : new Date()}
              onChange={(date: Date) => setStartDate(date.toISOString().split('T')[0])}
              onCalendarClose={() => updateResult()} />
            <DatePicker
              selected={dateIsValid(new Date(endDate)) ? new Date(endDate) : new Date()}
              onChange={(date: Date) => setEndDate(date.toISOString().split('T')[0])}
              onCalendarClose={() => updateResult()} />
          </div>
          <button
            className={'relative font-normal text-left whitespace-no-wrap align-middle select-none text-sm leading-normal rounded cursor-pointer ${showDropDown ? "active" : undefined}'}
            onClick={(): void => toggleDropDown()}
            onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
              dismissHandler(e)
            }
          >
            <div>{username ? "Select: " + username : "Select ..."} </div>
            {showDropDown && (
              <Dropdown
                users={userList}
                showDropDown={false}
                toggleDropDown={(): void => toggleDropDown()}
                userSelection={userSelection}
              />
            )}
          </button>
        </form>
      </div>
      <div className='w-full h-full bg-white rounded-md overflow-auto'>
        {(displayCommits) ? 
        <CommitList commitList={renderedCommitList}/> 
        :
        <MergeRQList mergeRequestList={renderedMergeList}/>
      }
      </div>
    </div>
  )
}

export default ProgressPage