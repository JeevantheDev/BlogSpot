const initState = {
  projects: [],
  url: "",
};

const projectReducer = (state = initState, action) => {
  switch (action.type) {
    case "CREATE_PROJECT":
    case "UPDATE_PROJECT":
      return state;
    case "UPLOAD_IMAGE":
      return {
        ...state,
        url: action.url,
      };
    case "CREATE_PROJECT_ERROR":
    case "UPDATE_PROJECT_ERROR":
    case "UPLOAD_IMAGE_ERROR":
      console.log("Error Created project ", action.err);
      return state;
    case "DELETE_PROJECT":
      return state;
    case "DELETE_PROJECT_ERROR":
      console.log("Error Created project ", action.err);
      return state;
    default:
      return state;
  }
};
export default projectReducer;
