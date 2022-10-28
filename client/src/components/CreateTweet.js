import { useContext, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";

const CreateTweet = ({newTweet, setNewTweet}) => {
    const [count, setCount] = useState(0)
    const [characterLimit, setCharacterLimit] = useState(280)
    const [tweetStatus, setTweetStatus] = useState();

    const {currentUser} = useContext(CurrentUserContext)

    const handleChange = (key, value) => {
        console.log(value)
        setTweetStatus({...tweetStatus, [key]: value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(tweetStatus)
        e.target.reset();
        fetch("/api/tweet", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tweetStatus)
        })
            .then(res => res.json())
            .then((data) => {
            console.log(data);
            setNewTweet(data);
        })
            .catch((error) => {
            window.alert(error);
        })
    }

    return (
        <Wrapper>
            <AvatarContainer>
                {!currentUser ? <></> :
                <Avatar src={currentUser.profile.avatarSrc}/>}
            </AvatarContainer>
            <StyledForm onSubmit={handleSubmit}>
                <Input id="status" type="text" placeholder="What's happening?" onChange={(e) => {
                    setCount(e.target.value.length);
                    handleChange(e.target.id, e.target.value);
                }} />
            
            <Container>
                <TweetButton type="submit" name="meowButton" >MEOW</TweetButton>
                {(characterLimit-count > 55) &&
                (<CharacterCount style={{color: "grey"}}>{characterLimit-count}</CharacterCount>)
                }
                {
                (characterLimit-count < 56 && characterLimit-count > 0) &&
                (<CharacterCount style={{color: "yellow"}}>{characterLimit-count}</CharacterCount>)                    
                }
                {
                (characterLimit-count <= 0) &&
                (<CharacterCount style={{color: "red"}}>{characterLimit-count}</CharacterCount>)                    
                }
            </Container>
            </StyledForm>
        </Wrapper>
    );
}

const StyledForm = styled.form`
    width: 88%;
    margin-bottom: 10px;
`

const Wrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    flex-wrap: wrap;
    /* justify-content: center; */
    /* align-items: center; */

    padding-bottom: 120px;
    margin-bottom: 50px;
`

const Container = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
`

const TweetButton = styled.button`
    width: 100px;
    height: 100%;
    border: none;
    color: white;
    background: ${COLORS.primary};
    border-radius: 25px;
    margin-right: 10px;
    font-weight: bold;
    margin-bottom: 10px;
    &:active {
        transform: scale(0.95);
    }

`

const AvatarContainer = styled.div`
    width: 12%;
    height: 100%;
    /* border: 1px solid black; */
`

const Avatar = styled.img`
    border-radius: 50%;
    width: 80px;
    margin: 5px;
`

const Input = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 0;
    margin: 0;
    border: none;
    text-align: left;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: bold;
    font-size: x-large;
    margin-top: 10px;
    margin-bottom: 10px;
`

const CharacterCount = styled.p`
    margin: 0;
    padding: 0;
    margin-right: 25px;
`

export default CreateTweet;