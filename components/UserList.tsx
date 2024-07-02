
interface User {
  id: string
  avatar: string
  profile: {
    firstName: string
    lastName: string
    email: string
  }
  jobTitle: string
  Bio: string
}

interface UserListProps {
  users: User[]
  onUserSelect: (user: User) => void
}

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  if (users.length === 0) return <div className="flex justify-center mt-40">No Data</div>

  return (
    <div className="p-0 pt-10 container mx-auto bg-zinc-900 ">
      <h1 className="text-2xl pl-4 font-bold mb-4 text-white">User's List</h1>
      <ul className="space-y-0 ">
        {users.map((user) => (
          <li
            key={user.Bio}
            className="flex items-center p-4 border border-zinc-700  shadow hover:bg-gray-800 cursor-pointer"
            onClick={() => onUserSelect(user)}
          >
            <img src={user.avatar} alt={user.profile.firstName} className="w-16 h-16 rounded-full mr-4" />
            <div>
              <div className="font-semibold text-white text-lg">{`${user.profile.firstName} ${user.profile.lastName}`}</div>
              {/* <div className="text-gray-400">{user.jobTitle}</div> */}
              <div className="text-gray-500">{user.profile.email}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList