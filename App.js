import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import RedYellow from "./src/components/redYellow";
import LeaderBoard from "./src/components/leaderBoard";

const MainNavigator = createStackNavigator({
  Home: { screen: RedYellow },
  LeaderBoard: { screen: LeaderBoard }
});

const App = createAppContainer(MainNavigator);

export default App;
