import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";
import BigTweet from "./BigTweet";
import Bookmarks from "./Bookmarks";
import HomeFeed from "./HomeFeed";
import Navbar from "./Navbar";
import Notifications from "./Notifications";
import Profile from "./Profile";
import User from "./User";

const App = () => {
  return (
    <BrowserRouter>
    <GlobalStyle />
    <Wrapper>
      
      <Navbar />
      
      <Routes>
        <Route path="/home" element={<HomeFeed />} />
        <Route path="/profile" element={<User />} />
        <Route path="/:profileId" element={<Profile/>} />
        <Route path="/notifications" element={<Notifications/>} />
        <Route path="/bookmarks" element={<Bookmarks/>} />
        <Route path="/tweet/:tweetId" element={<BigTweet/>}/>
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

const Wrapper = styled.div`
  /* border: 1px solid purple; */
  width: 100%;
  height: 100vh;
  display: flex;

`

export default App;
