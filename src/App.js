import React from "react";
import { Route, Switch } from "react-router-dom";
import ClientList from "./componnets/ClientList";
import Home from "./componnets/Home";
import AddClientData from "./componnets/AddClientData";
import EditClientData from "./componnets/EditClientData";
import Duration from './componnets/Duration'
import { GlobalProvider } from "./context/GlobalState";
import Header from "./componnets/Header";
import Footer from "./componnets/Footer";
import Calculator from './componnets/Calculator'
import About from './componnets/About';

const App = () => {
  return (
    <GlobalProvider>
      <div className="App">
        <Header />
        <main>
          <Switch>
            <Route path="/" component={Duration} exact></Route>
            <Route path="/bandwidth" component={Home} exact></Route>
            <Route path="/edit/:id" component={EditClientData} exact></Route>
            <Route path="/calculator" component={Calculator} exact></Route>
            <Route path="/about" exact>{About}</Route>
          </Switch>
        </main>
        <Footer />
      </div>
    </GlobalProvider>
  );
};

export default App;
