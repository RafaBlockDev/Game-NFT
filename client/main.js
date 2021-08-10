Moralis.initialize("IbBkKlrOvdBGvjv0Dc40I7Swh8yR9UlYJlxvJa14V"); // Application id from moralis.io
Moralis.serverURL = "https://vqpbu0sec3gd.usemoralis.com:2053/server"; //Server url from moralis.io
const CONTRACT_ADDRESS = "0xbE7a09A6A3C7aC6Bf57be407D0b2C565bBD593E6"

async function init() {
    try {
        let user = Moralis.User.current();
        if (!user) {
            $("#login_button").click(async() => {
                user = await Moralis.Web3.authenticate();
            })
        }
        renderGame();
    } catch (error) {
        console.log(error);
    }
}

async function renderGame() {
    $("#login_button").hide();

    // Get and Render properties from SC
    let petId = 0;
    window.web3 = await Moralis.Web3.enable();
    let abi = await getAbi();
    let contract = new web3.eth.contract(abi, CONTRACT_ADDRESS);
    let data = await contract.methods.getTokenDetails(petId).call({ from: ethereum.selectAddress });
    console.log(data);
    renderPet(0, data);
    $("#game").show();
}

function renderPet(id, data) {
    $("#pet_id").html(id);
    $("#pet_damage").html(data.damage);
    $("#pet_magic").html(data.magic);
    $("#pet_endurance").html(data_endurance);

    let deathTime = new Date((parseInt(data.lasMeal) + parseInt(data.endurance)) * 1000);

    $("pet_starvation_time").html(data.endurance);
}

function getAbi() {
    return new Promise((res) => {
        $.getJSON("Token.json", ((json) => {
            res(json.abi);
        }))
    })
}

init();