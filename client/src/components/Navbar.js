import styled from "styled-components";
import bannerSrc from "../assets/gitlab-logo-600.svg"
import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import { COLORS } from "../constants";
import { FiHome, FiUser, FiBell, FiBookmark } from "react-icons/fi";

const Navbar = () => {
    return (
        <Wrapper>
            {/* <Banner src={bannerSrc} alt="banner" /> */}
            <Logo />
            <NavBar>
                <NavItem to="/home"><SpanWrapper><FiHome />  Home</SpanWrapper></NavItem>
                <NavItem to="/profile"><SpanWrapper><FiUser/>  Profile</SpanWrapper></NavItem>
                <NavItem to="/notifications"><SpanWrapper><FiBell/>  Notifications</SpanWrapper></NavItem>
                <NavItem to="/bookmarks"><SpanWrapper><FiBookmark/>   Bookmarks</SpanWrapper></NavItem>
                {/* <NavItem to="/order">Order</NavItem> */}
            </NavBar>
        </Wrapper>
    )
}

const Wrapper = styled.div`
    background: white;
    width: 15%;
    height: 100vh;
    flex-wrap: wrap;  
    margin-left: 50px;
    /* margin-right: 0px; */
    /* border: 5px solid blue; */
`

const NavBar = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    width: auto;
    height: 100%;
    /* font-size: 1em; */
    padding-right: 0;
    margin-right: 0;
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    padding: 15px;
    font-weight: bold;
    color: black;
    width: auto;
    font-size: 20px;
    /* border: 5px solid black; */

    &.active {
        color: ${COLORS.primary};
    }

    /* &:hover:not(.active) {
        background-color: ${COLORS.primary};
        border: 1px solid ${COLORS.primary};
        border-radius: 25px;
    } */
`;

const SpanWrapper = styled.span`
    padding: 10px;
&:hover:not(.active) {
        color: white;
        background-color: ${COLORS.primary};
        border: 1px solid ${COLORS.primary};
        border-radius: 25px;
    }
`





const Banner = styled.img`
    width: 50%;
`;



export default Navbar;
