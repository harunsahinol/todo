import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <div>
      <h1 className="text-6xl font-black">Todo List</h1>

      <div className="space-x-6 text-lg font-bold mt-10">
        <NavLink to="/about">Uncompleted</NavLink>
        <NavLink to="/about">Completed</NavLink>
      </div>
    </div>
  );
}

export default Header;
