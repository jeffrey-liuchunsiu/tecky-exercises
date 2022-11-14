import configureMockStore, { MockStoreEnhanced } from "redux-mock-store";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import { IRootState } from "../store";
// import { IAuthState } from "./reducers";
import { fetchLogin } from "./thunk";
describe("Board thunks", () => {
  const arg = "James";
  let store: MockStoreEnhanced<IRootState>;

  beforeEach(() => {
    const mockStore = configureMockStore<IRootState>([thunk]);
    store = mockStore();
  });

  it("should update displayName successfully", async () => {
    const result = {
      displayName: "James",
    };
    fetchMock.post("http://localhost:8080/login", { body: result, status: 400 });
    
    await store.dispatch(fetchLogin(arg));
    const actions = store.getActions();
    expect(actions[0].type).toBe(fetchLogin.pending.type);
    expect(actions[1].type).toBe(fetchLogin.rejected.type)
  });
});
