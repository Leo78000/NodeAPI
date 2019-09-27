var fs = require('fs');
const { join } = require('path');
const { tmpdir } = require('os');
const movieName = process.argv[2];
const dateFiles = process.argv[3];
const dest_dir = join(tmpdir(), './monDossier');
const messages =  [];


function pushFile(moviesInfos) {
    const jsonStringSpace = JSON.stringify(moviesInfos,null,2);
    return new Promise( (resolve, reject) => {
        fs.mkdir(dest_dir, () => {

                const movieNameToCreate = join(dest_dir, `Movies.txt`);
                const content = 'Contenu du fichier : \n'+ jsonStringSpace +'\n';
                const message = `Chemin du fichier qui vient d'être créer : ${movieNameToCreate}`;
                console.log(`La liste des films est disponible ici : ${dest_dir}`)
            
                fs.writeFile(movieNameToCreate, content, (err) => {
                    if(err) reject(err)
                    messages.push(message)
                });
        });
    });
    
}

module.exports =  { pushFile }