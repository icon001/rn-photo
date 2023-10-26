import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Keyboard,
  ScrollView,
} from 'react-native';
import { AuthRoutes } from '../navigations/routes';
import Input, { ReturnKeyTypes, InputTypes } from '../components/Input';
import { useCallback, useReducer, useRef } from 'react';
import Button from '../components/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SafeInputView from '../components/SafeInputView';
import TextButton from '../components/TextButton';
import HR from '../components/HR';
import { StatusBar } from 'expo-status-bar';
import { WHITE } from '../colors';
import {
  authFormReducer,
  AuthFormTypes,
  initAuthForm,
} from '../reducers/authFormReducer';

const SingInScreen = () => {
  const navigation = useNavigation();
  const { top, bottom } = useSafeAreaInsets();
  /*
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  */
  const passwordRef = useRef();
  /*
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  */

  const [form, dispatch] = useReducer(authFormReducer, initAuthForm);

  const updateForm = (payload) => {
    const newForm = { ...form, ...payload };
    const disabeld = !newForm.email || !newForm.password;

    dispatch({
      type: AuthFormTypes.UPDATE_FORM,
      payload: { disabled, ...payload },
    });
  };

  useFocusEffect(
    useCallback(() => {
      return () => dispatch({ type: AuthFormTypes.RESET });
    }, [])
  );
  /*  
  useEffect(() => {
    setDisabled(!email || !password);
  }, [email, password]);
  */
  const onSubmit = () => {
    Keyboard.dismiss();
    if (!form.disabled && !form.isLoading) {
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
      console.log(form.email, form.password);
      dispatch({ type: AuthFormTypes.TOGGLE_LOADING });
    }
  };

  return (
    <SafeInputView>
      <StatusBar style="light" />
      <View style={[styles.container, { paddingTop: top }]}>
        <View style={StyleSheet.absoluteFill}>
          <Image
            source={require('../../assets/cover.png')}
            style={{ width: '100%' }}
            resizeMode="cover"
          />
        </View>
        <ScrollView
          style={[styles.form, { paddingBottom: bottom ? bottom + 10 : 40 }]}
          contentContainerStyle={{ alignItems: 'center' }}
          bounces={false}
          keyboardShouldPersistTaps="always"
        >
          <Text>Sign In</Text>
          <Input
            styles={{ container: { marginBottom: 20 } }}
            value={form.email}
            onChangeText={(text) => updateForm({ email: text.trim() })}
            inputType={InputTypes.EMAIL}
            ReturnKeyTypes={ReturnKeyTypes.NEXT}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          <Input
            ref={passwordRef}
            styles={{ container: { marginBottom: 20 } }}
            value={form.password}
            onChangeText={(text) => updateForm({ password: text.trim() })}
            inputType={InputTypes.PASSWORD}
            ReturnKeyTypes={ReturnKeyTypes.DONE}
            onSubmitEditing={onSubmit}
          />
          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={form.disabled}
            isLoading={form.isLoading}
            styles={{
              container: {
                paddingHorizontal: 20,
                marginTop: 20,
              },
            }}
          />
          <HR text={'OR'} styles={{ container: { marginVertical: 30 } }} />
          <TextButton
            title={'회원가입'}
            onPress={() => navigation.navigate(AuthRoutes.SIGN_UP)}
          />
        </ScrollView>
      </View>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  form: {
    flexGrow: 0,
    backgroundColor: WHITE,
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SingInScreen;
