'use client'

import { type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'

export function NavDashboard({
  sections,
}: {
  sections: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const pathname = usePathname()
  const { isMobile } = useSidebar()

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {sections.map((item) => {
          // Check if this link is active
          const isActive = pathname === item.url || (item.url !== '/admin' && pathname?.startsWith(item.url))

          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'cursor-pointer transition-colors',
                  isActive ? 'bg-primary/10 text-primary shadow-sm' : 'hover:bg-muted/60'
                )}
              >
                <a href={item.url}>
                  <item.icon className={cn(isActive ? 'text-primary' : 'text-muted-foreground')} />
                  <span className={cn(isActive ? 'font-medium' : '')}>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
