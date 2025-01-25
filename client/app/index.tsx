import React, { useContext } from "react";
import { NavigationProvider, useNavigation } from "../Utilities/Context/NavigationContext.js";
import Login from "../app/loginPage";
import SignUp from "../app/signupPage";
import "../global.css"
import QuizList from '../app/quizListing/index.js'


const MainApp = () => {
  const { currentScreen } = useNavigation();
  console.log("jey",currentScreen)
  switch (currentScreen) {
   
    case "Login":
      return <Login />;
    case "SignUp":
      return <SignUp />;
    case "QuizListing":
      return <QuizList/>;
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
