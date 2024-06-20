import { createStore } from 'vuex';
import auth from './auth';
import folder from './folderSecond';

const store = createStore({
  modules: {
    auth,
    folder,
  }
});

export default store;



