import api from ".";

export const createTopic = async (data: { name: string }) => {
  try {
    const response = await api.post("/topic", data);

    return response;
  } catch (e) {
    throw e;
  }
};

export const getTopics = async () => {
  try {
    const response = await api.get("/topic");

    return response;
  } catch (e) {
    throw e;
  }
};

export const subscribeToTopic = async (userId: string, topicId: string) => {
  try {
    const response = await api.patch(`users/${userId}/topic/${topicId}/subscribe`);

    return response;
  } catch (e) {
    throw e;
  }
};

export const sendNotificationToTopic = async (topicId: string, data: { message: string }) => {
  try {
    const response = await api.post(`topic/${topicId}/notification`, data);

    return response;
  } catch (e) {
    throw e;
  }
};
