'use client'
import type * as React from 'react'
import { Boxes, LayoutDashboard, Users, Tags } from 'lucide-react'
import { NavDashboard } from './sidebarNav'
import { NavUser } from './nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { CompanyLogo } from './company-logo'
import { SaversLogoOnly } from '../site/SaversLogo'
import { Skeleton } from '@/components/ui/skeleton'

// Type definitions based on your auth system
type UserData = {
  displayName: string;
  email: string;
  image?: string;
  role: string;
}

// Simplified data structure for admin dashboard
const dashboardData = {
  sections: [
    {
      name: 'Dashboard',
      url: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Categories',
      url: '/admin/categories',
      icon: Tags,
    },
    {
      name: 'Products',
      url: '/admin/products',
      icon: Boxes,
    },
    {
      name: 'Users',
      url: '/admin/users',
      icon: Users,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: UserData;
  loading?: boolean;
}

export function AppSidebar({ user, loading = false, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <CompanyLogo company={{ name: 'Savers', logo: SaversLogoOnly }} />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard sections={dashboardData.sections} />
      </SidebarContent>
      <SidebarFooter>
        {loading ? (
          <div className="flex items-center gap-2 px-3 py-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        ) : user ? (
          <NavUser user={{
            name: user.displayName,
            email: user.email,
            avatar: user.image || '',
            role: user.role
          }} />
        ) : null}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}