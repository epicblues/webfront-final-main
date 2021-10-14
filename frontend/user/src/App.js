import "./App.css";

function App() {
  const counter = (function () {
    let count = 0;
    return {
      increase() {
        ++count;
      },
      decrease() {
        --count;
      },
      show() {
        console.log(count);
      },
    };
  })();
  counter.increase();
  counter.increase();
  counter.show();

  return <div className="App">Hello World</div>;
}

export default App;
