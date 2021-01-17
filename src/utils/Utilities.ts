import {Alert} from 'react-native';

export const validateCredentials = (values) => {
  const phoneNumberPattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  // const zipcodePattern = /[1-9][0-9]{5}/;
  const mailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (
    !values.fullname ||
    !values.email ||
    !values.contact ||
    !values.password
  ) {
    Alert.alert('Empty Fields');
    return false;
  } else if (!values.email.match(mailPattern)) {
    Alert.alert('Invalid Email');
    return false;
  } else if (!values.contact.match(phoneNumberPattern)) {
    Alert.alert('Invalid Contact');
    return false;
  }
  return true;
};

export const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getLocalDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString();
};

export const delCard = (key: number, data: any, setData: any) => {
  const filteredData = data.filter(
    (item: any, index: number) => index.toString() !== key.toString(),
  );
  setData(filteredData);
};
