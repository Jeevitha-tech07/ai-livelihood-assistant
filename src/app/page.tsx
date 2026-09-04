import { LanguageProvider } from '@/context/LanguageContext';
import { WelcomeContainer } from '@/components/welcome/WelcomeContainer';

export default function Home() {
  return (
    <LanguageProvider>
      <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4">
        <WelcomeContainer />
      </main>
    </LanguageProvider>
  );
}
