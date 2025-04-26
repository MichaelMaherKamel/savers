'use client'

import type * as React from 'react'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar'
import Link from 'next/link'

export function CompanyLogo({
  company,
}: {
  company: {
    name: string
    logo: React.ElementType
  }
}) {
  const { state } = useSidebar()
  const isCollapsed = state === 'collapsed'

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          asChild
          size='lg'
          className={`${
            !isCollapsed ? 'bg-transparent hover:bg-transparent focus:bg-transparent ' : ''
          }data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground`}
        >
          <Link href='/'>
            {/* Container for the logo with conditional centering when collapsed */}
            <div className={`flex items-center ${isCollapsed ? 'w-full justify-center' : ''}`}>
              <company.logo width={50} />
            </div>

            {!isCollapsed && (
              <div className='grid flex-1 text-left text-lg leading-tight'>
                <span className='truncate font-semibold'>{company.name}</span>
              </div>
            )}
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
