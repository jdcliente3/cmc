const { addonBuilder } = require("stremio-addon-sdk");

const manifest = {
    "id": "org.cmctv.stremio",
    "version": "1.0.1",
    "name": "CMC TV Addon",
    "description": "Addon para assistir ao canal CMC TV no Stremio.",
    "resources": ["catalog", "stream"],
    "types": ["tv"],
    "catalogs": [
        {
            "type": "tv",
            "id": "cmc_tv_catalog",
            "name": "CMC TV"
        }
    ],
    "idPrefixes": ["cmc"]
};

const builder = new addonBuilder(manifest);

// Catálogo
builder.defineCatalogHandler(({ type, id }) => {
    if (type === "tv" && id === "cmc_tv_catalog") {
        return Promise.resolve({
            metas: [
                {
                    id: "cmc_live",
                    type: "tv",
                    name: "CMC TV",
                    poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbVufCmYSRs_ZsalxNJ5cTJ_37Bl5ZCtM-Q&s", // Substitua por um link válido para a imagem
                    background: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYbVufCmYSRs_ZsalxNJ5cTJ_37Bl5ZCtM-Q&s", // Substitua por um link válido para a imagem
                    description: "Canal de música CMC TV ao vivo."
                }
            ]
        });
    } else {
        return Promise.resolve({ metas: [] });
    }
});

// Stream
builder.defineStreamHandler(({ type, id }) => {
    if (type === "tv" && id === "cmc_live") {
        return Promise.resolve({
            streams: [
                {
                    title: "CMC TV Live",
                    url: "https://stream.cmctv.hr:49998/cmc/live.m3u8"
                }
            ]
        });
    } else {
        return Promise.resolve({ streams: [] });
    }
});

module.exports = builder.getInterface();
