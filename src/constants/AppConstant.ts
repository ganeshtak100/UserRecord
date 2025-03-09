import {Platform} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
export class AppDeviceInfo {
    static isNetworkConnected = true;
    static setNetworkStatus(status: boolean) {
        this.isNetworkConnected = status;
    }

  }
  
export {IS_IOS};
