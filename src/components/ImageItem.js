import React from 'react'
import PropTypes from 'prop-types'
import '../Assets/styleSheets/base.scss'

const ImageItem = ({data}) => (
  <div className="itemimage">
    <div className="imageTitle">{data.name}</div>
    <hr />
    <div className="containerImage">
      <img src={data.link} alt={data.name} width={128} height={128} />
    </div>
    <hr />
    <div className="infoFile">
      <div>Height:{data.height}</div>
      <div>Width: {data.width}</div>
      <div>thumbnail height: {data.thumbHeight}</div>
      <div>thumbnail width: {data.thumbWidth}</div>
      <div>File size: {data.sizefile}</div>
    </div>
  </div>
)
ImageItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    height: PropTypes.number,
    width: PropTypes.number,
    thumbHeight: PropTypes.number,
    thumbWidth: PropTypes.number,
    filesize: PropTypes.number
  })
}
export default ImageItem
