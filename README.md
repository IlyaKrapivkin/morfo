# MORFO
tool for work with mystem-app

# Instruction  
1. download [Mystem](https://yandex.ru/dev/mystem/) console-app.  
For Win10 put exe-file into folder "prepare_out".
and open via win10-command-line  
by commands:
* cd C:\users\some.user\some.folder
* mystem.exe -ncgi --eng-gr in.txt out.txt  
The list of  type's commands will be generated in next steps.

2. install for Ubuntu [Libreoffice](https://www.libreoffice.org/download/download/)  
by commands:
* sudo apt-get update
* sudo apt-get install --reinstall libreoffice

3. put all original docx-files to folder "prepare_in" and run Morfo  
by command:
* node prepare

4. check if generated txt-files have appeared in folder "prepare_out",  
and check if generated file "_command.txt" has appeared in folder "prepare_out"  

5. run Mystem console-app by command:
* cd C:\users\some.user\some.folder
and then you multiple run commands from generated file "_command.txt"

6. check if generated txt-files have appeared in folder "count_in",  

7. again run Morfo by command:
* node count

8. check if final generated txt-files have appeared in folder "count_out"