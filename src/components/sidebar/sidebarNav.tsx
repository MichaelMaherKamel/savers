'use client'
import { type LucideIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
  const { isMobile, closeMobileSidebar } = useSidebar()
  
  // Handle link click to close mobile sidebar if on mobile
  const handleLinkClick = () => {
    if (isMobile) {
      closeMobileSidebar()
    }
  }
  
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {sections.map((item) => {
          // Fix the path checking logic
          const isActive = 
            item.url === '/admin' 
              ? pathname === '/admin' || pathname === '/admin/' 
              : pathname?.startsWith(item.url)
              
          return (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className={cn(
                  'cursor-pointer transition-colors',
                  isActive 
                    ? 'bg-red-100 text-red-600 shadow-sm' 
                    : 'hover:bg-red-50 hover:text-red-500'
                )}
              >
                <Link href={item.url} onClick={handleLinkClick}>
                  <item.icon className={cn(isActive ? 'text-red-600' : 'text-muted-foreground')} />
                  <span className={cn(isActive ? 'font-medium text-red-600' : '')}>{item.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}