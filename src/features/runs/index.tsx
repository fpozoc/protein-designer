import { ConfigDrawer } from '@/components/config-drawer'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { RunsDialogs } from './components/runs-dialogs'
import { RunsPrimaryButtons } from './components/runs-primary-buttons'
import { RunsProvider } from './components/runs-provider'
import { RunsTable } from './components/runs-table'
import { runs } from './data/runs'

export function Runs() {
  return (
    <RunsProvider>
      <Header fixed>
        <Search />
        <div className='ms-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ConfigDrawer />
          <ProfileDropdown />
        </div>
      </Header>

      <Main className='flex flex-1 flex-col gap-4 sm:gap-6'>
        <div className='flex flex-wrap items-end justify-between gap-2'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Runs</h2>
            <p className='text-muted-foreground'>
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <RunsPrimaryButtons />
        </div>
        <RunsTable data={runs} />
      </Main>

      <RunsDialogs />
    </RunsProvider>
  )
}
