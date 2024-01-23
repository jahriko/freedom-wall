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
import { Database } from "@/app/database.types"
import { ScrollArea } from "./ui/scroll-area"
import { DeleteIcon, Trash2Icon } from "lucide-react"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"
import { revalidatePath } from "next/cache"
import { useRouter } from "next/navigation"

export function PostCard({
	post,
	allowDelete
}: {
	post: Database["public"]["Tables"]["post"]["Row"]
	allowDelete?: boolean
}) {
	const [open, setOpen] = React.useState(false)
	const isDesktop = useMediaQuery("(min-width: 768px)")
	const [isClick, setClick] = React.useState(false)
	  const supabase = createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		)
		const router = useRouter()

		const deletePost = async () => {
			const { error } = await supabase.from('post').delete().eq('id', post.id)
			if (error) {
				toast(`Error: ${error.message}`)
			}

			router.refresh()

			return toast(`Post deleted`)
		}


	if (isDesktop) {
		return (
			<Card>
				<CardHeader>
					<div className="flex justify-between">
						<div className="space-x-2">
							<span className="text-xs text-pink-900/70">to</span>
							<a className=" text-sm font-medium text-pink-900/70 hover:text-pink-900/80 capitalize">
								{post.teacher_name}
							</a>
						</div>
						<div>
							{allowDelete && (
								<button onClick={deletePost}>
									<Trash2Icon className="w-4 h-4 text-red-400 hover:text-red-600 cursor-pointer" />
								</button>
							)}
						</div>
					</div>
				</CardHeader>
				<CardContent className=" h-28">
					<p className="text-gray-800 prose-sm line-clamp-3">{post.text}</p>
					<Dialog>
						<DialogTrigger asChild>
							<span className="text-pink-900/70 hover:text-pink-900/80 font-medium text-xs cursor-pointer">
								Read more
							</span>
						</DialogTrigger>
						<DialogContent className="p-4 max-w-2xl">
							<ScrollArea className="max-h-[70vh]">
								<Card className="border-none shadow-none">
									<CardHeader>
										<div className="space-x-2">
											<span className="text-xs text-pink-900/70">to</span>
											<a className="text-sm font-medium text-pink-900/70 hover:text-pink-900/80 capitalize">
												{post.teacher_name}
											</a>
										</div>
									</CardHeader>
									<CardContent>
										<p className="text-gray-800 prose-sm">{post.text}</p>
									</CardContent>
									<CardFooter className="justify-end">
										<div className="text-right space-x-2">
											<span className="text-xs text-gray-900">—</span>
											<a className="text-gray-900  text-sm font-medium">
												{post.student_name}
											</a>
										</div>
									</CardFooter>
								</Card>
							</ScrollArea>
						</DialogContent>
					</Dialog>
				</CardContent>
				<CardFooter className="flex justify-end relative">
					<div className="text-right space-x-2">
						{post.student_name === "" ? (
							<>
								<span> </span>
								<a className="text-gray-900  text-sm font-medium">{post.student_name}</a>
							</>
						) : (
							<>
								<span className="text-xs text-gray-950">—</span>
								<a className="text-gray-900  text-sm font-medium">{post.student_name}</a>
							</>
						)}
					</div>
				</CardFooter>
			</Card>
		)
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Card className="hover:bg-slate-50 hover:shadow-sm hover:cursor-pointer">
					<CardHeader>
						<div className="flex justify-between">
						<div className="space-x-2">
							<span className="text-xs text-pink-900/70 capitalize">to</span>
							<a className="text-pink-900/70  text-sm font-medium capitalize">
								{post.teacher_name}
							</a>
						</div>
						<div>
							{allowDelete && (
								<button onClick={deletePost}>
									<Trash2Icon className="w-4 h-4 text-red-400 hover:text-red-600 cursor-pointer" />
								</button>
							)}
						</div>
						</div>
					</CardHeader>
					<CardContent className="h-24">
						<p className="text-gray-800 prose-sm line-clamp-3">{post.text}</p>
					</CardContent>
					<CardFooter className="justify-between">
						<div className="text-right space-x-2">
							{post.student_name === "" ? (
								<>
									<span> </span>
									<a className="text-gray-900  text-sm font-medium">
										{post.student_name}
									</a>
								</>
							) : (
								<>
									<span className="text-xs text-gray-950">—</span>
									<a className="text-gray-900  text-sm font-medium">
										{post.student_name}
									</a>
								</>
							)}
						</div>
					</CardFooter>
				</Card>
			</DrawerTrigger>
			<DrawerContent>
				<Card className="border-none shadow-none p-2">
					<CardHeader>
						<div className="space-x-2">
							<span className="text-xs text-pink-900/70">to</span>
							<a className="text-sm font-medium text-pink-900/70 hover:text-pink-900/80">
								{post.teacher_name}
							</a>
						</div>
					</CardHeader>
					<CardContent>
						<ScrollArea className="h-96">
							<p className="text-gray-800 prose-sm ">{post.text}</p>
						</ScrollArea>
					</CardContent>
					<CardFooter className="justify-end">
						{/* <Heart isClick={isClick} onClick={() => setClick(!isClick)} /> */}

						<div className="text-right space-x-2">
							<span className="text-xs text-gray-900">—</span>
							<a className="text-gray-900  text-sm font-medium">{post.student_name}</a>
						</div>
					</CardFooter>
				</Card>
			</DrawerContent>
		</Drawer>
	)
}