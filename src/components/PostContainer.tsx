import React, {FC} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer: FC = () => {
  const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(100);
  const [createPost, {}] = postAPI.useCreatePostMutation();
  const [updatePost, {}] = postAPI.useUpdatePostMutation();
  const [deletePost, {}]= postAPI.useDeletePostMutation();

  const handleCreate = async () => {
    const title = prompt();
    await createPost({title, body: title} as IPost);
  }

  const handleRemove = (post: IPost) => {
    deletePost(post)
  }

  const handleUpdate = (post: IPost) => {
    updatePost(post);
  }

  return (
    <div>
      <div className='post__list'>
        <button onClick={handleCreate}>Add Post</button>
        {isLoading && <h1>Идет загрузка...</h1>}
        {error && <h1>Произошла ошибка при загрузке!</h1>}
        {posts?.map(post => (
          <PostItem remove={handleRemove} update={handleUpdate} key={post.id} post={post}/>
        ))}
      </div>
    </div>
  );
};

export default PostContainer;