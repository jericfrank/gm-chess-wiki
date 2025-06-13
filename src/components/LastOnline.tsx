import { useLastOnlineDisplay } from '../hooks/useLastOnlineDisplay';

const LastOnline = ({ lastOne }: { lastOne: number }) => {
  const { display } = useLastOnlineDisplay(lastOne);
  return display;
};

export default LastOnline;
