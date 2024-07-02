'use client'

import { useEffect, useState } from "react"
import Loader from "@/components/Loader"
import UserList from "@/components/UserList"
import UserDetails from "@/components/UserDetail"
import ThemeToggle from "@/components/ThemeToggle"

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

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [showDetails, setShowDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
        if (!res.ok) throw new Error('Failed to fetch data')
        const data: User[] = await res.json()
        setUsers(data)
        setLoading(false)
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred')
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    if (isMobile) {
      setShowDetails(true)
    }
  }

  const handleBackToList = () => {
    setShowDetails(false)
  }

  if (loading) return <Loader />
  if (error) return <div className="flex justify-center mt-40">{error}</div>

  return (
    <div className={`flex ${isMobile ? 'flex-col ' : ''} h-screen`}>
      
      <div 
        className={`w-full  md:w-1/2 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobile && showDetails ? '-translate-x-full' : ''
        }`}
        style={{ height: isMobile ? 'calc(100% - 40px)' : '100%' }}
      >
        <UserList users={users} onUserSelect={handleUserSelect} />
      </div>



      <div 
        className={`w-full md:w-1/2 bg-zinc-900 overflow-y-auto transition-transform duration-300 ease-in-out ${
          isMobile ? 'fixed inset-0 transform ' + (showDetails ? 'translate-x-0' : 'translate-x-full') : ''
        }`}
        style={{ height: isMobile ? '100%' : '100%' }}
      >
        {isMobile && (
          <button 
            onClick={handleBackToList}
            className="sticky top-4 left-4 z-10 text-white bg-gray-800 px-3 py-1 rounded"
          >
            Back
          </button>
        )}
        <UserDetails user={selectedUser} />
      </div>
    </div>
  )
}

export default UserPage