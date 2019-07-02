const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

const endpoint = 'assets/skincare.json';
const skincare = [];

fetch(endpoint)
  .then(res => res.json())
  .then(data => skincare.push(...data));

function findMatches(search, listOfSkincare) {
  return skincare.filter(ingr => {
    const regex = new RegExp(search, 'gi');
    return ingr.ingredient.match(regex)
  })
}

function displayMatches() {
  const matchArray = findMatches(this.value, skincare);

  const html = matchArray.map(ingr => {
    const thisValue = this.value;
    const regex = new RegExp(thisValue, 'gi');

    const ingredient = ingr.ingredient.replace(regex, `<span class="highlight">${this.value}</span>`);

    let info = ``;
    ingr.alsoKnownAs.forEach((name, key, arr) => {
      if (Object.is(arr.length - 1, key)) {
        info += name;
      } else {
        info += `${name}, `;
      }
    });

    let pros = ``;
    ingr.pros.forEach((name, key, arr) => {
      pros += `<li class="pros">${name}</li>`;
    });

    let cons = ``;
    ingr.cons.forEach((name, key, arr) => {
      cons += `<li class="cons">${name}</li>`;
    });

    return `
      <div>
        <h2>${ingredient}</h2>
        <p>${info}</p>
        <ul>
          ${pros}
        </ul>
        <ul>
          ${cons}
        </ul>
      </div>
    `;
    }).join('');
  suggestions.innerHTML = html;
}

searchInput.addEventListener('keyup', displayMatches);