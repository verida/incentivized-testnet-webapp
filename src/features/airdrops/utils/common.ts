// TODO: Move in more appropriate folder as more common than just airdrops
export function buildXShareUrl(text: string, inReplyTo?: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURI(text)}${inReplyTo ? `&in_reply_to=${inReplyTo}` : ""}`;
}
