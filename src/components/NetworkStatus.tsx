import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff } from 'lucide-react';

const NetworkStatus = () => {
  const { isOnline, connectionType } = useNetworkStatus();

  if (isOnline && connectionType !== 'slow-2g' && connectionType !== '2g') {
    return null;
  }

  return (
    <Alert className="fixed top-20 left-4 right-4 z-50 border-orange-200 bg-orange-50">
      <div className="flex items-center gap-2">
        {isOnline ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
        <AlertDescription>
          {!isOnline 
            ? "You're offline. Some features may not work properly."
            : "Slow connection detected. Loading optimized content..."
          }
        </AlertDescription>
      </div>
    </Alert>
  );
};

export default NetworkStatus;