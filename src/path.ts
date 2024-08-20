const paths = {
  home() {
    return '/'
  },
  topicShow(TopicSlug: string) {
    return `/topic/${TopicSlug}`
  },
  postCreate(TopicSlug: string) {
    return `/topic/${TopicSlug}/posts/new`
  },
  postShow(TopicSlug: string, postId: string) {
    return `/topic/${TopicSlug}/posts/${postId}`
  }
}

export default paths