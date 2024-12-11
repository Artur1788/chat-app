import { Main, Sidebar } from './components';
import { GeminiContextProvider } from './contexts';

export default function App() {
  return (
    <GeminiContextProvider>
      <div className='relative flex bg-[#1e1f20] min-h-dvh'>
        <Sidebar />
        <Main />
      </div>
    </GeminiContextProvider>
  );
}
