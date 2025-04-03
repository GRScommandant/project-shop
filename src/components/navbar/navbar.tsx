"use client"
import * as React from "react"
import {usePathname} from 'next/navigation'
import Link from 'next/link'
import {cn} from '@/lib/utils'
import {Menu} from "lucide-react";
import siteConfig, {RouteType} from "@/config";
import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet"
import {Darklightbutton} from "@/components/darklightswitch/darklightbutton";

const routes = Object.values(siteConfig.ROUTE).filter((route) => !(route as RouteType).hidden)

type NavbarProps = {
    dir: "rtl" | "ltr"
}

export function Navbar({dir}: NavbarProps) {
    const pathname = usePathname()

    return (
        <div className="border-b">
            <div className="flex h-16 items-center px-4 container mx-auto">
                <Sheet>
                    <SheetTrigger asChild className="sm:hidden">
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6"/>
                            <span className="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>

                    {/* Mobile Sheet Content */}
                    <SheetContent side={dir === "rtl" ? "right" : "left"} className="w-72">
                        <SheetHeader>
                            <SheetTitle>{siteConfig.name}</SheetTitle>
                        </SheetHeader>
                        <nav className="flex flex-col items-start justify-start space-y-4 mt-4">
                            {routes.map((route) => (
                                <Link
                                    key={route.href}
                                    href={route.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname === route.href
                                            ? "text-black dark:text-white"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {route.label}
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
                <nav className="hidden sm:flex items-center space-x-4 sm:space-x-6 mx-6">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary me-6",
                                pathname === route.href
                                    ? "text-black dark:text-white"
                                    : "text-muted-foreground",
                            )}
                        >
                            {route.label}
                        </Link>
                    ))}
                </nav>
                <div className="me-auto rtl:ms-auto rtl:me-0 flex items-center space-x-4">
                    <Darklightbutton/>
                </div>
            </div>
        </div>

    );

}