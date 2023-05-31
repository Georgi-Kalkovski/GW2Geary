import AuthService from "../services/auth.service";
import ProfileInfo from "./Profile/ProfileInfo";
import ProfileApis from "./Profile/ProfileApis";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <div>
      {currentUser && (
        <div>
          <ProfileInfo currentUser={currentUser} AuthService={AuthService} />
          <ProfileApis currentUser={currentUser} AuthService={AuthService} />
        </div>
      )
      }
    </div >
  );
};

export default Profile;