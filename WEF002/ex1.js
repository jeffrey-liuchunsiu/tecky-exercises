const data = [
    {
        "name": "Hong Kong",
        "topLevelDomain": [
            ".hk"
        ],
        "alpha2Code": "HK",
        "alpha3Code": "HKG",
        "callingCodes": [
            "852"
        ],
        "capital": "City of Victoria",
        "altSpellings": [
            "HK",
            "香港"
        ],
        "region": "Asia",
        "subregion": "Eastern Asia",
        "population": 7324300,
        "latlng": [
            22.25,
            114.16666666
        ],
        "demonym": "Chinese",
        "area": 1104.0,
        "gini": 53.3,
        "timezones": [
            "UTC+08:00"
        ],
        "borders": [
            "CHN"
        ],
        "nativeName": "香港",
        "numericCode": "344",
        "currencies": [
            {
                "code": "HKD",
                "name": "Hong Kong dollar",
                "symbol": "$"
            }
        ],
        "languages": [
            {
                "iso639_1": "en",
                "iso639_2": "eng",
                "name": "English",
                "nativeName": "English"
            },
            {
                "iso639_1": "zh",
                "iso639_2": "zho",
                "name": "Chinese",
                "nativeName": "中文 (Zhōngwén)"
            }
        ],
        "translations": {
            "de": "Hong Kong",
            "es": "Hong Kong",
            "fr": "Hong Kong",
            "ja": "香港",
            "it": "Hong Kong",
            "br": "Hong Kong",
            "pt": "Hong Kong",
            "nl": "Hongkong",
            "hr": "Hong Kong",
            "fa": "هنگ‌کنگ"
        },
        "flag": "https://restcountries.eu/data/hkg.svg",
        "regionalBlocs": [],
        "cioc": "HKG"
    }
]

let dataObject = data[0];

for (item in dataObject) {
    if (dataObject[item] instanceof Object) {
        let keyName = item.charAt(0).toUpperCase() + item.substring(1).replace(/[A-Z]/g, ' $&').trim()
        if (Array.isArray(dataObject[item])) {
            if (dataObject[item][0] instanceof Object) {
                for (itemName in dataObject[item][0]) {
                    console.log(`${keyName + "_" + itemName}: ${dataObject[item][0][itemName]}`)
                }
            } else {
                console.log(`${keyName}: ${dataObject[item].join(", ")}`)
            }
        } else {
            for (itemName in dataObject[item]) {
                console.log(`${keyName + "_" + itemName}: ${dataObject[item][itemName]}`)
            }
        }
    } else {
        let keyName = item.charAt(0).toUpperCase() + item.substring(1).replace(/[A-Z]/g, ' $&').trim()
        console.log(`${keyName}: ${dataObject[item]}`);
    }
}


console.log('from main')