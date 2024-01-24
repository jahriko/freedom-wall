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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
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
	send_anonymously: z.boolean(),
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
			send_anonymously: false,
		},
	})
	const watchTitle = form.watch("teacher_title")


	async function onSubmit(values: z.infer<typeof formSchema>) {

		const supabase = createBrowserClient<Database>(
			process.env.NEXT_PUBLIC_SUPABASE_URL!,
			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
		)

		let student_name = user

		if (values.send_anonymously) {
			student_name = ""
		}

		const { message, teacher_name, teacher_title } = values

		const teacher_name_with_title = `${teacher_title} ${teacher_name}`

		const { data, error } = await supabase
			.from("post")
			.insert([
				{
					text: message,
					teacher_name: teacher_name_with_title,
					student_name,
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
		setOpen(false)

		toast("Post created successfully")
		
		// router.refresh()
		form.reset()
	}
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant="default"
					className="bg-pink-900/60 hover:bg-pink-900/70"
					size="lg"
				>
					Send a message
				</Button>
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
												<SelectItem value="All">All Educators</SelectItem>
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
						<div className="col-span-4">
							<FormField
								control={form.control}
								name="send_anonymously"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<div className="flex items-center space-x-2">
												<Switch
													id="send-anonymously"
													checked={field.value}
													onCheckedChange={field.onChange}
												/>
												<Label htmlFor="send-anonymously">Send Anonymously</Label>
											</div>
										</FormControl>
									</FormItem>
								)}
							/>
						</div>
					</form>
				</Form>
				<DialogFooter>
					<Button
						type="submit"
						form="create-post"
					>
						Post it
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}