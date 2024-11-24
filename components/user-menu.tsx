'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/contexts/auth-context'
import { User2 } from 'lucide-react'
import { Button } from './ui/button'

export const UserMenu = () => {
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return <Button variant="ghost" size="icon" disabled><User2 className="h-5 w-5" /></Button>
  }

  if (!user) {
    return null
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <User2 className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem className="font-normal">
          Signed in as <br />
          <span className="font-medium">{user.email}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => logout()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 