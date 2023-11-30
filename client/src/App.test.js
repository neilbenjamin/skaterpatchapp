import { render } from "@testing-library/react";
import App from "./App";

test("renders App snapshot", () => {
  //Utiising the asFragmant property in th render Object which takes a snapshot of HTML structure of the component selected. 
  const { asFragment } = render(<App />);
  expect(asFragment()).toMatchSnapshot();
});
