import React from "react";
import { Provider, useDispatch } from "react-redux";
import { store,persistor } from "../redux/store.js";
import { PersistGate } from 'redux-persist/integration/react';
import {
  NavigationProvider,
  useNavigation,
} from "../Utilities/Context/NavigationContext.js";
import Login from "../app/loginPage";
import SignUp from "../app/signupPage";
import QuizList from "../app/quiz_listing/index.js";
import '../global.css'
import MyProfile from './myProfile/index.js'
const MainApp = () => {
  const { currentScreen } = useNavigation();
  const dispatch=useDispatch()
  console.log("dipatch",dispatch)

  
  switch (currentScreen) {
    case "Login":
      return <Login />;
    case "SignUp":
      return <SignUp />;
    case "quiz_listing":
      return <QuizList />;
    case "my_profile":
      return <MyProfile/>;
    default:
      return <Login />;
  }
};

const App = () => {
  return (
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
       <NavigationProvider>
        <MainApp />
      </NavigationProvider>
       </PersistGate>
     
    </Provider>

  );
};

export default App;
