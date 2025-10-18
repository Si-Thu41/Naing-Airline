
export async function fetchCityList() {
        //fetch city list from backend
        try {
            const response = await fetch("http://localhost:3000/api/cities", {
                method: "GET",
                credentials: "include"
            });
            if (response.ok) {
                const data = await response.json();
                let cities = data;
                return {cities,cityListFetcherror:null};
            } else {
                let cityListFetcherror = {
                    errorMessage: response.statusText,
                    status: response.status
                }
                return {cities:null, errorMessage: cityListFetcherror};
            }
        } catch (error) {
            let cityListFetcherror = {
                errorMessage: "Error fetching city list",
                status: 500
            }
            return {cities:null, errorMessage: cityListFetcherror};
        }
    }

