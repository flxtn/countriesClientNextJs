export interface Country {
  name: string;
  countryCode: string;
}

export interface Flag {
  name: string;
  flag: string;
  iso2: string;
  iso3: string;
}

export interface PopulationData {
  year: number;
  value: number;
}

export interface Population {
  country: string;
  code: string;
  iso3: string;
  populationCounts: PopulationData[];
}

export interface BorderInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: BorderInfo[];
}

export interface CountryInfo {
  borderCountries: BorderInfo[];
  population: PopulationData[];
  flag: string;
  name: string;
}
