let c2 = document.createElement('canvas')
let ctx2 = c2.getContext('2d')

let img = new Image()
let imgdata;

img.crossOrigin = "Anonymous"

img.onload = function() {
  c2.width = this.width
  c2.height = this.height

  ctx2.drawImage(this,0,0)

  let imgd = ctx2.getImageData(0,0,c2.width,c2.height)
  imgdata = imgd.data

  simulate()
}

// ??? why does it work
img.src = 'https://i.imgur.com/eQxBTwv.png' + '?' + new Date().getTime()



// https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript

function getAverageColor(x,y,w,h) {
  let imgd = ctx2.getImageData(x,y,w,h)
  let data = imgd.data
  let count = 0

  let rgb = {r: 0, b: 0, g: 0}
  
  for (var i=0, blockSize=4; i<data.length; i+=4*blockSize) {
    count++
    rgb.r += data[i]
    rgb.b += data[i+1]
    rgb.g += data[i+2]
  }

  return `rgba(${~~(rgb.r/count)},${~~(rgb.b/count)},${~~(rgb.g/count)},1)`
}
