'use server'
import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { auth } from '@/auth'
import type { Topic } from '@prisma/client'
import { redirect } from 'next/navigation'
import { db } from '@/db'
import paths from '@/path'

const createTopicSchema = z.object({
  name: z.string().min(3).regex(/^[a-z-]+$/, { message: 'Must be lowerCase letters or dashes without spaces' }),
  description: z.string().min(10)
})

interface createTopicFromState {
  errors: {
    name?: string[],
    description?: string[]
    _form?: string[]
  }
}

export async function createTopic(formState: createTopicFromState, formData: FormData): Promise<createTopicFromState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
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
      errors: { _form: ['You must be sign in to create a new topic'] }
    }
  }

  // save topic in db
  let topic: Topic
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description
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
  revalidatePath('/')
  redirect(paths.topicShow(topic.slug))

}