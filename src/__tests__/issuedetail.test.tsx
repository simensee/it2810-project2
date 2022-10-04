
import React, { useContext } from "react";
import App from "../App";
import renderer from "react-test-renderer";
import {DataContext} from "../Resources/DataContext";
import { MergeRequest, User } from "../Resources/ResponseTypes";
import MergeDetailCard from "../Components/DetailCards/MergeDetailCard";

const mockData = {
    data: {  
        id: 78173,
        title: "Fix bugs usercard",
        
    }
}