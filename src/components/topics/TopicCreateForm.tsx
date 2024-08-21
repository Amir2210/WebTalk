import { Popover, PopoverContent, PopoverTrigger, Input, Button, Textarea } from '@nextui-org/react'
import { createTopic } from '@/actions'
function TopicCreateForm() {
  return (
    <Popover placement='left'>
      <PopoverTrigger>
        <Button color='primary'>Create a Topic</Button>
      </PopoverTrigger>
      <PopoverContent>
        <form action={createTopic}>
          <div className='flex flex-col gap-4 p-4 w-80'>
            <h3 className='text-lg'>Create a Topic</h3>
            <Input label='Name' labelPlacement='outside' placeholder='name'></Input>
            <Textarea label='Description' labelPlacement='outside' placeholder='Describe your topic'></Textarea>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  )
}

export default TopicCreateForm