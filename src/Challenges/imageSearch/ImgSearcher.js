import Axios from 'axios'

/**
 * module to handle the logic behind the image search challenge
 */

const endpoint = 'https://www.googleapis.com/customsearch/v1'

const fetchSingle = value => {
  return new Promise((resolve, reject) => {
    Axios.get(endpoint, {
      params: {
        key: value.key,
        cx: value.cx,
        q: value.query,
        searchType: 'image',
        num: value.items,
        safe: 'off'
      }
    })
      .then(response => {
        const result = response.data.items.map(item => {
          return {
            titleimage: item.title,
            urllink: item.link,
            width: item.image.width,
            height: item.image.height,
            thumbnailHeight: item.image.thumbnailHeight,
            thumbnailWidth: item.image.thumbnailWidth,
            sizefile: item.image.byteSize
          }
        })
        resolve({data: result})
      })
      .catch(error => {
        console.log('====================================')
        console.log(
          `search images error=>${JSON.stringify(error.message, null, 2)}`
        )
        console.log('====================================')
        reject(
          new Error(
            `error fetching images\n:${JSON.stringify(error.message, null, 2)} `
          )
        )
      })
  })
}

const searchImages = value => {
  return new Promise((resolve, reject) => {
    fetchSingle(value)
      .then(result => {
        resolve({searchresults: result.data})
      })
      .catch(err => {
        reject(
          new Error(`Error searching images:\n${JSON.stringify(err, null, 2)}`)
        )
      })
  })
}
export default searchImages
