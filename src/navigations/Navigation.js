import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import { initFirebase } from '../api/firebase';

const Navigation = () => {
  const [isReady, setIsReady] = useState(false);

  const onReady = async () => {
    console.log('onReady');
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Asset.fromModule(
          require('../../assets/cover.png')
        ).downloadAsync();

        const app = initFirebase();
        console.log(app);
      } catch (e) {
        console.log(e);
      } finally {
        setIsReady(true);
      }
    })();
  }, []);
  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer onReady={onReady}>
      <AuthStack />
    </NavigationContainer>
  );
};

export default Navigation;
