/**
 * module to handle the logic behind the header parser challenge
 */

const parseosInformation = request => {
  const data = request.headers['user-agent']
  const result = {}
  if (/mobile/i.test(data)) {
    result.Mobile = true
  }

  // checks the os information from the argument

  // if windows osx mobile
  if (/like Mac OS X/.test(data)) {
    result.iOS = /CPU( iPhone)? OS ([0-9\._]+) like Mac OS X/
      .exec(data)[2]
      .replace(/_/g, '.')
    result.iPhone = /iPhone/.test(data)
    result.iPad = /iPad/.test(data)
  }

  if (/Android/.test(data))
    result.Android = /Android ([0-9\.]+)[\);]/.exec(data)[1]

  if (/webOS\//.test(data)) {
    result.webOS = /webOS\/([0-9\.]+)[\);]/.exec(data)[1]
  }

  if (/(Intel|PPC) Mac OS X/.test(data)) {
    data.Mac =
      /(Intel|PPC) Mac OS X ?([0-9\._]*)[\)\;]/
        .exec(data)[2]
        .replace(/_/g, '.') || true
  }

  if (/Windows NT/.test(data)) {
    result.Windows = /Windows NT ([0-9\._]+)[\);]/.exec(data)[1]
  }
  //
  return result
}
const parseMetadataHeader = request => {
  let clientip = ''
  const {headers, connection, ip} = request
  if (request.headers['x-forwarded-for']) {
    const forwardheader = headers['x-forwarded-for'].split(',')
    const {first} = forwardheader
    clientip = first
  } else if (request.connection && request.connection.remoteAddress) {
    clientip = connection.remoteAddress
  } else {
    clientip = ip
  }
  return {
    address: clientip,
    clientLanguage: headers['accept-language']
      ? headers['accept-language'].split(',')[0]
      : 'NO INFO',
    clientOsInfo: parseosInformation(request)
  }
}

export default parseMetadataHeader
