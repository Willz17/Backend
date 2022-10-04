// get fetch cities

const Handler = (function () {
  const _URL = "http://localhost:4500/api/places";
  const _BODY = document.querySelector(".t-body");
  const _FORM = document.querySelector(".new-form");
  const _FRAME = document.querySelector(".map-frame");

  const rowFiller = (index, country, name, lat, long, color) => {
    const table_row = document.createElement("tr");
    const count = document.createElement("td");

    if (color) {
      table_row.classList.add("bg-success");
      count.innerText = "local";
    } else {
      table_row.classList.add("bg-primary");
      count.innerText = index;
    }

    const td_country = document.createElement("td");
    td_country.innerText = country;
    const td_name = document.createElement("td");
    td_name.innerText = name;
    const td_lat = document.createElement("td");
    td_lat.innerText = lat;
    const td_long = document.createElement("td");
    td_long.innerText = long;

    table_row.appendChild(count);
    table_row.appendChild(td_country);
    table_row.appendChild(td_name);
    table_row.appendChild(td_lat);
    table_row.appendChild(td_long);

    _BODY.appendChild(table_row);

    let table = _BODY;
    let rows = table.getElementsByTagName("tr");
    console.log("length. " + rows.length);
  };

  const fillUp = (data, color = false) => {
    for (let [index, d] of data.entries()) {
      rowFiller(index, d.country, d.name, d.lat, d.lng, color);
    }
  };

  // fetch places
  async function fetchPlacesAPI() {
    fetch(_URL).then((response) =>
      response
        .json()
        .then((data) => ({
          data: data,
          status: response.status,
        }))
        .then((res) => {
          fillUp(res.data);
        })
    );
  }

  const rowHandler = () => {
    // let table = document.querySelector(".table");
    let table = _BODY;
    let rows = table.getElementsByTagName("tr");
    console.log(rows.length);
    for (let i = 0; i < rows.length; i++) {
      let currentRow = table.rows[i];
      let createClickHandler = function (row) {
        return function () {
          let country = row.getElementsByTagName("td")[1].innerText;
          let name = row.getElementsByTagName("td")[2].innerText;
          let lat = row.getElementsByTagName("td")[3].innerText;
          let long = row.getElementsByTagName("td")[4].innerText;
          // let id = cell.innerHTML;
          console.log({ country, name, lat, long });
          window.scrollTo(0, document.body.scrollHeight);
          let src = `https://maps.google.com/maps?q=${name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
          _FRAME.src = src;
        };
      };
      currentRow.onclick = createClickHandler(currentRow);
    }
  };

  const setter = ({ country, city, lat, long }) => {
    console.log({ country, city, lat, long });
    let all = [];
    let data = localStorage.getItem("places");
    data = JSON.parse(data);
    let json = {
      country: country,
      name: city,
      lat: lat,
      lng: long,
    };
    if (!data) {
      all.push(json);
    } else {
      data.push(json);
      all = data;
    }
    localStorage.setItem("places", JSON.stringify(all));
    alert("saved");
  };

  const getter = () => {
    let data = localStorage.getItem("places");
    if (!data) {
      return;
    } else {
      data = JSON.parse(data);
      fillUp(data, true);
    }
  };

  const formListener = () => {
    _FORM.addEventListener("submit", (e) => {
      e.preventDefault();

      let country = e.target.country.value;
      let city = e.target.name.value;
      let lat = e.target.lat.value;
      let long = e.target.lng.value;
      console.log({ country, city, lat, long });

      if (country && city && lat && long) {
        setter({ country, city, lat, long });
        _FORM.reset();
      }

      console.log(e.target);
    });
  };

  return {
    runner: fetchPlacesAPI,
    saveEntry: setter,
    loadEntries: getter,
    newPlaceListener: formListener,
    rowClickListiner: rowHandler,
  };
})();

// generate table cell

// pollute data

document.addEventListener("DOMContentLoaded", async () => {
  Handler.runner();
  await new Promise((r) => setTimeout(r, 2000));
  Handler.loadEntries();
  await new Promise((r) => setTimeout(r, 2000));
  Handler.rowClickListiner();
});
Handler.newPlaceListener();
