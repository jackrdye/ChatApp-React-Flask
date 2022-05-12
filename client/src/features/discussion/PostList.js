import React, { useEffect } from 'react'
import { FormControl, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPostDetail } from './discussionSlice'

export function PostList(props) {
  const dispatch = useDispatch()
  const setDisplayAskQuestion = props.setDisplayAskQuestion
  const posts = useSelector(state => state.discussion.posts)
  const selectedPost = useSelector(state => state.discussion.currentPost.postID)
  
  const onClickPost = (e) => {
    e.preventDefault()
    dispatch(fetchPostDetail(e.target.id))
    setDisplayAskQuestion(false)
  }

  return (
    <div>
      {/* SearchBar */}
      <InputGroup className="border-bottom border-dark">
          <FormControl
            className='text-dark rounded-0'
            placeholder="Search for Post"
            aria-label="Search for Posts"
            aria-describedby="basic-addon2"
          />
        </InputGroup>
      {/* SortBy dropdown */}
      {/* DisplayList */}
      <ListGroup>
        {posts.map(post => {
          return <ListGroup.Item className='rounded-0' id={post.post_id} key={post.post_id} onClick={onClickPost} active={(selectedPost === post.post_id)}>{post.title}</ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default PostList