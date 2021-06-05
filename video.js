const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')

const videoPath = path.resolve(__dirname, './videos/Aerial_Shot_of_a_Lighthouse.mp4')

for (const resolution of ['?x1080', '?x720', '?x480', '?x360']) {
  const outputPath = path.resolve(__dirname, `./output/output-${resolution.substr(2)}p.mp4`)
  const reader = fs.createReadStream(videoPath)
  const writer = fs.createWriteStream(outputPath)
  ffmpeg(reader)
    .size(resolution)
    .format('avi')
    .videoCodec('libx264') // .mp4
    .on('start', () => {
      console.log('- start...', resolution)
    })
    .on('error', (err) => {
      console.error(err)
      process.exit()
    })
    .on('end', () => {
      console.log('- success!', resolution)
    })
    // .save(outputPath)
    .pipe(writer)
}
