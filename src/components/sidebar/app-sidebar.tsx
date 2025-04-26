'use client'

import type * as React from 'react'
import { Boxes, LayoutDashboard, Users } from 'lucide-react'
import { NavDashboard } from './sidebarNav'
import { NavUser } from './nav-user'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar'
import { CompanyLogo } from './company-logo'
import { SaversLogoOnly } from '../site/SaversLogo'

// Simplified data structure for admin dashboard
const dashboardData = {
  user: {
    name: 'Admin',
    email: 'admin@example.com',
    avatar: '/avatars/admin.jpg',
  },
  sections: [
    {
      name: 'Dashboard',
      url: '/admin',
      icon: LayoutDashboard,
    },
    {
      name: 'Products',
      url: '/admin/products',
      icon: Boxes,
    },
    {
      name: 'Clients',
      url: '/admin/clients',
      icon: Users,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <CompanyLogo company={{ name: 'Savers', logo: SaversLogoOnly }} />
      </SidebarHeader>
      <SidebarContent>
        <NavDashboard sections={dashboardData.sections} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dashboardData.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
