import React from "react";
import { User } from "../Resources/ResponseTypes";
import UsersPage from "./Pages/UsersPage";

type UserCardProps = {
    user: User;
    handleClick: (u: User) => void ;
    isSelected: boolean;
};



const UserCard = ({user, handleClick, isSelected}: UserCardProps) => {

    

    return (
        <div 
        className="max-witdh-xs w-48 h-56 bg-indigo-100 hover:bg-indigo-50 p-5 pt-6 hover:cursor-pointer rounded-md"
        onClick={() => handleClick(user)}
        style={{backgroundColor: isSelected ? '#eef2ff' : ''}}>
            <div className="space-y-2">
                <img 
                className="rounded-full mx-auto w-24 h-24"
                src={user.avatar_url}
                alt="avatar_url">
                </img>
                <div className="">
                    <h2 className="text-lg text-center text-black-400 font-medium">{(user.name[0] === '*') ? 'Bot' : user.name}</h2>
                    <p className="text-sm text-center text-gray-400">@{user.username}</p>
                </div>
            </div>
        </div>
    )
}
export default UserCard;