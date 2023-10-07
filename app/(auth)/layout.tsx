import { FC } from 'react'

const AuthLayout: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="grid h-screen place-items-center">
      <div className="flex flex-col items-center space-y-12">
        {children}
      </div>
    </div>
  )
}

export default AuthLayout;