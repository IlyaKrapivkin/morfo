import * as path from 'path'
import * as util from 'util'
import * as fs from 'fs'
import * as libre from 'libreoffice-convert'

const fsp = fs.promises
const convertAsync = util.promisify(libre.convert)

function translit(word){
	let answer = ``
	const converter = {
		'а': 'a',    'б': 'b',    'в': 'v',    'г': 'g',    'д': 'd',
		'е': 'e',    'ё': 'e',    'ж': 'zh',   'з': 'z',    'и': 'i',
		'й': 'y',    'к': 'k',    'л': 'l',    'м': 'm',    'н': 'n',
		'о': 'o',    'п': 'p',    'р': 'r',    'с': 's',    'т': 't',
		'у': 'u',    'ф': 'f',    'х': 'h',    'ц': 'c',    'ч': 'ch',
		'ш': 'sh',   'щ': 'sch',  'ь': '',     'ы': 'y',    'ъ': '',
		'э': 'e',    'ю': 'yu',   'я': 'ya',
 
		'А': 'A',    'Б': 'B',    'В': 'V',    'Г': 'G',    'Д': 'D',
		'Е': 'E',    'Ё': 'E',    'Ж': 'Zh',   'З': 'Z',    'И': 'I',
		'Й': 'Y',    'К': 'K',    'Л': 'L',    'М': 'M',    'Н': 'N',
		'О': 'O',    'П': 'P',    'Р': 'R',    'С': 'S',    'Т': 'T',
		'У': 'U',    'Ф': 'F',    'Х': 'H',    'Ц': 'C',    'Ч': 'Ch',
		'Ш': 'Sh',   'Щ': 'Sch',  'Ь': '',     'Ы': 'Y',    'Ъ': '',
		'Э': 'E',    'Ю': 'Yu',   'Я': 'Ya'
	}
	for (let i = 0; i < word.length; ++i ) {
		if (converter[word[i]] == undefined){
			answer += word[i]
		} else {
			answer += converter[word[i]]
		}
	}
	return answer
}

async function main() {
  const extOut = `.txt`
  const extIn = `docx`
  const folderInPath = `./prepare_in`
  const folderOutPath = `./prepare_out`
  const commands = []

  const fileNameArr = await fsp.readdir(folderInPath)

  fileNameArr.forEach(async(fileNameIn) => {
    const fileNameParts = fileNameIn.split(`.`)
    const extIn = fileNameParts[fileNameParts.length -1].toLowerCase()
    if (extIn !== extIn) {
      return
    }
    const fio = translit(fileNameParts[0].replace(/\s/g, ``))
    const fileNameOut = `${fio}${extOut}`
    const inputPath = path.join(folderInPath, fileNameIn)
    const outputPath = path.join(folderOutPath, fileNameOut)
    const command = `mystem.exe -ncgi --eng-gr ${fileNameOut} count_in\\${fileNameOut}\n`
    commands.push(command)

    const inBuf = await fsp.readFile(inputPath)
    let outBuf = await convertAsync(inBuf, extOut, undefined)
    await fsp.writeFile(outputPath, outBuf)
  })

  const commandAllStr = commands.join(``)

  await fsp.writeFile(
    `${folderOutPath}/_command.txt`,
    commandAllStr,
    `utf-8`,
    (err) => {
      if (err) {
        throw err
      }
    },
  )
}

main().catch(function (err) {
  console.error(`Error converting file: ${err}`)
})