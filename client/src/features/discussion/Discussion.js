import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { fetchAllPosts } from './discussionSlice'
import { resetProfile } from '../profile/profileSlice'
import { Container, Col, Row } from 'react-bootstrap'
import CourseTab from './CourseTab'
import PostList from './PostList'
import Post from './Post'
import AskQuestion from './AskQuestion'



function Discussion() {
  const dispatch = useDispatch()
  const redirect = useNavigate()
  const [componentHeight, setComponentHeight] = useState('calc(100vh - 56px)')

  const discussion = useSelector(state => state.discussion)
  const currentPost = useSelector(state => state.discussion.currentPost)

  const [displayAskQuestion, setDisplayAskQuestion] = useState(false)

  const [sortBy, setSortBy] = useState("relevant") // relevant || latest || earliest || upvotes
  const [tags, setTags] = useState([])

  const fetchPosts = () => {

  }

  // useEffect(() => {
  //   console.log(discussion)
  // }, [discussion])

  useEffect(() => {
    dispatch(fetchAllPosts({
      sort_order: sortBy, 
      tags: tags})
    )
    .unwrap()
    .then((response) => {
      // Ensure session is still valid - if not re-login 
      if (response.result === "Invalid Session Key") {
        dispatch(resetProfile())
        redirect('/login')
      }
    })
    .catch(error => {
      alert("An error occured please try again or refresh the page")
      console.log(error)
    })
  }, [sortBy])


  return (
    <Container fluid className='border-top border-secondary' style={{height: `${componentHeight}`, maxHeight:`${componentHeight}`}}> {/*style={{height: `${componentHeight}px`}}*/}
      <Row className=' h-100'>
        <Col sm={2} xs={2} className='border-end border-secondary p-0 m-0'>
          <CourseTab setDisplayAskQuestion={setDisplayAskQuestion}/>
        </Col>
        <Col sm={3} xs={3} className='border-end border-secondary p-0 m-0'>
          <PostList sortBy={sortBy} setSortBy={setSortBy} setDisplayAskQuestion={setDisplayAskQuestion}/>
        </Col>
        <Col className="border">
          {displayAskQuestion ? <AskQuestion setDisplayAskQuestion={setDisplayAskQuestion}/> : <Post componentHeight={componentHeight}/>} {/* Or ask question */}
        </Col>
      </Row>
    </Container>
  )
}

export default Discussion