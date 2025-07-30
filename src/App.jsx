import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import ExpenseForm from "./components/ExpenseForm";
import Reports from "./pages/Report";



const App =() => {

  return (
    <> 
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/main" element={<MainLayout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
        <Route path="add-transaction" element={<ExpenseForm/>}/>
        <Route path="reports" element={<Reports/>}/>
      
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
