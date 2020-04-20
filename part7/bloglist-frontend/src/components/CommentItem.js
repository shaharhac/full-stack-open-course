import React from "react";
import { Comment } from "semantic-ui-react";

const CommentItem = ({ text }) => (
  <Comment>
    <Comment.Avatar src="https://www.pngfind.com/pngs/m/42-428449_anonymous-avatar-face-book-hd-png-download.png" />
    <Comment.Content>
      <Comment.Author as="a">Anonymous</Comment.Author>
      <Comment.Metadata>
        <div>Today at 5:42PM</div>
      </Comment.Metadata>
      <Comment.Text>{text}</Comment.Text>
    </Comment.Content>
  </Comment>
);

export default CommentItem;
