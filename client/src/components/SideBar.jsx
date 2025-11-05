import React from 'react'
import { Protect, useClerk, useUser } from '@clerk/clerk-react'
import { Eraser, Hash, House, Scissors, SquarePen, Image, Users, LogOut } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import FeedbackForm from './FeedbackForm'

const navItems = [
  { to: '/ai', label: 'Dashboard', Icon: House },
  { to: '/ai/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/ai/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/ai/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/ai/remove-background', label: 'Remove Background', Icon: Eraser },
  { to: '/ai/remove-object', label: 'Remove Object', Icon: Scissors },
  { to: '/ai/community', label: 'Community', Icon: Users },
]

const SideBar = ({ sidebar, setSidebar }) => {
  const { user } = useUser()
  const { signOut, openUserProfile } = useClerk()

  return (
    <>
      {/* Overlay for mobile */}
      {sidebar && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-full w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center
          z-50 transform transition-transform duration-300 ease-in-out
          ${sidebar ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:z-auto
        `}
      >
        {/* User Info & Navigation */}
        <div className="my-6 w-full">
          <img src={user.imageUrl} alt="User Avatar" className="w-13 rounded-full mx-auto" />
          <h1 className="mt-1 text-center">{user.fullName}</h1>

          <div className="px-6 mt-5 text-sm text-gray-600 font-medium">
            {navItems.map((item) => {
              const { to, label, Icon } = item
              return (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/ai'}
                  onClick={() => setSidebar(false)}
                  className={({ isActive }) =>
                    `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                      isActive
                        ? 'bg-gradient-to-r from-[#3C81F6] to-[#9243EA] text-white'
                        : ''
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2 text-gray-600" />
                  {label}
                </NavLink>
              )
            })}
          </div>
        </div>

        {/* Feedback Form */}
        <div className="w-full">
          <FeedbackForm />
        </div>

        {/* Profile & Logout */}
        <div className="w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between">
          <div onClick={openUserProfile} className="flex gap-2 items-center cursor-pointer">
            <img src={user.imageUrl} alt="" className="w-8 rounded-full" />
            <div>
              <h1 className="text-sm font-medium">{user.fullName}</h1>
              <p className="text-xs text-gray-500">
                <Protect plan="premium" fallback="Free">
                  Premium
                </Protect>{' '}
                Plan
              </p>
            </div>
          </div>
          <LogOut
            onClick={signOut}
            className="w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer"
          />
        </div>
      </div>
    </>
  )
}

export default SideBar
