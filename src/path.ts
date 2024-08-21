const paths = {
  home() {
    return '/'
  },
  topicShow(TopicSlug: string) {
    return `/topics/${TopicSlug}`
  },
  postCreate(TopicSlug: string) {
    return `/topics/${TopicSlug}/posts/new`
  },
  postShow(TopicSlug: string, postId: string) {
    return `/topics/${TopicSlug}/posts/${postId}`
  }
}

export default paths