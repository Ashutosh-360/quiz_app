import React, { useContext } from "react";
import {
  NavigationProvider,
  useNavigation,
} from "../Utilities/Context/NavigationContext.js";
import Login from "../app/loginPage";
import SignUp from "../app/signupPage";
import "../global.css";
import QuizList from "../app/quiz_listing/index.js";

const MainApp = () => {
  const { currentScreen } = useNavigation();
  switch (currentScreen) {
    case "Login":
      return <Login />;
    case "SignUp":
      return <SignUp />;
    case "quiz_listing":
      return <QuizList />;
    default:
      return <Login />;
  }
};

const App = () => {
  return (
    <NavigationProvider>
      <MainApp />
    </NavigationProvider>
  );
};

export default App;
