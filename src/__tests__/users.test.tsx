import React, { useContext } from "react";
import App from "../App";
import renderer from "react-test-renderer";
import {DataContext} from "../Resources/DataContext";
import { MergeRequest, User } from "../Resources/ResponseTypes";
import MergeDetailCard from "../Components/DetailCards/MergeDetailCard";



const mockData = {
   data: {  
      id: "62388",
   }
 }

 

 describe('App component', () => {
   it('it works', async () => {
     let mergeRequest : MergeRequest = ({
         id: 62388
     });

      
    const tree : any = renderer.create(<MergeDetailCard focusMerge={mergeRequest} />);
    
     
    expect(tree.toJSON()).toMatchSnapshot()
    

    
    // Act

    // Assert
    
 });
});

