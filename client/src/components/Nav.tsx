'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, ReactNode } from 'react'

export function Nav({ children }: { children: ReactNode }) {
	return (
		<header className="bg-primary text-primary-foreground flex justify-center sticky top-0 z-10 shadow-xl">
			<nav className="container mx-auto flex items-center justify-center">{children}</nav>
		</header>
	)
}

export function NavLink(props: Omit<ComponentProps<typeof Link>, 'className'>) {
	const pathname = usePathname()
	return (
		<Link
			{...props}
			className={cn(
				'p-4 hover:bg-secondary hover:text-secondary-foreground focus-visible:hover:bg-secondary focus-visible:hover:text-secondary-foreground',
				pathname === props.href && 'bg-background text-foreground'
			)}
		/>
	)
}
