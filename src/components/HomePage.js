import TextBlock from '@/components/TextBlock';
import FilePanel from '@/components/FilePanel';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-background flex justify-center p-8">
        <FilePanel />
        <TextBlock />
    </div>
  );
}
