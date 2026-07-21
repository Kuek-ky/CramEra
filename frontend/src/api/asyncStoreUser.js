import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUserData = async (userId, userName, userEmail) => {
  try {
    console.log("aaaaa");
    // AsyncStorage requires all values to be strings.
    // multiSet takes an array of [key, value] arrays.
    await AsyncStorage.multiSet([
      ['userId', String(userId)],
      ['userName', String(userName)],
      ['userEmail', String(userEmail)]
    ]);
    console.log(userId, userName, userEmail);
  } catch (e) {
    console.log("not oki :(");
    console.log(e);
    throw new Error("error in saving userData");
  }
};

export const getStoredUserId = async () => {
  try {
    const value = await AsyncStorage.getItem('userId');
    console.log("val ->", value);
    return value;
  } catch (e) {
    throw new Error("error in getting user ID, something went wrong");
  }
};

export const getStoredUserName = async () => {
  try {
    const value = await AsyncStorage.getItem('userName');
    console.log("val ->", value);
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
    console.log("val ->", value);
    if (value !== null) {
      return value;
    }
    return "error in getting user email, user email is null";
  } catch (e) {
    throw new Error("error in getting user email, something went wrong");
  }
};