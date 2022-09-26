import React from "react";
import { User } from "../Resources/ResponseTypes";
import UsersPage from "./Pages/UsersPage";

type UserCardProps = {
    user: User;
};



const UserCard = ({user}: UserCardProps) => {

    console.log(user.web_url);

    return (
        <div className="text-white bg-indigo-100 w-24 rounded-xl">
            <div className="">
                <h2 className="">{user.name}</h2>
                <img 
                className="rounded-full"
                src={user.avatar_url}
                alt="avatar_url">
                </img>
            </div>
            <div className="">
                <p className="">{user.username}</p>
            </div>
        </div>
    )
}
export default UserCard;