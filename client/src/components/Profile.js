import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import { COLORS } from "../constants";
import {FiMessageCircle, FiRepeat, FiHeart, FiShare} from "react-icons/fi";
import {CircularProgressbar} from 'react-circular-progressbar';
import { NavLink } from "react-router-dom";

const Profile = () => {
    const location = useLocation();
    const {pathname} = location;
    const [profile, setProfile] = useState();
    const [profileTweets, setProfileTweets] = useState();
    const [tweetIdsArr, setTweetIdsArr] = useState([]);
    const [tweetData, setTweetData] = useState(null);
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
        fetch(`/api/${pathname}/profile`)
        .then(res => res.json())
        .then(data => {
            console.log(data.profile);
            setProfile(data.profile)})
        
        fetch(`/api/${pathname}/feed`)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setTweetData(data.tweetsById);
            setTweetIdsArr(data.tweetIds)
        })

    }, [])

    // 9 tweets 
    return (

        <Wrapper>
        

            <ProfileWrapper>
                {
                !profile ? <></> :
                <>
                <BannerContainer>
                    <Banner src={profile.bannerSrc} />
                </BannerContainer>
                <PicContainer>
                    <AuthorPic src={profile.avatarSrc}/>
                    <IsFollowing><IsFollowingSpan>{profile.isBeingFollowedByYou === true ? "Following" : "Follow"}</IsFollowingSpan></IsFollowing>
                </PicContainer>
                <ProfileInfoContainer>
                    <TwitterName>{profile.displayName}</TwitterName>
                    <Container>
                        <TwitterHandle>@{profile.handle}</TwitterHandle>{!profile.isFollowingYou ? <></> : <IfFollows>Follows you</IfFollows>}
                    </Container>
                    <Bio>{profile.bio}</Bio>
                    <Container>
                        {profile.location !== undefined ? <Location>Whitehall</Location>:<></>}<Joined>Joined {format(new Date(profile.joined), "LLLL yyyy")}</Joined>
                    </Container>
                    <Container>
                        <Following>{profile.numFollowing} Following</Following><Followers>{profile.numFollowers} Followers</Followers>
                    </Container>
                    <DisplayContainer>
                        <TweetButton>Tweets</TweetButton><Button>Media</Button><Button>Likes</Button>
                    </DisplayContainer>
                </ProfileInfoContainer>

                </>
                }
            </ProfileWrapper>
            {
                !profileTweets && !tweetIdsArr ? <></> :
                <TweetWrapper>
                    {tweetIdsArr.map(tweetId => {
                    const tweetMedia = tweetData[tweetId].media;
                    return (
                    <NavItem to={`/tweet/${tweetId}`}>
                    <SingleTweetWrapper>
                        <FeedPicContainer>
                            <ProfilePic src={tweetData[tweetId].author.avatarSrc} />
                        </FeedPicContainer>

                        <TweetInfo>
                        {tweetData[tweetId].retweetFrom !== undefined ? 
                        <RetweetFrom><FiRepeat/>{tweetData[tweetId].retweetFrom.displayName} Remoewed</RetweetFrom>
                        :
                        <></>
                        }
                        
                            <TweetAuthor>
                            <NavHandleItem to={`/${tweetData[tweetId].author.handle}`} state={{handle: `${tweetData[tweetId].author.handle}`}}><SingleTwitterName>{tweetData[tweetId].author.displayName}</SingleTwitterName></NavHandleItem><SingleTwitterHandle>@{tweetData[tweetId].author.handle}</SingleTwitterHandle><TweetDate>• {format(new Date(tweetData[tweetId].timestamp), "PP")}</TweetDate>
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
                            <IconWrapper>
                            <ButtonContainer>
                                    <TweetButtonBar><MessageIcon /></TweetButtonBar>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButtonBar><Retweet>{tweetData[tweetId].numRetweets}</Retweet></TweetButtonBar>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButtonBar value={tweetId} onClick={e => fillButton(e.currentTarget.value)}><Like id={tweetId}/></TweetButtonBar>
                                    <CountLikes id={tweetId + "1"}></CountLikes>
                                </ButtonContainer>
                                <ButtonContainer>
                                    <TweetButtonBar><Share/></TweetButtonBar>
                                </ButtonContainer>
                            </IconWrapper>
                        </TweetInfo>
                    </SingleTweetWrapper>
                    </NavItem>
                    )
                    })}
                </TweetWrapper>
            }
            
        </Wrapper>
    );
}

const TweetButtonBar = styled.button`
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
`

const SingleTwitterName = styled.h3`
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 10px;
`

const SingleTwitterHandle = styled.h4`
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

const ProfilePic = styled.img`
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

const FeedPicContainer = styled.div`
    /* border: 1px solid green; */
    width: 10%;
    display: flex;
    justify-content: center;
    align-items: flex-start;

`

const SingleTweetWrapper = styled.div`
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    display: flex;
    flex-wrap: nowrap;
    height: auto;
    /* max-height: 400px; */
`

const TweetInfo = styled.div`
    /* border: 1px solid black; */
    width: 100%;
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

const NavHandleItem = styled(NavLink)`
    text-decoration: none;
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

const Wrapper = styled.div`
    width: 65%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const ProfileWrapper = styled.div`
    /* border-left: 1px solid black; */
    /* border-right: 1px solid black; */
    /* position: absolute;
    top: 0; */
    height: 60%;
    width: 100%;
    margin-bottom: 60px;
`

const BannerContainer = styled.div`
    /* border: 1px solid green; */
    width: 100%;
    height: 50%;
`

const PicContainer = styled.div`
    /* border: 1px solid yellow; */
    width: 100%;
    height: 25%;
    position: relative;
    top: -60px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

`

const ProfileInfoContainer = styled.div`
    width: 100%;
    height: 60%;
    /* border: 5px solid pink; */
    /* position: relative; */
    /* top: -110px; */
    margin: 0;
    padding: 0;
        /* border-left: 1px solid black; */
    /* border-right: 1px solid black; */

`

const AuthorPic = styled.img`
    border: 5px solid white;
    border-radius: 50%;
    height: 100%;
    width: auto;
    margin-left: 20px;
    z-index: 999;
    
`

const IsFollowing = styled.div`
    z-index: 999;
    /* border: 1px solid pink; */
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 15px;
`

const IsFollowingSpan = styled.span`
    z-index: 998;
    margin-right: 20px;
    padding-top: 20px;
    background-color: ${COLORS.primary};
    height: auto;
    font-weight: bold;
    border-radius: 20px;
    padding: 10px;
    margin-top: 0;
    color: white;
`

const Banner = styled.img`
    /* border: 1px solid black; */
    height: 100%;
    width: 100%;
    object-fit: cover;

`

const Container = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 0;
    padding: 0;
`

const TwitterName = styled.h2`
    /* border: 1px solid black; */
    margin: 0;
    padding: 0;
    /* margin-top: 60px; */
    margin-left: 20px;

`

const TwitterHandle = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 5px;
    margin-left: 20px;

`

const IfFollows = styled.span`
    margin: 0;
    padding: 0;
    margin-top: 5px;
    margin-left: 10px;
    background-color: rgb(232,232,232);
    border-radius: 20px;
    padding: 5px;

`

const Bio = styled.p`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 20px;

`

const Location = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 20px;

`

const Joined = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 20px;

`

const Following = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 20px;

`

const Followers = styled.h4`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    margin-left: 20px;

`

const DisplayContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    /* border: 1px solid purple; */
    /* position: relative; */
    /* top: -350px; */
    border-bottom: 1px solid black;
    margin-top: 20px;
    

`

const TweetButton = styled.button`
    width: 33%;
    border: none;
    background-color: inherit;
    font-weight: bold;
    padding-bottom: 10px;
    color: ${COLORS.primary};
    border-bottom: 3px solid ${COLORS.primary};
`

const Button = styled.button`
    width: 33%;
    border: none;
    background-color: inherit;
    font-weight: bold;
    padding-bottom: 10px;
    &.active {
        color: ${COLORS.primary};
        border-bottom: 1px solid ${COLORS.primary};
    }
    &:hover {
        color: ${COLORS.primary};
        border-bottom: 3px solid ${COLORS.primary};
    }
`

const TweetWrapper = styled.div`
    /* border: 1px solid red; */
    width: 100%;
    /* position: absolute; */
    margin-top: 555px;
    z-index: 1000;
`

export default Profile;