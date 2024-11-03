import React from "react";



const Profile = ({name } : {name : string}) => {
    const nameParts = name.split(" ");
    const first_name = nameParts[0] ? nameParts[0][0] : ""
    const last_name = nameParts[1]? nameParts[1][0] : ""

    return (
        <span className="flex justify-center items-center w-[80px] h-[80px] bg-blue-500 text-white text-xl rounded-full font-bold">
            {first_name}
            {last_name}
        </span>
    )
}

export default Profile