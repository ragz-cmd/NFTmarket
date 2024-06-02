const { run } = require("hardhat");

const verify = async (contractAddress,args)=>{
    try {
        await run("verify:verify",{
            address : contractAddress,
            constructorArguments : args
        })

    } catch (
        error
    ) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}
module.exports = {verify};