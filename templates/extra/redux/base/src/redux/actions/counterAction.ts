export const counterAction = (payload = 1) => {
  return {
    type: 'INCREMENT_COUNTER',
    payload,
  };
};
