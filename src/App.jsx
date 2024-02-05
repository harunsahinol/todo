import { Link } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <>
      <h1 className="text-6xl font-black">Todo List</h1>

      <div className="space-x-6 text-lg underline font-bold mt-10">
        <Link to="/about">Uncompleted</Link>
        <Link to="/about">Completed</Link>
      </div>
    </>
  );
}

export default App;
