import React from "react";
import { User } from "../Resources/ResponseTypes";
import UsersPage from "./Pages/UsersPage";

type UserCardProps = {
    user: User;
};



const UserCard = ({user}: UserCardProps) => {

    console.log(user.web_url);

    return (
        <div className="max-witdh-xs w-48 h-52 text-white bg-indigo-100 rounded-lg p-5 pt-6">
            <div className="space-y-2">
                <img 
                className="rounded-full mx-auto"
                src={user.avatar_url}
                alt="avatar_url">
                </img>
                <div className="">
                    <h2 className="text-center text-gray-400 font-medium">{user.name}</h2>
                    <p className="text-center">@{user.username}</p>
                </div>
            </div>
        </div>
    )
}
export default UserCard;