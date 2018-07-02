/**
 * module to handle the urlshortener challenge
 */

const randomizeNumber = () => {
  return Math.floor(Math.random() * (999999 - 1 + 1) + 1)
}
const validateUrl = value => {
  const testurl = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return testurl.test(value)
}
const searchId = (id, urls) => {
  // return !!urls.find(item=>item.urlid===id);
  const result = urls.find(item => item.urlid === id)
  if (result) {
    return true
  }
  return false
}
const createShortUrl = value => {
  const isvalid = validateUrl(value.url)
  const listofUrls = [...value.urls]
  if (isvalid) {
    let randomId = randomizeNumber()
    while (searchId(randomId, listofUrls)) {
      randomId = randomizeNumber()
    }
    return {
      shortId: randomId,
      shortened_url:
        process.env.NODE.env !== 'production'
          ? `http://localhost:5000/api/short/${randomId}`
          : `https://freecodecampapichallenges.herokuapp.com/api/short/${randomId}`,
      original_url: value.url
    }
  }
  return {shortId: -1, original_url: value.url, shortened_url: 'NOK'}
}
export default createShortUrl