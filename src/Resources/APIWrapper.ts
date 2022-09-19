import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Action, User } from "./ResponseTypes";

const stringUrl: string = 'https://gitlab.stud.idi.ntnu.no/api/v4/projects/17475/';
const APIToken: string = 'glpat-cygbLETJKv1wXaNyMtXS';


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

    if (isLoading) console.log('fetching');    

    if (isError) {
        console.log('An error occurred '+ error);
    } 
    const userResp: User[] = data?.map((us: any) => {
        const dunno: User = us;
        return dunno;
    })
    return userResp;
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

    if (isError) {
        console.log('An error occurred '+ error);
    } 

    const eventResp: Action[] = data?.map((action: any) => {
        const dunno: Action = action;
        return dunno;
    })    
    return eventResp;
}
