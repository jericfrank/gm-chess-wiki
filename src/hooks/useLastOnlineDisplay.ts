import { useEffect, useState, useMemo } from 'react';
import { formatDistanceToNow, isValid } from 'date-fns';

export const useLastOnlineDisplay = (lastOnline: number) => {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const [elapsed, setElapsed] = useState(() => Date.now() - lastOnline);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(Date.now() - lastOnline);
    }, 1000);
    return () => clearInterval(interval);
  }, [lastOnline]);

  const display = useMemo(() => {
    // Note: chess api returns very old last_online data, so I added a fallback to display a human-readable format if it's older than 24 hours.
    if (elapsed > ONE_DAY_IN_MS) {
      const date = new Date(lastOnline);
      return formatDistanceToNow(date, { addSuffix: true });
    }

    const totalSeconds = Math.floor(elapsed / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const format = (val: number) => val.toString().padStart(2, '0');
    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  }, [elapsed, lastOnline]);

  if (!isValid(elapsed)) {
    return { display: '-' };
  }

  return { display };
};
