import React, { useEffect, useState } from 'react'
import { FormControl, InputGroup, ListGroup, Form, Col } from 'react-bootstrap'
import "bootstrap-icons/font/bootstrap-icons.css";
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostDetail } from './discussionSlice'

export function PostList(props) {
  const dispatch = useDispatch()
  const setDisplayAskQuestion = props.setDisplayAskQuestion
  const posts = useSelector(state => state.discussion.posts)
  const selectedPost = useSelector(state => state.discussion.currentPost.postID)

  const [searchPost, setSearchPost] = useState("")

  const sortBy = props.sortBy
  const setSortBy = props.setSortBy // relevant || latest || earliest || upvotes
  const sortByDisplay = () => {
    if (sortBy === "relevant") {
      return "Relevance"
    } else if (sortBy === "latest") {
      return "Latest"
    } else if (sortBy === "earliest") {
      return "Earliest"
    } else if (sortBy === "upvotes") {
      return "Upvotes"
    }
  }
  
  const onClickPost = (e) => {
    e.preventDefault()
    dispatch(fetchPostDetail(e.target.id))
    setDisplayAskQuestion(false)
  }

  const displayMatchingPosts = () => {
    if (searchPost === "") {
      return posts
    }
    return posts.filter(post => post.title.includes(searchPost))
  }

  return (
    <div>
      {/* SearchBar */}
      <InputGroup className="w-100 p-2 m-auto">
        <InputGroup.Text id="basic-addon1" 
        className='bg-white border-left-0 bi bi-search mr-0 pr-0'
        style={{borderRight: 0}}>
        </InputGroup.Text>
        <FormControl
          className='text-dark ml-0 pl-0'
          placeholder="Search for Post"
          value={searchPost}
          onChange={(e) => {setSearchPost(e.target.value)}}
          aria-label="Search for Post"
          aria-describedby="basic-addon2"
          style={{borderLeft: 0}}
        />
          
      </InputGroup>

      {/* SortBy dropdown */}
      <InputGroup className="pt-2 ps-2 pe-2 w-100 float-right" align="end">
        <Col className='my-auto'>
        <p className='m-auto me-3'>Sort by:</p>
        </Col>
        <Col>
        <Form.Select
          variant="outline-dark rounded-3"
          title={sortByDisplay()}
          id="input-group-dropdown-2"
        >
          <option onClick={() => {setSortBy("relevant")}} href="#">Relevance</option>  
          <option onClick={() => {setSortBy("latest")}} href="#">Latest</option>
          <option onClick={() => {setSortBy("earliest")}} href="#">Earliest</option>
          <option onClick={() => {setSortBy("upvotes")}} href="#">Upvotes</option>
        </Form.Select>
        </Col>
      </InputGroup>
      
      <hr/>

      {/* DisplayList */}
      <ListGroup className='rounded-0 overflow-auto'>
        {displayMatchingPosts().map(post => {
          return <ListGroup.Item className='rounded-0' id={post.post_id} key={post.post_id} onClick={onClickPost} active={(selectedPost === post.post_id)}>{post.title}</ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default PostList