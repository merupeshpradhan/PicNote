import PostOwnerDetails from "./PostOwnerDetails";
import UserPostImages from "./UserPostImages";

function UserProfile() {
  return (
    <div className="flex">
      <PostOwnerDetails />
      <UserPostImages />
    </div>
  );
}

export default UserProfile;
