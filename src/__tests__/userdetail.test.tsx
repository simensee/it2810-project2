import React, { useContext } from "react";
import App from "../App";
import renderer from "react-test-renderer";

import { User } from "../Resources/ResponseTypes";
import UserDetailCard from "../Components/DetailCards/UserDetailCard";





 

 describe('User component', () => {
   it('it works', async () => {
     let user : User = ({
         id: 62388,
         name: "Simen Seeberg-Rommetveit"
     });

      
    const tree : any = renderer.create(<UserDetailCard focusUser={user} />);
    
     
    expect(tree.toJSON()).toMatchSnapshot()
    
    
 });
});

