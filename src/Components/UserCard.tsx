import React from "react";
import { User } from "../Resources/ResponseTypes";

type UserCardProps = {
    user: User;
};


const UserCard = ({user}: UserCardProps) => {
    console.log(user.name)
    const name = '';

    if (user.avatarURL == undefined) {
        
    }
    console.log(user.webURL?? '')
    return (
        <div className="bg-black font-serif text-white">
            <p>{user.webURL?? ''}</p>
        </div>
    )
}
export default UserCard;