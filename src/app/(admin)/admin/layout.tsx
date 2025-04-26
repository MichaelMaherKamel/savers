'use client'

import { AppSidebar } from '@/components/sidebar/app-sidebar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

import React, { ReactNode, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [breadcrumbItems, setBreadcrumbItems] = useState<Array<{ name: string; path: string; isActive: boolean }>>([])

  useEffect(() => {
    // Always start with Dashboard
    const items = [{ name: 'Dashboard', path: '/admin', isActive: false }]

    // If we're not at the root /admin path, add the section
    if (pathname && pathname !== '/admin') {
      const pathSegments = pathname.split('/')
      if (pathSegments.length > 2) {
        // Get the part after /admin/
        const section = pathSegments[2]
        // Capitalize the first letter of the section
        const sectionName = section.charAt(0).toUpperCase() + section.slice(1)
        items.push({ name: sectionName, path: pathname, isActive: true })
      }
    } else {
      // If we're at /admin, mark Dashboard as active
      items[0].isActive = true
    }

    setBreadcrumbItems(items)
  }, [pathname])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbItems.map((item, index) => (
                  <React.Fragment key={`breadcrumb-${index}`}>
                    <BreadcrumbItem>
                      {!item.isActive ? (
                        <BreadcrumbLink href={item.path}>{item.name}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
