import data from "./data.json" assert { type: 'json' };

export function getDriverAverages() {
  let results2019 = {
    season: 2019,
    raceResults: [],
  };
  const careerResults = data.MRData.RaceTable.Races;
  for (let i = 0; i < careerResults.length; i++) {
    if (careerResults[i].season == results2019.season) {
      results2019.raceResults.push(careerResults[i].Results[0].positionText);
    }
  }
  const raceFinishes = results2019.raceResults.filter(Number);
  console.log(raceFinishes);
  
  let nums = raceFinishes.map(function(str) {
    return parseInt(str);
  });

  function calculateAverage(array) {
    let total = 0;
    let count = 0;
    array.forEach(function(item, index) {
      total += item;
      count++;

    });
    return total/count;
  }
  console.log(calculateAverage(nums))
}

export async function getDriverData(driverName) {
  const url = `http://ergast.com/api/f1/2023/drivers/${driverName}.json`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    const rawDriverData = json.MRData.DriverTable.Drivers[0];
    return rawDriverData;
  } catch (error) {
    console.log("error", error);
  }
}

export async function fetchAllDriverNames() {
  const url = "http://ergast.com/api/f1/2023/drivers.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const rawDriverList = json.MRData.DriverTable.Drivers;
    const results = rawDriverList.map(function (element) {
      return `${element.givenName} ${element.familyName}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchCurrentStandings() {
  const url = "http://ergast.com/api/f1/current/driverStandings.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const standings =
      json.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const results = standings.map(function (element) {
      return `${element.Driver.givenName} ${element.Driver.familyName}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchLastRaceResults() {
  const url = "http://ergast.com/api/f1/current/last/results.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const raceResults = json.MRData.RaceTable.Races[0].Results;
    const results = raceResults.map(function (element) {
      return `${element.positionText}`;
    });
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchCurrentSeasonRaceResults() {
  const url = "https://ergast.com/api/f1/current/results.json?limit=500";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const allRaces = json.MRData.RaceTable.Races;
    return allRaces;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchPreviousSeasonRaceResults() {
  const url = "https://ergast.com/api/f1/2022/results.json?limit=500";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const allRaces = json.MRData.RaceTable.Races;
    return allRaces;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

export async function fetchEventList() {
  const url = "https://ergast.com/api/f1/current.json";
  try {
    const response = await fetch(url);
    const json = await response.json();
    const results = json.MRData.RaceTable.Races;
    return results;
  } catch (error) {
    console.log("error", error);
  }

  return null;
}

/**
     * This function fetches the full race results for the last 5 events held at the next race circuit
     * (typically the last 5 years, with some exceptions due to COVID)
     */
export async function fetchNextTrackData(nextRace) {
  let url;
  switch (nextRace) {
    case "monaco":
    case "monza":
    case "silverstone": 
    case "spa":
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000&offset=1000`;
      break;
    case "hungaroring":
    case "interlagos":
    case "red_bull_ring":
    case "villeneuve":
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000&offset=600`;
      break;
    default:
      url = `https://ergast.com/api/f1/circuits/${nextRace}/results.json?limit=1000`;
  };

  try {
    const response = await fetch(url);
    const json = await response.json();
    const nextRaceAllEvents = json.MRData.RaceTable.Races;
    const reverseNextRaceAllEvents = nextRaceAllEvents.reverse();
    const nextRaceLastFiveEventsReverse = reverseNextRaceAllEvents.slice(0, 5);
    const nextRaceLastFiveEvents = nextRaceLastFiveEventsReverse.reverse();
    return nextRaceLastFiveEvents;
  } catch (error) {
    console.log("error", error);
  }
}

