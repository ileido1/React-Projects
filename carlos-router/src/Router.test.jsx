import { cleanup, render, screen} from "@testing-library/react";
import { describe, it,expect, beforeEach,vi } from "vitest";
import Router from "./Router";
import { getCurrentPath } from "./utils/utils";
vi.mock("./utils/utils", () => ({

    getCurrentPath: vi.fn()

}));
describe('Router', () => {
    beforeEach(() => {
       cleanup()
       vi.clearAllMocks()
    })
it('should be true', () => {
   render(<Router routes={[]} ></Router>)
   expect(true).toBeTruthy()
})
it('shoud render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={()=><h1>404</h1>}></Router>)
    expect(screen.getByText('404')).toBeTruthy()
})

it('should render the component of the first route that matches', () => {
   getCurrentPath.mockReturnValueOnce('/')
    const routes = [
        { path: '/', Component: () => <h1>home</h1> },
        { path: '/about', Component:() => <h1>About</h1> }
    ]
    render(<Router routes={routes} ></Router>)
    expect(screen.getByText('home')).toBeTruthy()


})
})