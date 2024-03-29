import React from 'react';
import EventBus from "../../common/EventBus";
import ChangeUsername from "./ProfileInfo/ChangeUsername";
import ChangeEmail from "./ProfileInfo/ChangeEmail";
import ChangePassword from "./ProfileInfo/ChangePassword";
import DeleteUser from "./ProfileInfo/DeleteUser";

function ProfileInfo({ currentUser, AuthService }) {

    return (
        <>
            {/* User */}
            <div className="flex-row-center">
                <div>
                    <ChangeUsername currentUser={currentUser} AuthService={AuthService} EventBus={EventBus} />
                    <ChangeEmail currentUser={currentUser} AuthService={AuthService} EventBus={EventBus} />
                    <ChangePassword currentUser={currentUser} AuthService={AuthService} EventBus={EventBus} />
                    <DeleteUser currentUser={currentUser} AuthService={AuthService} />
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;