import { ReactNode } from 'react'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from "@/components/sidebar/sidebar";

interface WithSidebarLayoutProps {
    children: ReactNode
}

export default function WithSidebarLayout({ children }: WithSidebarLayoutProps) {
    return (
        <SidebarProvider>
            <div className="flex">
                <AppSidebar/>
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </SidebarProvider>
    )
}