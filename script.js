let c = document.getElementById('c')
let ctx = c.getContext('2d')

function resize() {
  c.width = window.innerWidth
  c.height = window.innerHeight
}

resize()

window.onresize = resize


function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randProp(obj) {
  let values = Object.values(obj)
  return values[Math.floor(Math.floor()*values.length-1)]
}
// used to sort stuff later
var compare = (a,b) => (a.score < b.score ? 1 : -1)


// let ShapeType = {
//   rect: {
//     draw: function(x,y,w,h) {
//       ctx.fillRect(x,y,w,h)
//     }
//   },
//   circle: {
//     draw: function(x,y,w,h) {
//       let r = (w+h)/2 // radius is the average of the size params
//       ctx.beginPath()
//       ctx.arc(x+r/2,y+r/2,r,0,Math.PI*2,false)
//       ctx.fill()
//     }
//   }
// }


class Shape {
  constructor(x,y,w,h,type,r) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.type = type
    this.r = r

    if (this.w <= 0) this.w = 3
    if (this.h <= 0) this.h = 3

    this.color = getAverageColor(this.x,this.y,this.w,this.h)

    this.draw = function() {
      ctx.save()
      ctx.translate(this.x+this.w/2,this.y+this.h/2)
      ctx.rotate(this.r*Math.PI/180)
      ctx.translate(-(this.x+this.w/2),-(this.y+this.h/2))
      ctx.fillStyle = this.color
      ctx.fillRect(this.x,this.y,this.w,this.h)
      ctx.restore()
    }
  }
}
function randomShape() {
  let w = rand(1,200)
  let h = rand(1,200)
  shapes.push(new Shape(rand(0,c2.width-w),rand(0,c2.height-h),w,h,'',rand(0,360)))
}
function mutate(parent) {
  let w = parent.w + rand(-10,10)
  let h = parent.h + rand(-10,10)
  return new Shape(rand(0,c2.width-w), rand(0,c2.height-h), w, h, parent.type, parent.r + rand(-5,5))
}



// compares the canvas to the original image and returns an arbitrary number. the lower it is,
// the closer we are to the source image.
function getSimilarityScore() {
  let cimg = ctx.getImageData(0,0,c2.width,c2.height)
  let data = cimg.data

  let score = 0
  
  for (var i=0; i<data.length; i+=4) {
    score += deltaE([data[i],data[i+1],data[i+2]], [imgdata[i],imgdata[i+1],imgdata[i+2]])
  }

  return score
}


let shapes = []
let winners = [],
  gen = 0



function simulate() {
  ++gen
  console.log(gen)

  // make a bunch of shapes
  shapes = []
  for (var i=0; i<100; i++) randomShape()

  let prevScore = getSimilarityScore()
  let cycleCount = 3
  
  
  for (var v=0; v<cycleCount; v++) {
    // score each based on how well it contributes to the image
    for (var i=0; i<shapes.length; i++) {
      if (shapes[i].score === undefined) {
        ctx.clearRect(0,0,c.width,c.height)
        drawWinners()
        
        shapes[i].draw()
        shapes[i].score = prevScore - getSimilarityScore()
      }
    }
  
    shapes.sort(compare) // sorts highest-lowest (highest would be better in this scenario because it gets us closer to 0)

    if (v<cycleCount-1) { 
      // the lower scorers die because they were unable to adapt
      shapes = shapes.slice(0,10)

      // the others have children with slight variations
      
      let newArr = []
      shapes.map(shape => {newArr.push(shape)})
      
      for (var i=0;i<shapes.length;i++) {
        for (var x=0; x<2; x++) newArr.push(mutate(shapes[i]))
      }
      shapes = newArr
    }
  }
  

  // after letting natural selection run its course for a few cycles, the best fitting shape is added.
  winners.push(shapes[0])
  

  ctx.clearRect(0,0,c.width,c.height)
  drawWinners()
  setTimeout(simulate,10)
}


function drawWinners() {
  winners.map(weiner => {
    weiner.draw()
  })
}
