import React, { useContext, useState } from 'react'
import { DataContext } from '../../Resources/DataContext'
import { Branch } from '../../Resources/ResponseTypes'

const BranchesPage = () => {

  const ctx = useContext(DataContext);
  const branchList: Branch[] = ctx.branchesData;

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState(branchList);

  const searchItems = (searchInput: string) => {
    console.log(searchInput);
    setSearchInput(searchInput);
    const results = branchList.filter((branch) => {
      console.log(branch.name);
      if (searchInput === "") {
        return branch;
      }
      return branch.name.toLowerCase().includes(searchInput.toLowerCase());
    });
    setSearchResults(results);
    }
    

  return (
    <div>
        <h1>Branches</h1>
        <div className='flex flex-row justify-left'>
          <input 
          type='text' 
          className='border-2 border-black rounded-md p-2' 
          placeholder='Search for a branch'
          onChange={(e) => searchItems(e.target.value)}
          />
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
            onClick={() => console.log("Dette er branchList", branchList)}>Search</button>
          {/* In the div below: Get the branch cards that you have searched for */}
          <div>
            
          </div>
        </div>
        <div>
          {searchResults.map((b) => {
            return <div key={b.id} className='p-8 hover:outline flex pointer-events-auto'>
              {b.name}
            </div>
            })}
          </div>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
             eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam
              voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione 
              voluptatem sequi nesciunt. 
              </p>
              <p>
                Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci 
                velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut 
                enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi 
                consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
                vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
              </p>
              <button onClick={() => ctx.fetchBranches()}>fetch</button>
    </div>
  )
}

export default BranchesPage