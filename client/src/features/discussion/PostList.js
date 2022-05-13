import React, { useEffect } from 'react'
import { Dropdown, DropdownButton, FormControl, InputGroup, ListGroup, ListGroupItem, SplitButton } from 'react-bootstrap'
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

      <InputGroup className="m-auto w-75">
        <InputGroup.Text>SortBy:</InputGroup.Text>

        <DropdownButton
          variant="outline-secondary"
          title="Dropdown"
          id="input-group-dropdown-2"
          align="end"
        >
          <Dropdown.Item href="#">Action</Dropdown.Item>
          <Dropdown.Item href="#">Another action</Dropdown.Item>
          <Dropdown.Item href="#">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item href="#">Separated link</Dropdown.Item>
        </DropdownButton>
      </InputGroup>

      {/* DisplayList */}
      <ListGroup className='border-top border-dark overflow-auto'>
        {posts.map(post => {
          return <ListGroup.Item className='rounded-0' id={post.post_id} key={post.post_id} onClick={onClickPost} active={(selectedPost === post.post_id)}>{post.title}</ListGroup.Item>
        })}
      </ListGroup>
    </div>
  )
}

export default PostList