import Banner from "./Banner";
import ProfileHeader from "./ProfileHeader";
import SideBar from './SideBar'

function UserProfile({ Username =" User", U_type="REgular" }) {
  return (
    <>
      <ProfileHeader Username={Username} U_type={U_type} />
      <Banner Username={Username}/>
      <SideBar/>
    </>
  );
}
export default UserProfile;
