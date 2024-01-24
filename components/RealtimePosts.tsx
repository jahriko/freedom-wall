"use client"

import { Database } from "@/app/database.types"
import { createBrowserClient } from "@supabase/ssr"
import { PostCard } from "./PostCard"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

type PostSummary = Pick<
	Database["public"]["Tables"]["post"]["Row"],
	"id" | "student_name" | "teacher_name" | "text"
>

export default function RealtimePosts({
	allowDelete,
	posts,
}: {
	allowDelete?: boolean
	posts: PostSummary[] | null
}) {
	const supabase = createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	)

	const router = useRouter()

	useEffect(() => {
		const channel = supabase
			.channel("post")
			.on(
				"postgres_changes",
				{
					event: "*",
					schema: "public",
					table: "post",
				},
				() => router.refresh()
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channel)
		}
	}, [supabase, router])

	return (
		<ul className="mt-16 grid gap-4 lg:gap-8 grid-cols-2 lg:grid-cols-3">
			{posts?.map((post) => (
				<li key={post.id}>
					<PostCard post={post} allowDelete={allowDelete} />
				</li>
			))}
		</ul>
	)
}
