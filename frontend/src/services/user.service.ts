import api from ".";

export const getUserNotifications = async (userId: string) => {
  try {
    const response = await api.get(`users/${userId}/notifications`);

    return response;
  } catch (e) {
    throw e;
  }
};
