import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userId, userName, userEmail) => {
  try {
    // multiSet takes an array of [key, value] arrays.
    await AsyncStorage.multiSet([
      ['userId', String(userId)],
      ['userName', String(userName)],
      ['userEmail', String(userEmail)]
    ]);
  } catch (e) {
    throw new Error("error in saving userData");
  }
};

export const getStoredUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    return value;
  } catch (e) {
    throw new Error("error in getting user ID, something went wrong");
  }
};

export const getStoredUserName = async () => {
  try {
    const value = await AsyncStorage.getItem('userName');
    if (value !== null) {
      return value;
    }
    return "error in getting username, username is null";
  } catch (e) {
    throw new Error("error in getting username, something went wrong");
  }
};

export const getStoredUserEmail = async () => {
  try {
    const value = await AsyncStorage.getItem('userEmail');
    if (value !== null) {
      return value;
    }
    return "error in getting user email, user email is null";
  } catch (e) {
    throw new Error("error in getting user email, something went wrong");
  }
};