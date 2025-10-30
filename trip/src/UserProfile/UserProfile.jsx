import Banner from "./Banner";
import ProfileHeader from "./ProfileHeader";
import SideBar_MainWindow from './SideBar_MainWindow'

function UserProfile({ Username = " User", U_type = "REgular" }) {
  return (
    <>
      <ProfileHeader Username={Username} U_type={U_type} />
      <Banner Username={Username} />
      <SideBar_MainWindow />
    </>
  );
}
export default UserProfile;
