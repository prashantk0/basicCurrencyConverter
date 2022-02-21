
const listAllCountry1 = document.getElementById('country1');
const listAllCountry2 = document.getElementById('country2');
const convertBtn = document.getElementById('convert');
const fromValue = document.getElementById('fromValue');
const toValue = document.getElementById('toValue');
const resetBtn = document.getElementById('reset');
const resultHandler = document.querySelector('.resultContainer');
const pResult = document.createElement('p');
const spinner = document.createElement('i');

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
        const countryCode1 = await getCountryCode(fromCount);
        const countryCode2 = await getCountryCode(toCount);
        
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
              resultHandler.removeChild(spinner);
              pResult.innerText =  `${fromValue.value} ${countryCode1} = ${toValue.value} ${countryCode2}`;
              resultHandler.append(pResult);
 
          }).catch(function (error) {
              console.error(error.message);
          });
}

convertBtn.addEventListener('click', () => {
    if (listAllCountry1.value && listAllCountry2.value){
        pResult.innerText = '';
        toValue.value = '';
        spinner.className = 'fa fa-refresh fa-spin';
        resultHandler.append(spinner);
        exchangeRate(listAllCountry1.value, listAllCountry2.value);
    }
})

resetBtn.addEventListener('click', () => {
    resultHandler.innerHTML = '';
    fromValue.value = '';
    toValue.value = '';
    listAllCountry1.value = '';
    listAllCountry2.value = '';
})