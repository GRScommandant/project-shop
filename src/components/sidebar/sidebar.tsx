"use client"
import { ReactNode, useState } from 'react'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarProvider
} from "@/components/ui/sidebar"

import productdata from "@/components/productdata/productdatatable";

const components = {
    home: productdata,

}

const items = [
    {
        title: "محصولات",
        id: "home",
        icon: Home,
    },
]

export default function AppSidebar() {
    const [activeComponent, setActiveComponent] = useState('home')

    const ActiveComponent = components[activeComponent as keyof typeof components]

    return (
        <SidebarProvider>
            <div className="flex min-h-screen">
                <Sidebar>
                    <SidebarContent>
                        <SidebarGroup>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {items.map((item) => (
                                        <SidebarMenuItem key={item.id}>
                                            <SidebarMenuButton
                                                onClick={() => setActiveComponent(item.id)}
                                                className={activeComponent === item.id ? 'bg-secondary' : ''}
                                            >
                                                {item.icon && <item.icon className="h-4 w-4 mr-2" />}
                                                {item.title}
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    </SidebarContent>
                </Sidebar>
                <main className="flex-1 p-4">
                    <ActiveComponent />
                </main>
            </div>
        </SidebarProvider>
    )
}