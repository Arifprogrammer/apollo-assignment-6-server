import { ObjectId } from 'mongoose'
import QueryBuilder from '../../builder/QueryBuilder'
import { TImageFiles } from '../../interface/image.interface'
import { IPost } from './post.interface'
import { Post } from './post.model'

class Service {
  async getAllPost(query: Record<string, unknown>) {
    const itemQuery = new QueryBuilder(
      Post.find().populate('user').populate('comment'),
      query,
    )
      .filter()
      .search(['category'])
      .sort()
      .paginate()
      .fields()

    const result = await itemQuery.modelQuery

    return result
  }

  async getMyPost(userId: ObjectId) {
    return Post.find({ id: userId })
  }

  async createPost(post: IPost, images: TImageFiles) {
    const { itemImages } = images
    post.images = itemImages.map(image => image.path)

    return await Post.create(post)
  }

  async deletePost(postId: string) {
    await Post.findByIdAndDelete({ id: postId })
  }

  async updatePost(postId: string, updates: Partial<IPost>) {
    return await Post.findByIdAndUpdate({ id: postId }, updates, { new: true })
  }

  async upvotePost(postId: string) {
    return await Post.findByIdAndUpdate(
      { id: postId },
      { $inc: { upvote: 1 } },
      { new: true },
    )
  }

  async downvotePost(postId: string) {
    return await Post.findByIdAndUpdate(
      { id: postId },
      { $inc: { downvote: 1 } },
      { new: true },
    )
  }
}

export const PostService = new Service()
