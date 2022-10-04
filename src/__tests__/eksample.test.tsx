import{render, screen, cleanup} from "@testing-library/react"
import UserDetailCard from "../Components/DetailCards/UserDetailCard"
import { User } from "../Resources/ResponseTypes";
import UsersPage from "../Components/Pages/UsersPage"

test("Should render userDetailCard", ()=>{
    let user : User = ({
        id: 62388,
        name: "Simen Seeberg-Rommetveit"
    });

    // render (<UserDetailCard focusUser={user} />);
    render(<UsersPage/>);
    const userDetailCardElement = screen.getByTestId("testUserDetailCard");
    expect(userDetailCardElement).toBeInTheDocument();
})