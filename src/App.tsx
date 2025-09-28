import { BoardProvider } from "./context/BoardContext";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BoardProvider>
      <Home />
    </BoardProvider>
  );
}

export default App;
