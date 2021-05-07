let state = {
  isFetchingContacts: true,
  isFetchingUser: true,
  contacts: [
    {
      avatar:
        "",
      cell: "",
      email: "",
      favorite: false,
      id: "",
      name: "",
      phone: "",
    },
  ],
  search:"",
  its: [],
  itsFilterd:[],
  user: {},
  error: false,
};

const listeners = [];

export default {
  getState() {
    return state;
  },
  setState(newState) {
    state = { ...state, ...newState };
    listeners.forEach((listener) => listener());
  },
  onChange(newListener) {
    listeners.push(newListener);
    return () => listeners.filter((listener) => listener !== newListener);
  },
};
