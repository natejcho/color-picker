import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Game from "./src/components/game";
import LeaderBoard from "./src/components/leaderBoard";
import Start from "./src/components/start";

const MainNavigator = createStackNavigator({
  Home: { screen: Start },
  LeaderBoard: { screen: LeaderBoard },
  Game: { screen: Game }
});

const App = createAppContainer(MainNavigator);

export default App;
