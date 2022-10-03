import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../Resources/DataContext';
import { Commit, MergeRequest, User } from '../../Resources/ResponseTypes';
import MergeDetailCard from '../DetailCards/MergeDetailCard';
import DatePicker from 'react-datepicker';
import { DropDownList } from "@progress/kendo-react-dropdowns"; 
//import { Dropdown } from 'flowbite-react';
import Dropdown from '../Components/Dropdown';
import "react-datepicker/dist/react-datepicker.css";



function dateIsValid(date:Date) {
  return !Number.isNaN(new Date(date).getTime());
}
console.log("hello")
const ProgressPage = () => {

  const [render, setRender] = useState<number>(1);
  const [displayMergeDetails, toggleMergeDetails] = useState(false);
  const [focusMergeRequest, setFocusMergeRequest] = useState<MergeRequest>({
    id: 0,
  });

  const [displayCommitDetails, toggleCommitDetails] = useState(false);
  const [focusCommitRequest, setFocusCommitRequest] = useState<MergeRequest>({
    id: 0,
  });
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (render === 1) {
      setRender(0);
    }
    else { 
      setRender(1);
      
    }
    
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
    localStorage.setItem("user", username);
    
    

  }
  
  
  
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [username, setUsername] = useState("");

  const ctx = useContext(DataContext);
  const mergeList: MergeRequest[] = ctx.mergeData;
  const commitList: Commit[] = ctx.commitData;
  const userList: User[] = ctx.usersData;

  const [renderedMergeList, setRenderedMergeList] = useState<MergeRequest[]>([]);
  const [renderedCommitList, setRenderedCommitList] = useState<Commit[]>(commitList);
 
  
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
    setUsername(user.username?user.username:"");
  };

  useEffect(() => {
    
    const startDateStr: string = localStorage.getItem('startDate')!;
    const endDateStr: string = localStorage.getItem('endDate')!;
    const name: string = localStorage.getItem('user')!;
    console.log("useeffect");
    if (startDateStr == "") {
      setStartDate((new Date()).toISOString());
    }
    else {  
      setStartDate(startDateStr);
     
    }
    if (endDateStr == "") {
      setEndDate((new Date()).toISOString());
    }
    else { 
      setEndDate(endDateStr);
    }
    
    
    setUsername(name);
    
    
  
    updateRender();

  }, [username]);

  const updateRender = () => {
    
    setRenderedMergeList([]);
    mergeList.map ((merge: MergeRequest) => {
      
        if (merge.created_at!.split("T")[0] >= startDate.split("T")[0] && merge.created_at!.split("T")[0] <= endDate.split("T")[0] && merge.author?.username == username) {
        
          setRenderedMergeList(mergeList => [...mergeList, merge]);
          console.log("Success!");
        }
      
      console.log(renderedMergeList);
    });


    /*for (let i = 0; i < mergeList.length; i++) {
      if (
        mergeList[i].createdAt! >= startDate &&
        mergeList[i].createdAt! <= endDate &&
        mergeList[i].author!.username! === username
      ) {
        console.log("Inside loop");
        console.log("Username" + mergeList[i].author!.username);
        console.log("Created at" + mergeList[i].createdAt);
        setRenderedMergeList(mergeList => [...mergeList, mergeList[i]]);
      }
    }*/

    
    for (let i = 0; i < commitList.length; i++) {
      if (
        //commitList[i].createdAt! >= startDate &&
        //commitList[i].committedDate! <= endDate &&
        commitList[i].author_email!.split('@')[0] === username
      ) {
        setRenderedCommitList(commitList => [...commitList, commitList[i]]);
      }
    }
    console.log(renderedMergeList);
  };
  
  
  return (
    
    
    <div className="flex flex-row items-end">
      <div className="flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
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
      
      
      
      <div>
      
      <DatePicker  className='right-auto top-11 transform-none !important' selected={dateIsValid(new Date(startDate))? new Date(startDate) : new Date()} onChange = {(date:Date) => setStartDate(date.toISOString())}/>
      <DatePicker  selected={dateIsValid(new Date(endDate))? new Date(endDate) : new Date()} onChange = {(date:Date) => setEndDate(date.toISOString())}/>
      
      </div>
      
      <input type="submit" value="Submit" />
     
    </form>

    <div className='grid grid-cols-3 gap-4 '>

      <div className='col-span-2 grid grid-cols-3 gap-4 '>
        
        {renderedMergeList.map((m, i) => {
          // Lise sett in usercard her :)
          console.log(m.id);
          return <div key={m.id} className='p-8 hover:outline flex pointer-events-auto' onClick={() => {
            setFocusMergeRequest(m)
          }}>
            {m.id} - {m.title} - {m.author!.username!}
          </div>
        })}
      </div>
      <div className='w-full'>
        <MergeDetailCard 
        focusMerge={focusMergeRequest}
        />
      </div>
    </div>
  </div>
  </div>
  )
}

export default ProgressPage