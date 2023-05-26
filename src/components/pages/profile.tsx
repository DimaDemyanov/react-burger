import { Outlet } from "react-router-dom";
import { ProfileNavigation } from "../profile-navigation/profile-navigation";
import profileStyles from "./profile.module.css";

export const Profile = () => {
  return (
    <div className={profileStyles.profileContainer}>
      <ProfileNavigation className="mt-20" />
      <Outlet />
    </div>
  );
};
