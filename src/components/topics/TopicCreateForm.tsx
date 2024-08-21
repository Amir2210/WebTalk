'use client'
import { Popover, PopoverContent, PopoverTrigger, Input, Button, Textarea } from '@nextui-org/react'
import { createTopic } from '@/actions'
import { useFormState } from 'react-dom'
function TopicCreateForm() {

  const [formState, action] = useFormState(createTopic, { errors: {} })
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={action}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input name='name' label='Name' labelPlacement='outside' placeholder='name' isInvalid={!!formState.errors.name} errorMessage={formState.errors.name?.join(', ')}></Input>

            <Textarea name='description' label='Description' labelPlacement='outside' placeholder='Describe your topic' isInvalid={!!formState.errors.description} errorMessage={formState.errors.description?.join(', ')}></Textarea>
            {formState.errors._form ? <div className='p-2 bg-red-200 border  rounded-md'>{formState.errors._form?.join(', ')}</div> : null}
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default TopicCreateForm