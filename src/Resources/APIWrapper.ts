import { useQuery } from "@tanstack/react-query";
import userEvent from "@testing-library/user-event";
import React from "react";
import UsersPage from "../Components/Pages/UsersPage";
import { Action, User, Commit } from "./ResponseTypes";

const stringUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17475/';
const APIToken: string = 'glpat-cygbLETJKv1wXaNyMtXS';

// Fetcher informasjon om bruker fra API
// * id
// * username
// * name
// * state
// * avatar_url
// * web_url

export function FetchUsers(): User[] {
    const usersUrl = stringUrl.concat('users');
    let fetchUsersUrl: URL = new URL(usersUrl);
    const {isLoading, isError, data, error} = useQuery(['userData'], () => 
        fetch(fetchUsersUrl, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ APIToken,
            })}).then(res => res.json())
    );

    console.log(data);

    if (isLoading) console.log('fetching');    

    // Does not catch 40x responses
    if (isError) {
        console.log('An error occurred '+ error);
    } 
    const response: User[] = data;
    return response;
}

export function FetchEvents(): Action[] {
    const usersUrl = stringUrl.concat('events');
    let fetchUsersUrl: URL = new URL(usersUrl);
    const {isLoading, isError, data, error} = useQuery(['eventData'], () => 
        fetch(fetchUsersUrl, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ APIToken,
            })}).then(res => res.json())
    );

    if (isLoading) console.log('fetching');    

    // Does not catch 40x responses
    if (isError) {
        console.log('An error occurred '+ error);
    } 
    
    const response: Action[] = data;   
    return response;
}

export function FetchCommits(): Commit[] {
    const commitUrl = stringUrl.concat('repository/commits');
    let fetchUsersUrl: URL = new URL(commitUrl);
    const {isLoading, isError, data, error} = useQuery(['commitData'], () => 
        fetch(fetchUsersUrl, {
            method: 'GET', 
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ APIToken,
            })}).then(res => res.json())
    );
    if (isLoading) console.log('fetching');    

    // Does not catch 40x responses
    if (isError) {
        console.log('An error occurred '+ error);
    } 
    
    const response: Commit[] = data;   
    return response;
}

export function FetchCommitsUser(user: User): number {
    const resp: Commit[] | Commit = FetchCommits();
    let n: number = 0;
    for (let i=0; i < resp.length; i++){
        if(user.username === resp[i].author_name){
            n += 1
        }
    }
    return n;
}

