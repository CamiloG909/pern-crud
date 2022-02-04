import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";

function App() {
	return (
		<Fragment>
			<NavBar />
			<main className="App">
				<Routes>
					<Route path="/" element={<TaskList />} />
					<Route path="/new" element={<TaskForm />} />
					<Route path="/:id/edit" element={<TaskForm />} />
					<Route path="/*" element={<div>404</div>} />
				</Routes>
			</main>
		</Fragment>
	);
}

export default App;
