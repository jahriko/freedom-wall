"use client"

import * as React from "react"
import { useMediaQuery } from "@/hooks/use-media-query"

import { Button } from "@/components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer"
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogClose,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"

export function PostCard() {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")

	if (isDesktop) {

		return (
			<Dialog>
				<DialogTrigger asChild>
					<Card className="hover:bg-slate-50 hover:shadow-sm hover:cursor-pointer">
						<CardHeader>
							<div className="space-x-2">
								<span className="text-xs text-gray-950">to</span>
								<a
									className="text-gray-900  text-sm font-medium"
								>
									Sir John Smith
								</a>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-gray-800 prose-sm line-clamp-3">Usdfkj lkjsdlf jsdl jldsjf lsjdlfkj sdjfl kjt enim ad minim veniam Sign in with your UIC 🥲🙌😍😭🎉👏😇😭🎉🎉🎉🎉email to share your love to your teacher! Sign in with your UIC email to share your love to your teacher!</p>
						</CardContent>
						<CardFooter className="justify-end">
							<div className="text-right space-x-2">
								<span className="text-xs text-indigo-600">from</span>
								<a
									className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
								>
									Jericho Opsima
								</a>
							</div>
						</CardFooter>
					</Card>
				</DialogTrigger>
				<DialogContent className="p-4">
					<Card className="border-none shadow-none">
						<CardHeader>
							<div className="space-x-2">
								<span className="text-xs text-gray-950">to</span>
								<a
									className="text-gray-900  text-sm font-medium"
								>
									Sir John Smith
								</a>
							</div>
						</CardHeader>
						<CardContent>
							<p className="text-gray-800 prose-sm">dfkj lkjsdlf jsdl jldsjf lsjdlfkj sdjfl kjt enim ad minim veniam Sign in with your UIC 🥲🙌😍😭🎉👏😇😭🎉🎉🎉🎉email to share your love to your teacher! Sign in with your UIC email to share your love to your teacher!</p>
						</CardContent>
						<CardFooter className="justify-end">
							<div className="text-right space-x-2">
								<span className="text-xs text-indigo-600">from</span>
								<a
									className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
								>
									Jericho Opsima
								</a>
							</div>
						</CardFooter>
					</Card>
				</DialogContent>
			</Dialog>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Card className="hover:bg-slate-50 hover:shadow-sm hover:cursor-pointer">
					<CardHeader>
						<div className="space-x-2">
							<span className="text-xs text-gray-950">to</span>
							<a
								className="text-gray-900  text-sm font-medium"
							>
								Sir John Smith
							</a>
						</div>
					</CardHeader>
					<CardContent>
						<p className="text-gray-800 prose-sm ">Ufkj lkjsdlf jsdl jldsjf lsjdlfkj sdjfl kjt enim ad minim veniam Sign in with your UIC 🥲🙌😍😭🎉👏😇😭🎉🎉🎉🎉email to share your love to your teacher! Sign in with your UIC email to share your love to your teacher!</p>
					</CardContent>
					<CardFooter className="justify-end">
						<div className="text-right space-x-2">
							<span className="text-xs text-indigo-600">from</span>
							<a
								className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
							>
								Jericho Opsima
							</a>
						</div>
					</CardFooter>
				</Card>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left">
					<DrawerTitle>Edit profile</DrawerTitle>
					<DrawerDescription>
						Make changes to your profile here. Click save when you're done.
					</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="outline">Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	)

}