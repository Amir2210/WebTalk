'use server'

import type { Post } from '@prisma/client'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import { db } from '@/db'
import paths from '@/path'

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10)
})
interface createPostFormState {
  errors: {
    title?: string[],
    content?: string[]
    _form?: string[]
  }
}


export async function createPost(slug: string, formState: createPostFormState, formData: FormData): Promise<createPostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  })

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors
    }
  }

  // check if the user is log in, if not sent him an error message
  const session = await auth()
  if (!session || !session.user) {
    return {
      errors: { _form: ['You must be sign in to create a new post'] }
    }
  }


  const topic = await db.topic.findFirst({
    where: { slug }
  })

  if (!topic) {
    return {
      errors: {
        _form: ['Cannot find topic']
      }
    }
  }


  let post: Post
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id
      }
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: { _form: [error.message] }
      }
    } else {
      return {
        errors: { _form: ['Something went wrong...'] }
      }
    }
  }
  // ensuring that the content displayed on the page is always up-to-date.
  revalidatePath(paths.topicShow(slug))
  redirect(paths.postShow(slug, post.id))
}