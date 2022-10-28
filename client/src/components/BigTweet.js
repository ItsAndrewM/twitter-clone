import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { COLORS } from "../constants";
import {FiArrowLeft, FiMessageCircle, FiRepeat, FiHeart, FiShare} from "react-icons/fi";
import {CircularProgressbar} from 'react-circular-progressbar';
import { NavLink } from "react-router-dom";

const BigTweet = () => {

    const location = useLocation();
    console.log(location)
    const {pathname} = location;
    const [tweetId, setTweetId] = useState(null);
    const [tweetData, setTweetData] = useState(null);
    const [tweetMedia, setTweetMedia] = useState();
    const [countLikes, setCountLikes] = useState(0);
    const [isToggled, setIsToggled] = useState(false);

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

    useEffect(() => {
        console.log(pathname)
        const splitArr = pathname.split("/")
        const idString = splitArr[2]
        // console.log(idString)
        setTweetId(idString)
    }, [pathname])

    useEffect(() => {
        fetch("/api/me/home-feed")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const splitArr = pathname.split("/")
            const idString = splitArr[2]
            setTweetData(data.tweetsById[idString]);

            console.log(data.tweetsById[idString])
            setTweetMedia(data.tweetsById[idString].media)
        }) 
    }, [])

    const navigate = useNavigate();

    return (
        <Wrapper>
            <ButtonWrapper>
                <ButtonSpan><BackButton onClick={() => navigate(-1)}><FiArrowLeft style={{width: "30px", height: "auto", margin: "10px",  }}/></BackButton></ButtonSpan><BackText>Meow</BackText>
            </ButtonWrapper>
                {
                !tweetData ? <CircularProgressbar />
                :
                <>
                    <TweetWrapper>
                        <PicContainer>
                            <AuthorPic src={tweetData.author.avatarSrc} />
                        </PicContainer>

                        <TweetInfo>
                        {tweetData.retweetFrom !== undefined ? 
                        
                        <NavHandleItem to={`/${tweetData.retweetFrom.handle}`} state={{handle: `${tweetData.author.handle}`}}><RetweetFrom><FiRepeat/>{tweetData.retweetFrom.displayName} Remoewed</RetweetFrom></NavHandleItem>
                        :
                        <></>
                        }
                        
                            <TweetAuthor>
                            {tweetData.author.handle === "treasurymog" ? 
                            <NavHandleItem to={`/profile`}><TwitterName>{tweetData.author.displayName}</TwitterName></NavHandleItem> 
                            :
                            <NavHandleItem to={`/${tweetData.author.handle}`} state={{handle: `${tweetData.author.handle}`}}><TwitterName>{tweetData.author.displayName}</TwitterName></NavHandleItem>}
                            <TwitterHandle>@{tweetData.author.handle}</TwitterHandle>
                            </TweetAuthor>
                        
                            <TweetContainer>
                                <Tweet>{tweetData.status}</Tweet>
                                {tweetMedia.length === 0 ? <></>
                                :
                                <TweetPhotoContainer>
                                    <TweetPhoto src={tweetMedia[0].url}/>   
                                </TweetPhotoContainer>
                                }
                            </TweetContainer>
                            <DateContainer>
                                <TweetDate>{format(new Date(tweetData.timestamp), "p")} • {format(new Date(tweetData.timestamp), "PP")} • Critter Web App</TweetDate>
                            </DateContainer>
                            <IconWrapper>
                                <ButtonContainer>
                                    <TweetButton><MessageIcon /></TweetButton>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButton><Retweet>{tweetData.numRetweets}</Retweet></TweetButton>
                                </ButtonContainer>
                                <ButtonContainer>
                                <TweetButton value={tweetId} onClick={e => fillButton(e.currentTarget.value)}><Like id={tweetId}/></TweetButton>
                                    <CountLikes id={tweetId + "1"}></CountLikes>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButton><Share/></TweetButton>
                                </ButtonContainer>
                            </IconWrapper>
                        </TweetInfo>
                    </TweetWrapper>
                </>
                }
                
            </Wrapper>
    );
}

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
    width: 65%;
    display: flex;
    flex-direction: column;
    height: auto;
`

const DateContainer = styled.div`
    border-bottom: 1px solid black;
    width: 100%;
    margin-bottom: 15px;
    padding-bottom: 5px;
`

const ButtonWrapper = styled.div`
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border-bottom: 1px solid black;
    padding-top: 20px;
    padding-bottom: 20px;

`

const ButtonSpan = styled.span`
    height: 100%;
    /* border: 1px solid black; */
    margin: 0;
    padding: 0;
    border-radius: 50%;
    width: auto;
    margin-left: 25px;
    padding-bottom: 5px;
    /* z-index: -1; */
    &:hover {
        /* border-radius: 50%; */
        color: white;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
`

const BackButton = styled.button`
    border: none;
    background-color: inherit;
    /* border: 1px solid blue; */
    border-radius: 50%;
`

const BackText = styled.h1`
    margin: 0;
    padding: 0;
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
    border-bottom: 1px solid black;
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
    align-items: flex-start;
    flex-direction: column;
`

const TwitterName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
`

const TwitterHandle = styled.h4`
    font-weight: normal;
    /* padding-left: 8px; */
    margin-top: 5px;
    margin-bottom: 0;
    /* padding-top: 10px; */
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
    font-size: xx-large;
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
`

const Icon = styled.div`

`



export default BigTweet;