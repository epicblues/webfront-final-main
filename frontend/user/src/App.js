import "./App.css";

function App() {
  const counter = (function () {
    // 사실상 class 에서 private member
    let count = 0;
    return {
      // 사실상 class에서 public  member
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
