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
      <InputGroup className="w-75 my-2 m-auto">
          <FormControl
            className='text-dark rounded-3'
            placeholder="Search for Post"
            aria-label="Search for Posts"
            aria-describedby="basic-addon2"
          />
          <InputGroup.Text id="basic-addon1">
            <img src='/search-interface-symbol.png' className='' style={{width: "20px", height: "20px"}}/>
          </InputGroup.Text>
        </InputGroup>
      {/* SortBy dropdown */}
      {/* DisplayList */}
      <ListGroup className='border-top border-dark'>
        {posts.map(post => {
          return <ListGroup.Item className='rounded-0' id={post.post_id} key={post.post_id} onClick={onClickPost} active={(selectedPost === post.post_id)}>{post.title}</ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default PostList