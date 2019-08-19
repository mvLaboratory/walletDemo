let defaultState = {
  Balance: [
    { Name: "default walet1", Value: 100 },
    { Name: "default walet2", Value: 200 },
    { Name: "default walet3", Value: 300 },
    { Name: "default walet4", Value: 400 }
  ]
};

const mainReducer = (state = defaultState, action) => {
  if (action.type === "LOAD_BALANCE") {
    return {
      ...state,
      Balance: action.Balance
    };
  } else {
    return { ...state };
  }
};

export default mainReducer;
