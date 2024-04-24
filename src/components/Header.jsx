import { Link, Routes, Route } from 'react-router-dom';
import CompletedTodo from './CompletedTodo';
import TodoList from './TodoList';

function Header() {
  return (
    <div>
      <h1
        className="text-8xl font-black text-white"
        style={{
          color: '#1e293b',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          fontFamily: 'Satisfy',
        }}
      >
        Todo List
      </h1>

      <nav
        className="space-x-6 text-xl font-black mt-10"
        style={{
          color: '#1e293b',
          textDecoration: 'underline',
        }}
      >
        <Link to="/" className="hover:text-[#6b7d86]">
          Todos
        </Link>
        <Link to="/completed" className="hover:text-[#6b7d86]">
          Completed Todos
        </Link>
      </nav>
      <Routes>
        <Route path="/" index element={<TodoList />} />

        <Route path="/completed" element={<CompletedTodo />} />
      </Routes>
    </div>
  );
}

export default Header;
