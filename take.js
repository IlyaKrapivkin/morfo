import * as fs from 'fs'

async function take() {
  const pathIn = `./take_in`
  const pathOut = `./take_out`
  const extOut = `txt`

  const rgxGlagol = /=V/g
  const rgxSovers = /,pf/g
  const rgxNesove = /ipf/g
  const rgxProshe = /praet/g
  const rgxNastoy = /praes/g
  const rgxInfini = /=inf/g
  const rgxSushes = /anim=nom|inan=nom|anim=gen|inan=gen|anim=dat|inan=dat|anim=acc|inan=acc|anim=ins|inan=ins|anim=part|inan=part|anim=loc|inan=loc|anim=voc|inan=voc/g
  const rgxPrilag = /=A=/g
  const rgxNarech = /=ADV/g

  const fileNameArr = await fs.promises.readdir(pathIn)

  fileNameArr.forEach(async(fileName) => {
    const fileNameParts = fileName.split(`.`)
    const extIn = fileNameParts[fileNameParts.length -1].toLowerCase()
    if (extIn !== extOut) {
      console.error(`incorrect file extension`)
    }

    const fio = fileNameParts[0].replace(/\s/g, ``)
    if (
      !fio
    ) {
      console.error(`incorrect file name`)
    }

    const dataStr = fs.readFileSync(
      `${pathIn}/${fileName}`,
      { encoding: `utf8` },
    )
    const dataArrByNewLine = dataStr.split(`\n`)

    const countPrilag = dataStr.match(rgxPrilag)?.length || 0

    let wordsPrilag = []

    dataArrByNewLine.forEach(line => {
      if (!line) {
        return
      }
      if (rgxPrilag.test(line)) {
        const lineParts = line.split(`{`)
        const word = lineParts[0]
        wordsPrilag.push(
          `${word}\n`
        )
      }
    })

    const strToWrite = ``.concat(
      `прилагательных:   ${countPrilag}\n`,
      `\n`,
      `${wordsPrilag.join(``)}`
    )

    fs.writeFile(
      `${pathOut}/${fio}.${extOut}`,
      strToWrite,
      `utf-8`,
      (err) => {
        if (err) {
          throw err
        }
      },
    )
  })
}

take()