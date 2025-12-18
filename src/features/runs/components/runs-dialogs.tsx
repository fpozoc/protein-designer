import { showSubmittedData } from '@/lib/show-submitted-data'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { RunsImportDialog } from './runs-import-dialog'
import { RunsMutateDrawer } from './runs-mutate-drawer'
import { useRuns } from './runs-provider'

export function RunsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useRuns()
  return (
    <>
      <RunsMutateDrawer
        key='run-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <RunsImportDialog
        key='runs-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <RunsMutateDrawer
            key={`run-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='run-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
              setOpen(null)
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
              showSubmittedData(
                currentRow,
                'The following run has been deleted:'
              )
            }}
            className='max-w-md'
            title={`Delete this run: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a run with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
