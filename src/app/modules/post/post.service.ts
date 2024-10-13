import { IPost } from './post.interface'
import { Post } from './post.model'

class Service {
  async createPost(post: IPost) {
    return await Post.create(post)
  }

  async deletePost(postId: string) {
    await Post.findByIdAndDelete(postId)
  }

  async updatePost(postId: string, updates: Partial<IPost>) {
    return await Post.findByIdAndUpdate(postId, updates, { new: true })
  }

  async upvotePost(postId: string) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { upvote: 1 } },
      { new: true },
    )
  }

  async downvotePost(postId: string) {
    return await Post.findByIdAndUpdate(
      postId,
      { $inc: { downvote: 1 } },
      { new: true },
    )
  }
}

export const PostService = new Service()
