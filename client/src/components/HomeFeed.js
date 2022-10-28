import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
// import { CircularProgress } from '@mui/material';
import { format } from "date-fns";
import {FiMessageCircle, FiRepeat, FiHeart, FiShare} from "react-icons/fi";
import {CircularProgressbar} from 'react-circular-progressbar';
import BigTweet from "./BigTweet";
import { NavLink } from "react-router-dom";
import CreateTweet from "./CreateTweet";

const HomeFeed = () => {
    const [tweetData, setTweetData] = useState(null);
    const [tweetIdsArr, setTweetIdsArr] = useState([]);
    const [isToggled, setIsToggled] = useState(false);
    const [newTweet, setNewTweet] = useState();
    


    const ref = useRef(null);

    

    useEffect(() => {
        fetch("/api/me/home-feed")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            setTweetIdsArr(data.tweetIds);
            setTweetData(data.tweetsById);
        }) 

        const testRef = ref.current;
        console.log(testRef)
    }, [newTweet])

    let isActive = false;
    const fillButton = (e) => {
        console.log(e)
        if (isActive === false) {
            document.getElementById(e).style.fill = "#F91880";
            document.getElementById(e + "1").textContent = 1
        isActive = true;
        }
        else if (isActive === true) {
            document.getElementById(e).style.fill = "none";
            document.getElementById(e + "1").textContent = "";
            isActive = false;
        }
    }

    return (

            <Wrapper>
                <CreateTweet newTweet={newTweet} setNewTweet={setNewTweet}/>
                {
                !tweetIdsArr & !tweetData ? <CircularProgressbar />
                :
                <>
                {tweetIdsArr.map(tweetId => {
                    const tweetMedia = tweetData[tweetId].media;
                    return (
                    <TweetWrapper>
                        <PicContainer>
                            <AuthorPic src={tweetData[tweetId].author.avatarSrc} />
                        </PicContainer>
                        
                        <TweetInfo>
                        <NavItem to={`/tweet/${tweetId}`}>

                        <>
                        {tweetData[tweetId].retweetFrom !== undefined ? 
                        <NavHandleItem to={`/${tweetData[tweetId].retweetFrom.handle}`} state={{handle: `${tweetData[tweetId].retweetFrom.handle}`}}><RetweetFrom><FiRepeat/>{tweetData[tweetId].retweetFrom.displayName} Remoewed</RetweetFrom></NavHandleItem>
                        :
                        <></>
                        }
                        
                            <TweetAuthor>
                            <NavHandleItem to={`/${tweetData[tweetId].author.handle}`} state={{handle: `${tweetData[tweetId].author.handle}`}}><TwitterName>{tweetData[tweetId].author.displayName}</TwitterName></NavHandleItem><TwitterHandle>@{tweetData[tweetId].author.handle}</TwitterHandle><TweetDate>• {format(new Date(tweetData[tweetId].timestamp), "PP")}</TweetDate>
                            </TweetAuthor>
                        
                            <TweetContainer>
                                <Tweet>{tweetData[tweetId].status}</Tweet>
                                {tweetMedia.length === 0 ? <></>
                                :
                                <TweetPhotoContainer>
                                    <TweetPhoto src={tweetMedia[0].url}/>   
                                </TweetPhotoContainer>
                                }
                            </TweetContainer>
                            </>
                            </NavItem>
                            <IconWrapper>
                                <ButtonContainer>
                                    <TweetButton><MessageIcon /></TweetButton>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButton><Retweet></Retweet></TweetButton>
                                    {tweetData[tweetId].numRetweets === 0 ? <></> : <CountLikes>{tweetData[tweetId].numRetweets}</CountLikes>}
                                </ButtonContainer>
                                <ButtonContainer >
                                    <TweetButton value={tweetId} onClick={e => fillButton(e.currentTarget.value)}><Like id={tweetId} style={{fill: isToggled ? "#F7E0EB" : "none"}}/></TweetButton>
                                    <CountLikes id={tweetId + "1"}></CountLikes>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButton><Share/></TweetButton>
                                </ButtonContainer>
                            </IconWrapper>
                        </TweetInfo>
                    </TweetWrapper>
                    )
                    })}
                </>
                }
                
            </Wrapper>
    );
}

const CountLikes = styled.h4`
    margin: 0;
    padding: 0;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`

const Wrapper = styled.div`
    border: 1px solid black;
    height: auto;
    width: 65%;
    display: flex;
    flex-direction: column;
`

const TweetButton = styled.button`
    border: none;
    background-color: none;
    background: none;
    z-index: 1000;

    &:hover {
        border: 1px solid white;
        background-color: #F7E0EB;
        border-radius: 50%;
        width: 40px;
        height: auto;
        padding: 2px;
    }

`

const MessageIcon = styled(FiMessageCircle)`
    width: 30px;
    height: auto;

    &.active {
        fill: #F91880;
    }
    &:hover {
        fill: #F7E0EB;
    }
`

const Retweet = styled(FiRepeat)`
    width: 30px;
    height: auto;

    &.active {
        fill: #F91880;
    }
    &:hover {
        fill: #F7E0EB;
    }
`

const Like = styled(FiHeart)`
    width: 30px;
    height: auto;

    &.active {
        fill: #F91880;
    }
    &:hover {
        fill: #F7E0EB;
    }
`

const Share = styled(FiShare)`
    width: 30px;
    height: auto;

    &.active {
        fill: #F91880;
    }
    &:hover {
        fill: #F7E0EB;
    }
`

const NavHandleItem = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    &.active {
        color: black;
    }
    &:hover {
        text-decoration: underline;
    }
`

const NavItem = styled(NavLink)`
    text-decoration: none;
    color: inherit;
    &.active {
        color: black;
    }
    &:hover {
        background-color: rgb(250, 249, 246);
    }
`

const TweetWrapper = styled.div`
    border: 1px solid black;
    display: flex;
    flex-wrap: nowrap;
    height: auto;
    /* max-height: 400px; */
`

const RetweetFrom = styled.h4`
    width: 100%;
    margin-bottom: 0;
    margin-top: 10px;
    padding-bottom: 0;
    padding-top: 0;
    font-weight: normal;
    font-style: italic;
    padding-right: 10px;
`

const TweetInfo = styled.div`
    /* border: 1px solid black; */
    width: 100%;
`
const PicContainer = styled.div`
    /* border: 1px solid green; */
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: flex-start;

`

const AuthorPic = styled.img`
    width: 60px;
    border-radius: 50%;
    margin-top: 20px;

`

const TweetAuthor = styled.div`
    display: flex;
    /* border: 1px solid yellow; */
    width: 100%;
    justify-content: flex-start;
    align-items: center;
`

const TwitterName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
`

const TwitterHandle = styled.h4`
    font-weight: normal;
    padding-left: 8px;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
`

const TweetDate = styled.h4`
    font-weight: normal;
    padding-left: 8px;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;

`

const TweetContainer = styled.div`
    /* border: 1px solid pink; */
    width: 100%;
`

const Tweet = styled.p`
    margin-right: 50px;
    line-height: 25px;
`

const TweetPhotoContainer = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 50px;
    display: flex;
    justify-content: flex-start;
`

const TweetPhoto = styled.img`
    width: 95%;
    /* border: 1px solid pink; */
    border-radius: 20px;
    padding-bottom: 10px;
    /* max-height: 400px; */
    /* overflow: hidden; */
    /* object-fit: scale-down; */
    

`

const IconWrapper = styled.div`
    /* border: 1px solid lime; */
    display: flex;
    justify-content: space-around;
    padding-bottom: 15px;
    /* margin-top: 10px;
    margin-bottom: 10px; */
`

const Icon = styled.div`

`



export default HomeFeed;