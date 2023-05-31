import EventBus from "../../common/EventBus";
import ChangeUsername from "./ProfileInfo/ChangeUsername";
import ChangePassword from "./ProfileInfo/ChangePassword";
import DeleteUser from "./ProfileInfo/DeleteUser";

function ProfileInfo({ currentUser, AuthService }) {

    return (
        <>
            {/* User */}
            <div className="flex-row-center">
                <div>
                    <ChangeUsername AuthService={AuthService} EventBus={EventBus} />
                    {/* TODO: Add email for forgoten username? or password */}
                    <ChangePassword currentUser={currentUser} AuthService={AuthService} EventBus={EventBus} />
                    <DeleteUser currentUser={currentUser} AuthService={AuthService} />
                </div>
            </div>
        </>
    );
}

export default ProfileInfo;