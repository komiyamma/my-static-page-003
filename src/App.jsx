import { useImmerReducer } from "use-immer"
import { current } from "use-immer"

function reducer(draft, action) {
  switch (action.type) {
    case "increment_age":
      draft.age++;
      return;
    case "change_name":
      draft.name = action.payload;
      return;
    default:
      return;
 }
}

export default function App() {
  const [state, dispatch] = useImmerReducer(reducer, {
    name: "John Doe",
    age: 30
  });

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <div style={{ marginTop: 12 }}>
        <label>
          Name:
          <input
            aria-label="name"
            style={{ marginLeft: 8 }}
            value={state.name}
            onChange={(e) =>
              dispatch({ type: "change_name", payload: e.target.value })
            }
          />
        </label>
      </div>
      <div style={{ marginTop: 8 }}>
        <button onClick={() => dispatch({ type: "increment_age" })}>
          +1 year
        </button>
      </div>
    </div>
  );
}
