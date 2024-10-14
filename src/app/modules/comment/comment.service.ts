import { IComment } from './comment.interface'
import { Comment } from './comment.model'

class Service {
  async createComment(data: IComment) {
    return await Comment.create(data)
  }

  async getCommentsByPostId(postId: string) {
    return await Comment.find({ postId })
  }

  async updateComment(
    commentId: string,
    userId: string,
    updates: Partial<IComment>,
  ) {
    return await Comment.findByIdAndUpdate({ id: commentId, userId }, updates, {
      new: true,
    })
  }

  async deleteComment(commentId: string, userId: string) {
    await Comment.findByIdAndDelete({ id: commentId, userId })
  }
}

export const CommentService = new Service()
