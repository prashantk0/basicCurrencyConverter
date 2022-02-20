
const listAllCountry1 = document.getElementById('country1');
const listAllCountry2 = document.getElementById('country2');
const convertBtn = document.getElementById('convert');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const spanFrom = document.getElementById('spanFrom');
const spanTo = document.getElementById('spanTo');
const resetBtn = document.getElementById('reset');

function listOfCountries(){
    axios.get(`https://restcountries.com/v2/all`).then( result => {
        for (const res of result.data){
            if (res.currencies) {
                const optionEl1 = document.createElement('option');
                optionEl1.innerText = `${res.name}`;
                listAllCountry1.append(optionEl1);
                const optionEl2 = document.createElement('option');
                optionEl2.innerText = `${res.name}`;
                listAllCountry2.append(optionEl2);
            }
            
        }
    }).catch(function (error) {
        console.error(error.message);
    });
}

listOfCountries();


async function getCountryCode(country){
    try {
        const result = await axios.get(`https://restcountries.com/v2/all`);
        for (const res of result.data){
            if (res.name === country && res.currencies){
                const countCode = res.currencies[0].code;
                return countCode;
            }
        }
    } catch (error) {
        console.log(error.message);
    }
}

async function exchangeRate(fromCount, toCount) {
        // let array = [];
        const countryCode1 = await getCountryCode(fromCount);
        // array.push(countryCode1);
        spanFrom.innerText = `${countryCode1}`;
        const countryCode2 = await getCountryCode(toCount);
        // array.push(countryCode2);
        // return array;
        spanTo.innerText = `${countryCode2}`;
        const options = {
            method: 'GET',
            url: 'https://currency-exchange.p.rapidapi.com/exchange',
            params: { from: `${countryCode1}`, to: `${countryCode2}`, q: '1.0'},
            headers: {
              'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
              'x-rapidapi-key': '40cf3b32a4msh22fbcd956cfcdd4p1d5d21jsn90d00f848f0e'
            }
          };
          
          axios.request(options).then( response => {
              const calValue = fromValue.value * response.data;
              toValue.value = calValue;
          }).catch(function (error) {
              console.error(error.message);
          });
}

convertBtn.addEventListener('click', () => {
    if (listAllCountry1.value && listAllCountry2.value){
        exchangeRate(listAllCountry1.value, listAllCountry2.value);
    }
})

resetBtn.addEventListener('click', () => {
    fromValue.value = '';
    toValue.value = '';
    spanFrom.innerText = '';
    spanTo.innerText = '';
    listAllCountry1.value = '';
    listAllCountry2.value = '';

})