import React, { useContext } from "react";
import App from "../App";
import renderer from "react-test-renderer";
import {DataContext} from "../Resources/DataContext";
import { MergeRequest, User } from "../Resources/ResponseTypes";
import MergeDetailCard from "../Components/DetailCards/MergeDetailCard";
import ReactDOM from "react-dom";
import NavRouter from "../Components/Router/NavRouter";
import UsersPage from "../Components/Pages/UsersPage";
import ProgressPage from "../Components/Pages/ProgressPage";


it('UserPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<UsersPage />, div);
    ReactDOM.unmountComponentAtNode(div);

})

it('ProgressPage renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ProgressPage />, div);
    ReactDOM.unmountComponentAtNode(div);

})