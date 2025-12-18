import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { SelectDropdown } from '@/components/select-dropdown'
import { type Run } from '../data/schema'

type RunMutateDrawerProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Run
}

const formSchema = z.object({
  model: z.enum(['rfdiffusion', 'proteinmpnn', 'alphafold', 'ligandmpnn']),
  status: z.enum(['queued', 'running', 'completed', 'failed']),
  s3_path: z.string().optional(),
})
type RunForm = z.infer<typeof formSchema>

export function RunsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: RunMutateDrawerProps) {
  const isUpdate = !!currentRow

  const form = useForm<RunForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      model: 'rfdiffusion',
      status: 'queued',
      s3_path: '',
    },
  })

  const onSubmit = (data: RunForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    showSubmittedData(data)
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-start'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Run</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the run by providing necessary info.'
              : 'Add a new run by providing necessary info.'}
            Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='runs-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 space-y-6 overflow-y-auto px-4'
          >
            <FormField
              control={form.control}
              name='model'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select model'
                    items={[
                      { label: 'RFdiffusion', value: 'rfdiffusion' },
                      { label: 'ProteinMPNN', value: 'proteinmpnn' },
                      { label: 'AlphaFold', value: 'alphafold' },
                      { label: 'LigandMPNN', value: 'ligandmpnn' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <SelectDropdown
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                    placeholder='Select status'
                    items={[
                      { label: 'Queued', value: 'queued' },
                      { label: 'Running', value: 'running' },
                      { label: 'Completed', value: 'completed' },
                      { label: 'Failed', value: 'failed' },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='s3_path'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>S3 Path (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='s3://bucket/path' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='runs-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
