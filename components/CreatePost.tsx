"use client"

import { Button } from "@/components/ui/button"
import * as React from "react"
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem } from "./ui/form"
import { createBrowserClient } from "@supabase/ssr"
import { toast } from "sonner"
import { Database } from "@/app/database.types"
import { useRouter } from "next/navigation"

const formSchema = z.object({
	teacher_title: z.string().min(1),
	teacher_name: z.string().min(1),
	message: z.string().min(1),
})

export default function CreatePost({ user }: { user: string }) {
	const [open, setOpen] = React.useState(false)
	const router = useRouter()
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			teacher_title: "",
			teacher_name: "",
			message: "",
		},
	})

	async function onSubmit(values: z.infer<typeof formSchema>) {

		const supabase = createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		)

		const { message, teacher_name, teacher_title } = values

		const teacher_name_with_title = `${teacher_title} ${teacher_name}`

		console.log("hi lol", {
			message,
			teacher_name,
			teacher_name_with_title,
			user,
		})

		const { data, error } = await supabase
			.from("post")
			.insert([
				{
					text: message,
					teacher_name: teacher_name_with_title,
					student_name: user,
					// text: message as string,
					// student_name: user,
					// teacher_name: teacher_name_with_title as string,
				},
			])
			.select()

		if (error) {
			toast("Error creating post")
			throw error
		}

		toast("Post created successfully", {
			action: {
				label: "View",
				onClick: () => console.log("View"),
			},
		})
		
		setOpen(false)
		router.refresh()
		form.reset()
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button variant="outline">Edit Profile</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Write a message</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						id="create-post"
						className="grid gap-4 grid-cols-9"
					>
						<div className="col-span-3">
							<FormField
								control={form.control}
								name="teacher_title"
								render={({ field }) => (
									<FormItem>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select title" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Sir">Sir</SelectItem>
												<SelectItem value="Ma'am">Ma'am</SelectItem>
												<SelectItem value="Miss">Miss</SelectItem>
											</SelectContent>
										</Select>
									</FormItem>
								)}
							/>
						</div>

						<div className="col-span-6">
							<FormField
								control={form.control}
								name="teacher_name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input
												id="name"
												placeholder="Educator's Full Name"
												// className="flex-auto"
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
						<div className="col-span-full gap-4">
							<FormField
								control={form.control}
								name="message"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Textarea
												className=""
												placeholder="Type your message here."
												rows={7}
												{...field}
											/>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter>
					<Button type="submit" form="create-post">
						Post it!
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
