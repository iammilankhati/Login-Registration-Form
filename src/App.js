import "./App.css";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Error from "./components/Error";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path='/' element={<Home />} />
				<Route path='/signin' element={<Signin />} />
				<Route path='/signup' element={<Signup />} />

				<Route path='*' element={<Error />} />
			</Routes>
		</Router>
	);
}

export default App;
