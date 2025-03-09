import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {useAppDispatch} from '../hooks/useRedux';
import {createUser, setLoading, updateUser} from '../store/slices/userSlice';
import {User, UserFormData} from '../types/user';
import {
  normalize,
  respFontSize,
  responsiveHeight,
  responsiveWidth,
} from '../utils/responsive';
import { COLORS } from '../theme/colors';
import { validateEmail, validatePhone } from '../utils/validation';

interface UserFormProps {
  user?: User | null;
  onClose: () => void;
  isNewUser?: boolean;
}

interface FormErrors {
  name: string;
  email: string;
  phone: string;
}

const UserForm: React.FC<UserFormProps> = ({user, onClose,isNewUser=false}) => {
  const [formData, setFormData] = useState<UserFormData>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    phone: '',
  });

  const dispatch = useAppDispatch();

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      phone: '',
    };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Invalid phone format';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (isNewUser && !validateForm()) {
      return;
    }

    try {
      if (user) {
        await dispatch(updateUser({id: user.id, userData: formData})).unwrap();
        ToastAndroid.show('User updated successfully', ToastAndroid.SHORT);
      } else {
       await dispatch(createUser(formData)).unwrap();
        ToastAndroid.show('User created successfully', ToastAndroid.SHORT);
      }
      dispatch(setLoading({loading: false}));
      onClose();
    } catch (error) {
      console.log('handleSubmit error', error);
      onClose();
      dispatch(setLoading({loading: false}));
      Alert.alert('Error', error.toString() || 'Failed to update user. Please try again.');

    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.modalContainer}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>{user ? 'Edit User' : 'Add New User'}</Text>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, errors.name && styles.inputError]}
            placeholder="Name"
            value={formData.name}
            onChangeText={text => {
              setFormData({...formData, name: text});
              setErrors({...errors, name: ''});
            }}
            placeholderTextColor="#999"
          />
          {errors.name ? (
            <Text style={styles.errorText}>{errors.name}</Text>
          ) : null}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, errors.email && styles.inputError]}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => {
              setFormData({...formData, email: text});
              setErrors({...errors, email: ''});
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />
          {errors.email ? (
            <Text style={styles.errorText}>{errors.email}</Text>
          ) : null}
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.input, errors.phone && styles.inputError]}
            placeholder="Phone"
            value={formData.phone}
            onChangeText={text => {
              setFormData({...formData, phone: text});
              setErrors({...errors, phone: ''});
            }}
            keyboardType="phone-pad"
            placeholderTextColor={COLORS.text.light}
          />
          {errors.phone ? (
            <Text style={styles.errorText}>{errors.phone}</Text>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}>
            <Text style={styles.buttonText}>{user ? 'Update' : 'Create'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formContainer: {
    backgroundColor: COLORS.white,
    marginHorizontal: responsiveWidth(16),
    marginVertical: responsiveHeight(16),
    padding: normalize(16),
    borderRadius: normalize(8),
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: normalize(4),
  },
  title: {
    fontSize: respFontSize(20),
    fontWeight: 'bold',
    marginBottom: normalize(16),
    textAlign: 'center',
    color: COLORS.text.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: normalize(4),
    padding: normalize(12),
    marginBottom: normalize(12),
    fontSize: respFontSize(16),
    color: COLORS.text.primary,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(16),
  },
  button: {
    flex: 1,
    padding: normalize(12),
    borderRadius: normalize(4),
    alignItems: 'center',
    marginHorizontal: responsiveWidth(4),
  },
  submitButton: {
    backgroundColor: COLORS.success
  },
  cancelButton: {
    backgroundColor: COLORS.red,
  },
  buttonText: {
    color: 'white',
    fontSize: respFontSize(16),
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: normalize(12),
  },
  inputWrapper: {
    marginBottom: normalize(16),
  },
  inputError: {
    borderColor:COLORS.danger
  },
  errorText: {
    color: COLORS.danger,
    fontSize: respFontSize(12),
    marginTop: normalize(4),
  },
});

export default UserForm;
