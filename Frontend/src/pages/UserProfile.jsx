import PostOwnerDetails from "./Posts/PostOwnerDetails";
import UserPostImages from "./Posts/UserPostImages";

function UserProfile() {
  return (
    <div className="flex">
      <PostOwnerDetails />
      <UserPostImages />
    </div>
  );
}

export default UserProfile;
