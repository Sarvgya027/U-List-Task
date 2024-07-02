
interface UserDetailsProps {
  user: {
    avatar: string;
    profile: {
      firstName: string;
      lastName: string;
      email: string;
    };
    jobTitle: string;
    Bio: string;
  } | null;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  if (!user) {
    return (
      <div className="text-gray-400 flex justify-center items-center h-full ">
        Select a user to see their details
      </div>
    )
  }

  return (
    <div className="p-4 text-white flex flex-col items-center h-full overflow-y-auto ">
      <div className="bg-gray-800 w-full flex justify-center items-center rounded-2xl mt-16">
        <img src={user.avatar} alt={user.profile.firstName} className="w-32 h-32 rounded-full my-4" />
      </div>
      <h2 className="text-xl pt-10 font-bold">{`${user.profile.firstName} ${user.profile.lastName}`}</h2>
      <p className="text-gray-400">{user.jobTitle}</p>
      <p className="flex flex-col items-center mt-10"><span className="text-gray-400 text-xs">User Bio</span> {user.Bio}</p>
      <p className="flex flex-col items-center mt-10"><span className="text-gray-400 text-xs">User email</span>{user.profile.email}</p>
    </div>
  )
}


export default UserDetails