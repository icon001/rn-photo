import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../env';

export const initFirebase = () => {
  try {
    const app = initializeApp(firebaseConfig);
    initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
    return app;
  } catch (e) {
    console.log(e);
  }
};
