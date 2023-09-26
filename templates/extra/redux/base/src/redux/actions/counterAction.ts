export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

export const counterAction = (payload = 1) => ({
  type: INCREMENT_COUNTER,
  payload,
});
