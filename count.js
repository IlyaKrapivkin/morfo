import * as fs from 'fs'

async function count() {
  const pathIn = `./count_in`
  const pathOut = `./count_out`
  const extOut = `txt`
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

    const countGlagol = dataStr.match(/=V/g)?.length || 0
    const countSovers = dataStr.match(/,pf/g)?.length || 0
    const countNesove = dataStr.match(/ipf/g)?.length || 0
    const countProshe = dataStr.match(/praet/g)?.length || 0
    const countNastoy = dataStr.match(/praes/g)?.length || 0
    const countInfini = dataStr.match(/=inf/g)?.length || 0
    const countSushes = dataStr.match(/anim=nom|inan=nom|anim=gen|inan=gen|anim=dat|inan=dat|anim=acc|inan=acc|anim=ins|inan=ins|anim=part|inan=part|anim=loc|inan=loc|anim=voc|inan=voc/g)?.length || 0
    const countPrilag = dataStr.match(/=A=/g)?.length || 0
    const countNarech = dataStr.match(/=ADV/g)?.length || 0

    const strToWrite = ``.concat(
      `глаголов всего:   ${countGlagol}\n`,
      `соверш глаг.:     ${countSovers}\n`,
      `несоверш глаг.:   ${countNesove}\n`,
      `прош.врем глаг.:  ${countProshe}\n`,
      `наст.врем глаг.:  ${countNastoy}\n`,
      `инфинитивов:      ${countInfini}\n`,
      `существительных:  ${countSushes}\n`,
      `прилагательных:   ${countPrilag}\n`,
      `наречий:          ${countNarech}\n`,
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

count()