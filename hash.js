const bcrypt = require('bcrypt');
/**
 * salating is randomizing the hash,after hashing it so
 * hackers can not generate bunch of hash passwords and find 
 * the patterns
 * 
 * higer the number the better salt we get
 */
async function run(){

    //this creates the salt that will be used with hash
    const salt = await bcrypt.genSalt(10)

    const hashPas = await bcrypt.hash('1234',salt);

    console.log(hashPas)
}
run()