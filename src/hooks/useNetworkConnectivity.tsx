import NetInfo, {NetInfoState, NetInfoStateType} from '@react-native-community/netinfo';
import {useEffect, useState} from 'react';

interface NetworkConnectivity {
  isConnected: boolean;
  connectionType: NetInfoStateType;
}

const useNetworkConnectivity = (): NetworkConnectivity => {
  const [isConnected, setIsConnected] = useState<boolean>(true);
  const [connectionType, setConnectionType] = useState<NetInfoStateType>(NetInfoStateType.unknown);

  useEffect(() => {
    // Listen for network status changes
    const unsubscribe = NetInfo.addEventListener((state: NetInfoState) => {
      setIsConnected(state.isConnected ?? true); // Default to 'true' if null/undefined
      setConnectionType(state.type); // Update the connection type (e.g., wifi, cellular)
    });

    // Cleanup function when component unmounts
    return () => unsubscribe();
  }, []);

  return {isConnected, connectionType};
};

export default useNetworkConnectivity;
