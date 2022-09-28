import React from "react";
import { User } from "../Resources/ResponseTypes";
import UsersPage from "./Pages/UsersPage";

type UserCardProps = {
    user: User;
};



const UserCard = ({user}: UserCardProps) => {

    console.log(user.web_url);

    return (
        <div className="max-witdh-xs w-52 h-48 text-white bg-indigo-100 rounded-xl p-5 pt-6">
            <div className="space-y-3">
                <h2 className="text-center">{user.name}</h2>
                <img 
                className="rounded-full mx-auto"
                src={user.avatar_url}
                alt="avatar_url">
                </img>
                <p className="text-center">{user.username}</p>
            </div>
        </div>
    )
}
export default UserCard;